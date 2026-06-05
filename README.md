# 🩺 Apex Dental Care — Radiant Smiles Practice

An elegant, state-of-the-art dental clinical web application featuring adaptive, high-contrast visual design, a real-time conversational **AI Patient Liaison Assistant**, and a fully interactive **Online Appointment Scheduler**. 

Crafted with premium typography, responsive layouts, a smooth drag-and-drop comparison tool, and comprehensive clinical validation frameworks to deliver an exceptionally reassuring patient experience.

---

## ✨ Features Spotlight

### 🟦 Modern & Professional Design
* **Sophisticated Branding**: Balanced display headers utilizing the elegant **Outfit** typeface alongside clean **Plus Jakarta Sans** for maximum body readability and high-contrast accessibility.
* **Premium Accents**: Delicate background dot-grids, customized card shadows, fluid responsive layouts, and soft glowing ambient lighting vectors.
* **Aesthetic Pairings**: Features a highly legible modern color scheme pairing soft clinical slate shades with deep charcoal greys and custom primary clinical blue details.

### 🦷 Advanced Clinical Modules
1. **Dr. Apex, DDS (Liaison AI)**: A custom conversational AI assistant backed by a secure **Google Gemini SDK** middleware. Offers procedure overviews, patient reassurance, symptom checklists, and integrated **One-Click Scheduler Shortcuts** that autopopulate appointment configurations.
2. **Interactive Before & After Restorations Slider**: A drag-responsive divider slider allowing patients to visually compare clinical tooth bonding, whitening alignments, and digital smile makeovers in real time.
3. **Emergency Dental Triage Protocols**: Immediate priority checklists for dislodged teeth, bleeding, and acute pain guidelines. Patients can download direct care tips, follow do's vs. don'ts, and lock instant priority slots.
4. **Interactive Appointment Scheduler**: A validation-locked reservation wizard utilizing direct medical hours, doctor matching, customizable service pathways, and live visual confirmation.
5. **Interactive Campus Locator**: A custom map dashboard for switching between metropolitan and suburban clinics, highlighting hours, separate PPO phone lines, and free parking directions.

---

## 🛠️ Project Architecture

```bash
├── server.ts               # Custom Express server with Vite Middleware & Gemini API proxies
├── vite.config.ts          # Vite asset system with standard Tailwind CSS and React configuration
├── package.json            # Deployment scripts, Node backend & React declarations
├── src/
│   ├── App.tsx             # Sticky brand navigation, FAQ accordion tab routing, and testimonials
│   ├── main.tsx            # React root container setup
│   ├── index.css           # Custom Google Fonts loading, premium shadows, glassmorphic styles
│   ├── types.ts            # Clinical appointment and procedure TypeScript structures
│   ├── data.ts             # Medical specialists, procedures, FAQ datasets
│   └── components/
│       ├── Hero.tsx                 # Interactive display grids and live on-duty metrics
│       ├── Services.tsx             # Interactive procedurals, duration tables, and spotlight columns
│       ├── BeforeAfterSlider.tsx    # Drag-and-slide aesthetic restoration viewer
│       ├── Doctors.tsx              # Medical directors directory with visual status overlays
│       ├── EmergencyTriage.tsx      # Immediate checklists for dislodged teeth and pain rescue
│       ├── AppointmentScheduler.tsx # Complete multi-step visual reservation validator
│       ├── ClinicMap.tsx            # Multi-facility navigation dashboard
│       └── SmartAssistant.tsx       # Floating virtual assistant containing one-click booking hooks
```

---

## 🚀 Local Installation & Running Guide

Ensure you have **Node.js (v18+)** and **npm** installed on your workstation.

### 1. Clone & Setup Secrets
Clone your repository files into a fresh local directory and create a configuration file for secrets:
```bash
# Duplicate configuration example
cp .env.example .env
```
Inside `.env`, insert your secure cloud keys:
```env
GEMINI_API_KEY="AIzaSyYourActualKeyFromGoogleAIStudio"
PORT=3000
```

### 2. Install Project Dependencies
Run the command below to retrieve Node modules:
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The Express server compiles assets dynamically on page retrieval.

---

## 🖥️ How to Upload to GitHub

Follow these simple steps to move your code to GitHub:

### 1. Initialize Git Repo
If you haven't initialized a repository inside your downloaded directory:
```bash
git init
git add .
git commit -m "Initialize Apex Dental Clinic with Premium Design"
```

### 2. Link your GitHub Repository
1. Navigate to [GitHub](https://github.com) and click **New Repository**.
2. Avoid checking *Initialize with README/License* (since you already possess code files).
3. Connect your local directory to your main branch:
```bash
# Link the remote pointer
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Set your primary branch
git branch -M main

# Mirror code over
git push -u origin main
```

---

## ☁️ Step-by-Step Deployment Guide

Since this codebase is a **hybrid full-stack application** (React Client + Express API Proxy and Gemini SDK), you can choose to deploy it in two ways:

---

### Option A: Static SPA Deployment on Netlify (React Frontend Only)
Netlify connects easily with your GitHub repository to compile static client designs:

1. **Log in & Deploy**: Navigate to [Netlify](https://app.netlify.com/) and click **Add New Site** -> **Import from GitHub**.
2. **Configure Settings**:
   * **Build Command**: `vite build`
   * **Publish Directory**: `dist`
3. **Environment Variables**:
   * Add any public parameters starting with `VITE_` if used.
4. **Deploy**: Trigger the pipeline. Netlify compiles assets instantly and produces a shareable link.
   * *Note: The conversational AI Assistant is programmed to degrade gracefully into fallback responses if the backend API is unavailable in a static layout, allowing client schedulers and visual sliders to remain 100% operational.*

---

### Option B: Full-Stack Deployment on Render, Railway, or Fly.io (Recommended)
This method hosts both the frontend UI and the Express backend handler to support the AI conversational engine.

#### **Deploying on Render:**
1. Access [Render](https://render.com/) and choose **New Web Service** linked to your GitHub repo.
2. Enter these configuration details:
   * **Runtime**: `Node`
   * **Build Command**: `npm run build`
   * **Start Command**: `npm run start`
3. Go to **Advanced Settings** -> **Environment Variables** and insert:
   * `NODE_ENV` = `production`
   * `GEMINI_API_KEY` = `[your_valid_gemini_api_key]`
4. Click **Create Web Service**. Both frontend compilation and API server handlers launch automatically on Port `3000`.

---

## 🌟 Security & Compliance Disclaimers
* **HIPAA Notice**: The mock patient schedulers do not store persistent Protected Health Information (PHI) in an unencrypted manner. Fully production-ready deployments should connect with accredited patient record systems (EHR/EMR).
* **Gemini Safety Guard**: All patient consultation responses produced by Dr. Apex Liaison AI are educational guides. AI outputs should not be used as clinical diagnostic solutions in place of certified human orthodontists or surgical professionals.
