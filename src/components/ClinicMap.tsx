/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { clinicLocations } from '../data';
import { MapPin, Phone, Clock, Compass, AlertCircle, Sparkles } from 'lucide-react';

export default function ClinicMap() {
  const [activeLocIdx, setActiveLocIdx] = useState(0);
  const loc = clinicLocations[activeLocIdx];

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
            Our Locations & Directions
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight leading-normal font-display">
            State-of-the-Art Practice <span className="font-serif italic font-normal text-blue-600">Near You</span>
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Switch between our local facilities below to see customized clinical hours, verified direct telephone hotlines, free parking structures, and direct Google Maps travel paths.
          </p>
        </div>

        {/* Tab switch bar */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
            {clinicLocations.map((location, idx) => (
              <button
                key={location.id}
                onClick={() => setActiveLocIdx(idx)}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeLocIdx === idx
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapPin className="w-4 h-4 text-blue-500" />
                {location.city}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          
          {/* Card sidebar of directory details - 5/12 */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200/80">
            
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active & Accepting Patients
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                  {loc.name}
                </h3>
              </div>

              {/* Detail Items */}
              <div className="space-y-4">
                
                {/* Address */}
                <div className="flex gap-4">
                  <div className="flex-none p-2.5 bg-blue-100/60 text-blue-600 h-10 w-10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Clinic Address
                    </h4>
                    <p className="mt-1 text-slate-700 text-sm font-medium leading-relaxed">
                      {loc.address}
                    </p>
                  </div>
                </div>

                {/* Telephone lines */}
                <div className="flex gap-4">
                  <div className="flex-none p-2.5 bg-blue-100/60 text-blue-600 h-10 w-10 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Clinic Reception Line
                    </h4>
                    <p className="mt-1 text-slate-700 text-sm font-semibold">
                      {loc.phone}
                    </p>
                    <p className="mt-0.5 text-xs text-red-600 font-semibold flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500" />
                      Urgent Emergency Line: {loc.emergency}
                    </p>
                  </div>
                </div>

                {/* Clinical Hours */}
                <div className="flex gap-4">
                  <div className="flex-none p-2.5 bg-blue-100/60 text-blue-600 h-10 w-10 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Standard Practice Hours
                    </h4>
                    <p className="mt-1 text-slate-700 text-sm font-medium leading-normal">
                      {loc.hours}
                    </p>
                  </div>
                </div>

                {/* Transit directions / Parking */}
                <div className="flex gap-4">
                  <div className="flex-none p-2.5 bg-emerald-100/60 text-emerald-600 h-10 w-10 rounded-xl flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                      Parking & Accessibility
                    </h4>
                    <p className="mt-1 text-slate-600 text-xs sm:text-sm">
                      {loc.parking}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick alert badge */}
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 leading-relaxed">
                <strong>Need transit coordinates?</strong> Click the map frame on the right to open direct driving directions in another browser window or save route onto your device.
              </p>
            </div>

          </div>

          {/* Map Column - 7/12 */}
          <div className="lg:col-span-7 relative h-[380px] lg:h-auto min-h-[400px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/80 shadow-md">
            
            {/* Embedded Iframe */}
            <iframe
              src={loc.mapEmbed}
              className="absolute inset-0 w-full h-full border-0 select-none"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Maps core localization for: ${loc.name}`}
            ></iframe>

            {/* Float details bar */}
            <div className="absolute top-4 left-4 bg-slate-900/90 text-white backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 max-w-[85%] text-xs">
              <Compass className="w-4 h-4 text-blue-400 animate-spin" />
              <span className="font-semibold">{loc.city} Campus Verified</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
