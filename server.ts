/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Lazily initialize the Gemini API client to ensure standard startup doesn't crash if key is missing during container boots.
let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("⚠️ Warning: GEMINI_API_KEY is not defined. AI Chatbot features will be simulated.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

const SYSTEM_INSTRUCTION = `
You are Dr. Apex, the Chief Smart Dental Consultant at Apex Dental Clinic. Your persona is highly compassionate, reassuring, professional, and empathetic. Your goal is to help dental patients understand their symptoms, explain our services, comfort nervous individuals, and encourage them to book a clinical appointment.

Rules:
1. Be medically helpful, comforting and strictly precise. But always remind patients that you are an AI assistant and that a physical clinical dental examination with radiographs/imaging is required for definitive diagnostic confirmation.
2. If symptoms suggest a severe condition (e.g. knocked-out tooth, massive facial swelling, uncontrolled deep bleeding), warn them that this is a dental emergency. Instruct them to utilize the "Emergency Triage" tab/button on our website and seek immediate same-day emergency visit.
3. Keep answers concise, reader-friendly, and logically structured using clean text layout (bullet points or short paragraphs).
4. Actively promote booking an appointment with our elite dentists: Dr. Vance (Cosmetics), Dr. Lin (Orthodontics), Dr. Throne (Surgeon), Dr. Emily Ruiz (Pediatrics) or Dr. Park (Restorative / General / Emergencies) depending on their exact symptoms, and prompt them to use our "Book Online Now" section.
5. Speak warmth and build trust. Use supportive terms like "Let's help you save that smile," "We completely understand dental anxiety," or "We will get you comfortable in no time."
6. Do NOT diagnose with absolute certainty, and DO NOT prescribe specific medications other than standard over-the-counter temporary relief (like salt water rinse or ibuprofen).
`;

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  // Middleware for parsing JSON requests
  app.use(express.json());

  // API endpoint for Smart Consultation Chatbot
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message payload is required.' });
      }

      // Check for valid API key
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        // Mock fallback for standard preview mode when key hasn't been set yet
        const lowerMsg = message.toLowerCase();
        let fallbackResponse = "";

        if (lowerMsg.includes("pain") || lowerMsg.includes("hurt") || lowerMsg.includes("ache")) {
          fallbackResponse = "**Dr. Apex:** I am so sorry to hear you are dealing with dental pain. Tooth discomfort is usually a signal from the nerve that needs professional care. In the meantime, rinse with warm salt water, apply cold compresses, or take temporary over-the-counter anti-inflammatories. Please consider scheduling an appointment at Dr. Park's general & restorative scheduler slots on this page so we can locate and treat the issue before it worsens.";
        } else if (lowerMsg.includes("veneer") || lowerMsg.includes("cosmetic") || lowerMsg.includes("white")) {
          fallbackResponse = "**Dr. Apex:** Our clinic provides premier custom porcelain veneers and laser teeth whitening led by Dr. Alexander Vance! Veneers are incredibly thin, custom shells designed isometrically to overlay discolored or fractured enamel. I highly recommend booking a 'Cosmetic Cosmetic Veneers & Whitening' consultation using our booking portal.";
        } else if (lowerMsg.includes("align") || lowerMsg.includes("invisalign") || lowerMsg.includes("crooked")) {
          fallbackResponse = "**Dr. Apex:** Correcting alignment is a game-changer! Dr. Sarah Lin, our chief orthodontist, uses custom clear Invisalign aligners. It is virtually invisible and and is 100% removable. Check our 'Precision Invisalign & Orthodontics' segment and select Dr. Lin in the appointment calendar on this page to build a customized alignment path!";
        } else if (lowerMsg.includes("emergency") || lowerMsg.includes("knocked") || lowerMsg.includes("swelling")) {
          fallbackResponse = "⚠️ **IMMEDIATE RESCUE PROTOCOL REQUIRED:** If this is a knocked-out tooth, severe facial swelling, or heavy oral bleeding, this is critical! Please toggle our **Emergency Triage** deck right away. Put a knocked-out tooth in cold milk and let our emergency dentist, Dr. Park, handle it. You can write your appointment as urgent inside our online calendar booking for immediate same-day support.";
        } else {
          fallbackResponse = `**Dr. Apex:** Thank you for reaching out. At Apex Dental Care, we provide high-comfort cosmetic dentistry, orthodontic alignment, bone-growth dental implants, pediatric dentistry, and emergency dental pain recovery. I highly suggest using our **Appointment Scheduler** right on this page to choose a time slot with our specialists! How else can I assist in protecting your smile today?`;
        }
        return res.json({ text: fallbackResponse });
      }

      // Initialize Gemini Client
      const ai = getGeminiClient();

      // Transform history to expected parts if exist
      const contentsParts: any[] = [];
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          contentsParts.push({
            role: turn.role === 'user' ? 'user' : 'model',
            parts: [{ text: turn.content }],
          });
        }
      }

      // Add the current prompt message
      contentsParts.push({
        role: 'user',
        parts: [{ text: message }],
      });

      // Call generateContent using the recommended @google/genai syntax
      // Using gemini-3.5-flash as the fallback basic-text task model
      const aiResponse = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: contentsParts,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = aiResponse.text || "I was unable to process deep context. How can I help you book with our clinic?";
      return res.json({ text: replyText });

    } catch (err: any) {
      console.error("Error at /api/chat Gemini processing:", err);
      return res.status(500).json({
        error: "Our smart virtual consultant is currently offline. Please proceed to book an appointment directly using our online scheduler.",
        details: err?.message || String(err),
      });
    }
  });

  // Serve static assets & Vite setup
  if (process.env.NODE_ENV !== 'production') {
    console.log("🛠️ Starting Express in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log("🚀 Starting Express in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`📡 Full-stack server running successfully at http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("❌ Critical server boot failure:", error);
});
