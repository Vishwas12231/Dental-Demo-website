/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { emergencySteps } from '../data';
import { AlertTriangle, ShieldAlert, CheckSquare, Square, XCircle, PhoneCall, Calendar, MapPin } from 'lucide-react';

export default function EmergencyTriage({ onSelectEmergencySlot }: { onSelectEmergencySlot: (docId: string, svcId: string) => void }) {
  const [activeStepId, setActiveStepId] = useState('knocked-out');
  const [checkedGuidelines, setCheckedGuidelines] = useState<Record<string, boolean>>({});

  const triage = emergencySteps.find(step => step.id === activeStepId) || emergencySteps[0];

  const toggleGuideline = (key: string) => {
    setCheckedGuidelines(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleRouteToBooking = () => {
    // Route to Dr. Park (Emergency specialist) and his emergency pain rescue service
    onSelectEmergencySlot('dr-park', 'emergency-pain-rescue');
    
    // Smooth scroll to scheduler
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="emergency" className="py-16 md:py-24 bg-gradient-to-br from-red-50 via-white to-white border-y border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Urgent Header Warning */}
        <div className="bg-red-600 rounded-3xl p-6 md:p-10 text-white shadow-xl shadow-red-100 mb-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-red-800 text-red-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-red-200 animate-bounce" />
              Dental Trauma Line
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Tooth Trauma, Bleeding, or Intense Pain?
            </h2>
            <p className="text-red-100 text-sm md:text-base max-w-2xl">
              Do not ignore oral symptoms. Dental abscesses and dislodged teeth require clinical intervention within <strong>60 minutes</strong> to protect underlying structural bones and halt infection spreading.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 h-fit">
            <a 
              href="tel:+15557203099"
              className="py-4 px-6 rounded-2xl bg-white text-red-700 hover:bg-slate-100 transition shadow-lg font-bold text-sm flex items-center justify-center gap-2.5"
            >
              <PhoneCall className="w-5 h-5 text-red-600 animate-pulse" />
              Call Emergency Line Now
            </a>
            <button
              onClick={handleRouteToBooking}
              className="py-4 px-6 rounded-2xl bg-red-900 text-white hover:bg-red-950 border border-red-800 transition shadow-md font-bold text-sm flex items-center justify-center gap-2.5"
            >
              <Calendar className="w-5 h-5 text-red-200" />
              Lock Instant Priority Slot
            </button>
          </div>
        </div>

        {/* Dynamic Selector Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch mt-12">
          
          {/* Selector Navigation - 4/12 */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block mb-1">
              Select Current Emergency Status:
            </span>
            {emergencySteps.map((step) => {
              const isSelected = activeStepId === step.id;
              const isCrit = step.severity === 'critical';
              
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveStepId(step.id);
                    setCheckedGuidelines({}); // Reset checkbox
                  }}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all flex items-center gap-4 ${
                    isSelected 
                      ? 'bg-white border-red-500 shadow-md shadow-red-50' 
                      : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCrit ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-slate-800 font-bold text-sm truncate leading-snug">
                      {step.condition}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[9px] font-bold uppercase tracking-wider rounded-md px-2 py-0.5 ${
                        isCrit ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {step.severity}
                      </span>
                      <span className="text-[10px] text-slate-450 text-slate-400 font-medium">Click for checklists</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Steps checklists details panel - 8/12 */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col justify-between">
            
            <div className="space-y-6">
              
              {/* Card header meta */}
              <div className="border-b border-slate-150 border-slate-100 pb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-red-600 bg-red-50 px-2.5 py-0.5 rounded-sm">
                  Active Patient Rescue Checklist
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-2">
                  Emergency Protocol: {triage.condition}
                </h3>
              </div>

              {/* Grid: Do's vs Dont's */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                
                {/* DO IMMEDIATE STEPS */}
                <div className="bg-emerald-50/20 p-5 rounded-2xl border border-emerald-100/60">
                  <h4 className="font-extrabold text-sm text-emerald-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    Do Immediately:
                  </h4>
                  
                  <div className="space-y-3.5">
                    {triage.doSteps.map((step, idx) => {
                      const checkKey = `${triage.id}-do-${idx}`;
                      const isChecked = !!checkedGuidelines[checkKey];
                      return (
                        <div 
                          key={idx} 
                          onClick={() => toggleGuideline(checkKey)}
                          className="flex gap-3 items-start cursor-pointer select-none"
                        >
                          <div className="mt-0.5 flex-shrink-0 text-emerald-600">
                            {isChecked ? (
                              <CheckSquare className="w-4.5 h-4.5 text-emerald-600 fill-emerald-100" />
                            ) : (
                              <Square className="w-4.5 h-4.5 text-slate-300" />
                            )}
                          </div>
                          <p className={`text-xs leading-normal font-semibold ${
                            isChecked ? 'text-slate-400 line-through' : 'text-slate-600'
                          }`}>
                            {step}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* DO NOT STEPS */}
                <div className="bg-red-50/20 p-5 rounded-2xl border border-red-100/60">
                  <h4 className="font-extrabold text-sm text-red-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    Absolute Prohibitions:
                  </h4>

                  <ul className="space-y-3">
                    {triage.dontSteps.map((step, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className="text-red-500 font-bold text-xs mt-0.5">•</span>
                        <p className="text-xs text-slate-600 leading-normal font-semibold">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>

            {/* Sticky warning guidelines routing to Dr. Park */}
            <div className="pt-6 border-t border-slate-100 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl">
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Trauma Specialist On Call:</strong> Dr. Kevin Park, DDS is fully certified in microscopic relief and emergency jaw reconstructions. Same-day walks-in accepted automatically.
                </p>
              </div>

              <button
                onClick={handleRouteToBooking}
                className="w-full md:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition whitespace-nowrap shadow-md shadow-blue-50"
              >
                Proceed to Emergency Scheduler
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
