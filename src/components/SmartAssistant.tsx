/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, AlertTriangle, ShieldCheck, HeartPulse, HelpCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  createdAt: string;
}

export default function SmartAssistant({ 
  onTriggerBooking 
}: { 
  onTriggerBooking: (docId: string, svcId: string) => void 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: "Hello! I am Dr. Apex, the chief AI Dental Liaison at Apex Dental Clinic. 🦷💙\n\nHow can I support your smile today? Feel free to describe any tooth sensitivity or pain, look up procedures (clinical porcelain veneers, transparent Invisalign braces, microscopic root canals, kid-safe dentistry), or ask for medical triage tips. I can recommend our specialists and prepare your booking instantly!",
      createdAt: new Date().toISOString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      content: userText,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Build a clean history payload
      const historyPayload = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userText,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error('Our connection encountered a temporary network delay.');
      }

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: 'model',
        content: data.text || "I was unable to process final diagnostic answers. Please book an appointment with our clinical teams directly.",
        createdAt: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        role: 'model',
        content: `⚠️ **Network Delay:** ${err?.message || 'The clinic database is currently updating. Please schedule your appointment directly using our online scheduler widgets.'}`,
        createdAt: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Extract key shortcut triggers based on message analysis to prompt CTA buttons
  const getBookingTriggers = (text: string) => {
    const lowercase = text.toLowerCase();
    const actions = [];

    if (lowercase.includes("vance") || lowercase.includes("veneer") || lowercase.includes("cosmetic") || lowercase.includes("whitening")) {
      actions.push({ name: "Book Smile Design w/ Dr. Vance", docId: "dr-vance", svcId: "cosmetic-whitening" });
    }
    if (lowercase.includes("lin") || lowercase.includes("alignment") || lowercase.includes("aligner") || lowercase.includes("invisalign") || lowercase.includes("braces")) {
      actions.push({ name: "Book Invisalign w/ Dr. Lin", docId: "dr-lin", svcId: "invisalign-aligners" });
    }
    if (lowercase.includes("throne") || lowercase.includes("implant") || lowercase.includes("surgery") || lowercase.includes("surgeon")) {
      actions.push({ name: "Book Implant consultation w/ Dr. Throne", docId: "dr-throne", svcId: "dental-implants" });
    }
    if (lowercase.includes("ruiz") || lowercase.includes("kid") || lowercase.includes("child") || lowercase.includes("pediatric")) {
      actions.push({ name: "Book Kids dental care w/ Dr. Ruiz", docId: "dr-ruiz", svcId: "kids-dentistry" });
    }
    if (lowercase.includes("park") || lowercase.includes("pain") || lowercase.includes("ache") || lowercase.includes("emergency") || lowercase.includes("root canal")) {
      actions.push({ name: "Book urgent Pain Rescue w/ Dr. Park", docId: "dr-park", svcId: "emergency-pain-rescue" });
    }

    return actions;
  };

  const handleApplyShortcut = (docId: string, svcId: string) => {
    onTriggerBooking(docId, svcId);
  };

  return (
    <>
      {/* Floating activation button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-blue-600 text-white shadow-2xl hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="w-3 h-3 bg-red-500 border-2 border-blue-600 rounded-full absolute -top-1 -right-1 animate-ping" />
          </div>
          <span className="text-sm font-bold pr-1 select-none">Ask Dr. Apex AI</span>
        </button>
      )}

      {/* Floating Chat Container Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[550px] bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col justify-between">
          
          {/* Header */}
          <div className="bg-slate-900 border-b border-slate-800 p-4.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center relative">
                <HeartPulse className="w-5 h-5 text-white" />
                <span className="w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full absolute bottom-0 right-0" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm tracking-tight flex items-center gap-1.5">
                  Dr. Apex, DDS
                  <span className="text-[9px] font-bold bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded uppercase tracking-wider">
                    Liaison AI
                  </span>
                </h3>
                <p className="text-[10px] text-slate-400 font-semibold tracking-wide">
                  Virtual Dental Consultant
                </p>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages scroll zone */}
          <div 
            ref={scrollRef}
            className="flex-1 bg-slate-50 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              const shortcuts = !isUser ? getBookingTriggers(msg.content) : [];

              return (
                <div key={msg.id} className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  
                  {/* Avatar left */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex flex-shrink-0 items-center justify-center text-xs font-bold shadow-xs">
                      A
                    </div>
                  )}

                  {/* Bubble body */}
                  <div className="max-w-[82%] space-y-2">
                    <div className={`p-3.5 rounded-2xl text-xs leading-relaxed font-semibold shadow-xs ${
                      isUser 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-700 border border-slate-200/80 rounded-tl-none whitespace-pre-wrap'
                    }`}>
                      {msg.content}
                    </div>

                    {/* CTA booking triggers generated from AI text analysis */}
                    {!isUser && shortcuts.length > 0 && (
                      <div className="space-y-1.5 pl-1.5 pt-1">
                        <span className="text-[9px] text-slate-450 uppercase font-bold tracking-widest block text-slate-400">
                          One-Click Scheduler Shortcuts:
                        </span>
                        {shortcuts.map((sc, scIdx) => (
                          <button
                            key={scIdx}
                            onClick={() => handleApplyShortcut(sc.docId, sc.svcId)}
                            className="text-[11px] font-bold text-left px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100/80 border border-blue-100 transition flex items-center gap-1.5 w-fit"
                          >
                            <Sparkles className="w-3 h-3 text-blue-500 animate-pulse" />
                            {sc.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Avatar right */}
                  {isUser && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex flex-shrink-0 items-center justify-center text-xs font-bold shadow-xs">
                      U
                    </div>
                  )}

                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold animate-pulse">
                  A
                </div>
                <div className="p-3 bg-white border border-slate-250 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center gap-2 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                  Dr. Apex is formulating response...
                </div>
              </div>
            )}
          </div>

          {/* Footer Input form */}
          <form 
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-slate-200 flex gap-2"
          >
            <input
              type="text"
              placeholder="Describe symptoms or treatment name..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-250 border-slate-200 rounded-xl px-3 text-xs focus:border-blue-500 focus:outline-hidden"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className={`p-2.5 rounded-xl text-white transition flex items-center justify-center ${
                inputValue.trim() && !isLoading 
                  ? 'bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-sm shadow-blue-200' 
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
