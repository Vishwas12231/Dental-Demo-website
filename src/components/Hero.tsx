/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, PhoneCall, Sparkles, ShieldCheck, HeartPulse, UserCheck } from 'lucide-react';

export default function Hero({ onTriggerBooking }: { onTriggerBooking: (docId: string, svcId: string) => void }) {
  
  const handleScrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToEmergency = () => {
    const el = document.getElementById('emergency');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50/60 via-white to-white py-16 md:py-24">
      {/* Background soft ambient glowing circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-50/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main hero bento matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text grid - 7/12 */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            
            {/* Soft highlight tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
              <Sparkles className="w-4 h-4 text-blue-500 animate-spin" />
              <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">
                Digital Practice & Advanced Smile Design
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-display">
              Smarter Dentistry for <br className="hidden sm:inline" />
              <span className="text-blue-600 font-serif italic font-normal tracking-wide">Radiant, Lifelong Smiles</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Welcome to Apex Dental Care, where precision clinical robotics meets compassionate pediatric and biological dental therapies. Enjoy zero-pain procedures, state-of-the-art clear aligner orthotics, Same-Day porcelain restorations, and conscious oral sedation designed to cure dental anxiety completely.
            </p>

            {/* Quick Action Matrix CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 max-w-md sm:max-w-none">
              
              <button
                onClick={handleScrollToBooking}
                className="px-8 py-4.5 rounded-2xl bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 text-white font-bold text-sm tracking-wide transition shadow-lg shadow-blue-200 flex items-center justify-center gap-2.5"
              >
                <Calendar className="w-5 h-5 text-blue-200" />
                Book Online Now
              </button>

              <button
                onClick={handleScrollToEmergency}
                className="px-8 py-4.5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-100 font-bold text-sm transition flex items-center justify-center gap-2.5 shadow-sm"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-650 bg-red-500 animate-ping" />
                Emergency Triage Guide
              </button>

            </div>

            {/* Clinic checkpoints list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 md:pt-8 border-t border-slate-100">
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-600">
                <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span>Certified PPO Care</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-600">
                <HeartPulse className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span>IV Conscious Sedation</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-600">
                <UserCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span>Same-Day Crowns</span>
              </div>
            </div>

          </div>

          {/* Graphical Collage / Clinician Badge - 5/12 */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            
            {/* Background geometric design wrapper */}
            <div className="relative mx-auto max-w-[380px] sm:max-w-md lg:max-w-none h-[380px] sm:h-[450px] bg-slate-950 rounded-[2.5rem] shadow-premium-xl p-6.5 overflow-hidden flex flex-col justify-between text-white border border-slate-800">
              {/* Luxury ambient spot glow */}
              <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] glow-blur-blue rounded-full pointer-events-none opacity-40" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] glow-blur-emerald rounded-full pointer-events-none opacity-30" />
              
              {/* Card top details */}
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-[9.5px] font-mono font-extrabold uppercase tracking-widest bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded border border-blue-900/40">
                    Lobby Live Status
                  </span>
                  
                  <span className="text-xs text-slate-300 font-bold flex items-center gap-1.5 bg-slate-900 px-2.5 rounded-full py-1 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Open Today until 6 PM
                  </span>
                </div>

                <h3 className="text-2xl font-bold leading-normal tracking-tight font-display text-white">
                  Premium Dental Care <br />
                  <span className="text-blue-400 font-serif italic text-xl">Engineered for Lifelong Trust</span>
                </h3>
              </div>

              {/* Direct Live Patient Statistics Counter Blocks */}
              <div className="space-y-3 z-10 relative">
                
                <div className="bg-slate-900/75 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex gap-4 items-center shadow-sm">
                  <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-900/30">
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">Clinicians On-Duty</h4>
                    <p className="text-sm font-semibold text-slate-100">5 Active Specialists Ready</p>
                  </div>
                </div>

                <div className="bg-slate-900/75 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex gap-4 items-center shadow-sm">
                  <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-900/30">
                    <PhoneCall className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">Average Dispatch Wait</h4>
                    <p className="text-sm font-semibold text-slate-100">Less than 5 Min Response Period</p>
                  </div>
                </div>

              </div>

              {/* Clinic assurance footer block */}
              <div className="text-[10.5px] text-slate-450 font-medium border-t border-slate-800 pt-4 text-center leading-normal text-slate-400">
                ⭐ Fully accredited members of the American Dental Association
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
