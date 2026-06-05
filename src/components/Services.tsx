/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { services } from '../data';
import * as LucideIcons from 'lucide-react';
import { Check, ArrowRight, HelpCircle } from 'lucide-react';

export default function Services({ onSelectServiceSlot }: { onSelectServiceSlot: (docId: string, svcId: string) => void }) {
  const [expandedId, setExpandedId] = useState<string | null>('cosmetic-whitening');

  const handleBookShortcut = (svcId: string) => {
    // Attempt default doctor pre-routing
    let docId = '';
    if (svcId === 'cosmetic-whitening') docId = 'dr-vance';
    else if (svcId === 'invisalign-aligners') docId = 'dr-lin';
    else if (svcId === 'dental-implants') docId = 'dr-throne';
    else if (svcId === 'kids-dentistry') docId = 'dr-ruiz';
    else if (svcId === 'emergency-pain-rescue') docId = 'dr-park';

    onSelectServiceSlot(docId, svcId);
    
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
            Specialized Dentistry & Services
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight leading-normal font-display">
            Comprehensive Dentistry, <span className="font-serif italic font-normal text-blue-600">Exceptionally Crafted</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Choose from our specialized dental departments. Every care pathway leverages state-of-the-art computers, gold-certified biocompatibility, and conscious relaxation sedation options.
          </p>
        </div>

        {/* Content Layout: Services Left List, Expanded Details Sidebar Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Services Left Column List - 5/12 */}
          <div className="lg:col-span-5 space-y-3.5">
            {services.map((ser) => {
              const isSelected = expandedId === ser.id;
              
              // Resolve lucide icons dynamically or fallback safely
              let IconComp = LucideIcons.Smile;
              if (ser.iconName === 'Sparkles') IconComp = LucideIcons.Sparkles;
              else if (ser.iconName === 'Shield') IconComp = LucideIcons.Shield;
              else if (ser.iconName === 'Baby') IconComp = LucideIcons.Baby;
              else if (ser.iconName === 'Activity') IconComp = LucideIcons.Activity;

              return (
                <button
                  key={ser.id}
                  onClick={() => setExpandedId(ser.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex gap-4 items-start ${
                    isSelected 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' 
                      : 'bg-slate-50 border-slate-200/60 text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                    isSelected ? 'bg-white/10 text-white' : 'bg-blue-50/50 text-blue-600'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-sm sm:text-base tracking-tight truncate leading-tight">
                      {ser.title}
                    </h3>
                    <p className={`text-xs mt-1.5 leading-snug line-clamp-2 ${
                      isSelected ? 'text-blue-100' : 'text-slate-500'
                    }`}>
                      {ser.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Details Sidebar Right Panel - 7/12 */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 p-6 md:p-8 rounded-3xl min-h-[460px] flex flex-col justify-between shadow-premium">
            {(() => {
              const ser = services.find(s => s.id === expandedId) || services[0];
              return (
                <div className="space-y-6 flex-1 flex flex-col justify-between h-full">
                  
                  {/* Category Details */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase font-extrabold text-blue-600 tracking-wider bg-blue-150 bg-blue-100 px-2.5 py-0.5 rounded">
                        Procedure Spotlight
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-2">
                        {ser.title}
                      </h3>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                      {ser.longDesc}
                    </p>
                  </div>

                  {/* Symtoms & Benefits Grids */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-y border-slate-200/70">
                    
                    {/* Symptoms Addressed */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Typical Symptoms Solved:
                      </h4>
                      <ul className="space-y-1.5">
                        {ser.symptomsSolved.map((sym, idx) => (
                          <li key={idx} className="flex gap-2 items-center text-xs text-slate-600 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            {sym}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Patient Benefits */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Primary Patient Benefits:
                      </h4>
                      <ul className="space-y-1.5">
                        {ser.benefits.map((ben, idx) => (
                          <li key={idx} className="flex gap-2 items-center text-xs text-slate-600">
                            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span className="font-semibold">{ben}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Service Footer details */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    {/* Stats */}
                    <div className="flex gap-4 sm:gap-6 self-start sm:self-center">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Duration</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-800">{ser.typicalDuration}</span>
                      </div>
                      <div className="w-px bg-slate-200 h-8 self-center" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Price Tier</span>
                        <span className="text-xs sm:text-sm font-extrabold text-blue-600">{ser.priceRange}</span>
                      </div>
                    </div>

                    {/* Quick schedule CTA */}
                    <button
                      onClick={() => handleBookShortcut(ser.id)}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-md shadow-slate-250 animate-pulse"
                    >
                      Book Treatment Route
                      <ArrowRight className="w-4 h-4 text-blue-400" />
                    </button>

                  </div>

                </div>
              );
            })()}
          </div>

        </div>

      </div>
    </section>
  );
}
