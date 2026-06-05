/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { portfolioDemos } from '../data';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentCase = portfolioDemos[activeCaseIndex];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isResizing) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <section id="results" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
            Clinical Portfolio & Results
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight leading-normal font-display">
            Aesthetic Smile Transformations, <span className="font-serif italic font-normal text-blue-600">Perfected</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Drag the divider slider left and right to inspect the microscopic tooth restorations, cosmetic alignment vectors, and clinical bonding results crafted by our specialists.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {portfolioDemos.map((demo, idx) => (
            <button
              key={demo.id}
              onClick={() => {
                setActiveCaseIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                activeCaseIndex === idx
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {demo.title}
            </button>
          ))}
        </div>

        {/* Main Grid: Interactive Slider on Left, Case Description on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Slider Column - 7/12 */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Aspect container */}
            <div 
              ref={containerRef}
              className="relative w-full aspect-[4/3] bg-slate-300 rounded-2xl overflow-hidden shadow-xl border-4 border-white select-none cursor-ew-resize"
              onMouseDown={(e) => {
                e.preventDefault();
                setIsResizing(true);
                handleMove(e.clientX);
              }}
              onTouchStart={(e) => {
                setIsResizing(true);
                handleMove(e.touches[0].clientX);
              }}
            >
              {/* After Image (Always in background) */}
              <img 
                src={currentCase.afterImg} 
                alt="After medical treatment" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute right-4 bottom-4 bg-emerald-600 font-medium text-xs text-white uppercase tracking-wider px-3 py-1 rounded-full shadow-sm z-20">
                {currentCase.afterLabel}
              </div>

              {/* Before Image (Cropped overlay) */}
              <div 
                className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img 
                  src={currentCase.beforeImg} 
                  alt="Before treatment" 
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: containerRef.current?.getBoundingClientRect().width }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute left-4 bottom-4 bg-slate-800/95 font-medium text-xs text-white uppercase tracking-wider px-3 py-1 rounded-full shadow-sm z-20">
                  {currentCase.beforeLabel}
                </div>
              </div>

              {/* Handle Slider Bar */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white hover:bg-blue-300 shadow-md cursor-ew-resize z-30 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-600 border-4 border-white shadow-xl flex items-center justify-center pointer-events-none">
                  <div className="flex gap-0.5 text-white">
                    <span className="text-[10px]">◀</span>
                    <span className="text-[10px]">▶</span>
                  </div>
                </div>
              </div>

              {/* Slider instruction guide overlay */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/40 backdrop-blur-xs px-4 py-1.5 rounded-full text-[11px] text-white pointer-events-none">
                ◀ Drag Slider to Inspect Treatment Quality ▶
              </div>
            </div>
            
            <div className="mt-3 text-xs text-slate-400 text-center italic">
              Images above show typical clinical smile restorations. Results vary based on pre-care physiology.
            </div>
          </div>

          {/* Info Details Column - 5/12 */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-blue-600">
              <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-md">
                Verified Clinical Result
              </span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {currentCase.title}
            </h3>
            
            <p className="text-slate-600 leading-relaxed text-base">
              {currentCase.description}
            </p>

            <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-3.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Primary Clinician:</span>
                <span className="font-semibold text-slate-800">{currentCase.doctor}</span>
              </div>
              <div className="w-full h-px bg-slate-100" />
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Restored physiological bite pressure</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Ultra-thin shade-matched porcelain matching</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Preserved sound underlying tooth enamel</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a 
                href="#booking"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-100"
              >
                Request Similar Smile Design
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
