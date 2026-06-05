/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { doctors } from '../data';
import { Star, Award, Calendar, CheckCircle2, Stethoscope } from 'lucide-react';

export default function Doctors({ onSelectDoctorSlot }: { onSelectDoctorSlot: (docId: string, svcId: string) => void }) {
  
  const handleConsultDoctor = (docId: string, specialty: string) => {
    // Resolve matching service category based on doctor specialty
    let svcId = 'cosmetic-whitening';
    if (specialty === 'cosmetic') svcId = 'cosmetic-whitening';
    else if (specialty === 'orthodontics') svcId = 'invisalign-aligners';
    else if (specialty === 'oral-surgery') svcId = 'dental-implants';
    else if (specialty === 'pediatric') svcId = 'kids-dentistry';
    else if (specialty === 'general') svcId = 'emergency-pain-rescue';

    onSelectDoctorSlot(docId, svcId);

    // Smooth scroll down to scheduler
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="doctors" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
            Meet Our Clinical Directors
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight leading-normal font-display">
            Accredited Specialists, <span className="font-serif italic font-normal text-blue-600">Committed to Health</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Our dual-degree dental directors are recognized national leaders in cosmetic, orthodontic aligner development, advanced microsurgical implantology, and friendly pediatric sciences.
          </p>
        </div>

        {/* Doctors Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doc) => (
            <div 
              key={doc.id}
              className="bg-white rounded-3xl border border-slate-200/70 overflow-hidden shadow-premium hover:shadow-premium-xl transition-all duration-300 flex flex-col justify-between"
            >
              
              {/* Card visual headshot container */}
              <div className="relative aspect-video w-full bg-slate-300">
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Active check indicator */}
                <div className="absolute top-4 left-4 bg-emerald-600 text-white backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  Available Mon - Fri
                </div>

                {/* Rating overlay card */}
                <div className="absolute bottom-4 right-4 bg-slate-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 font-bold shadow-md">
                  <Star className="w-4.5 h-4.5 text-amber-400 fill-amber-400" />
                  {doc.rating} <span className="text-slate-400 font-normal">({doc.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Card core description info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mt-0.5">
                      {doc.role}
                    </p>
                  </div>

                  {/* Bio brief */}
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    {doc.bio}
                  </p>

                  {/* Education Line */}
                  <div className="flex items-center gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl">
                    <Award className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="font-semibold">{doc.education}</span>
                  </div>

                  {/* Specialties grid pills */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      Direct Expertise:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.specialties.map((spec, sIdx) => (
                        <span 
                          key={sIdx}
                          className="text-[10.5px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Button triggers scheduling */}
                <div className="pt-6 border-t border-slate-100 mt-6 flex flex-col sm:flex-row items-center gap-3 justify-between">
                  <div className="text-[11px] text-slate-400 font-semibold self-start sm:self-center">
                    Hours: {doc.hours}
                  </div>
                  <button
                    onClick={() => handleConsultDoctor(doc.id, doc.specialty)}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 hover:scale-[1.01] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-50"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Available Slot
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
