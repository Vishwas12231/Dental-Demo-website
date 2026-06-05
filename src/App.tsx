/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import Doctors from './components/Doctors';
import EmergencyTriage from './components/EmergencyTriage';
import AppointmentScheduler from './components/AppointmentScheduler';
import ClinicMap from './components/ClinicMap';
import SmartAssistant from './components/SmartAssistant';
import { faqs } from './data';

import { 
  HeartPulse, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ChevronDown, 
  Star, 
  Award, 
  ShieldCheck, 
  FileText,
  UserCheck,
  Stethoscope,
  Smile
} from 'lucide-react';

export default function App() {
  const [preSelectedDoctorId, setPreSelectedDoctorId] = useState<string | null>(null);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | null>(null);

  // FAQ interactive state
  const [activeFaqId, setActiveFaqId] = useState<string | null>('faq-1');
  const [faqFilter, setFaqFilter] = useState<'all' | 'booking' | 'procedures' | 'emergency' | 'billing'>('all');

  const handleSelectSlot = (docId: string, svcId: string) => {
    setPreSelectedDoctorId(docId);
    setPreSelectedServiceId(svcId);
    
    // Smooth scroll to scheduler
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetSelections = () => {
    setPreSelectedDoctorId(null);
    setPreSelectedServiceId(null);
  };

  const filteredFaqs = faqFilter === 'all' 
    ? faqs 
    : faqs.filter(f => f.category === faqFilter);

  const testimonials = [
    {
      name: "Claire Fontaine",
      role: "Digital Smile Makeover",
      content: "Dr. Vance hand-crafted my veneers beautifully. There was zero tooth pain, and the 3D visual preview was exact. The clinic feels more like a luxury spa than a dental lobby. Highly recommended!",
      stars: 5,
      doc: "Dr. Alexander Vance",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Maria Ramos",
      role: "Parent of 6-year-old",
      content: "Finding a pediatric dentist who handles anxiety matches is a miracle. Dr. Ruiz is a kid whisperer! My 6-year-old was actually laughing during his cavity fissure sealants. Highly trustworthy clinic.",
      stars: 5,
      doc: "Dr. Emily Ruiz",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Ethan Caldwell, MD",
      role: "Invisalign Orthodontics",
      content: "As an emergency trauma physician, I am extremely critical of sterilization techniques and clinical protocols. Dr. Lin aligned my bite over 11 months with perfect physiology. Clinical care is superb here.",
      stars: 5,
      doc: "Dr. Sarah Lin",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "James Miller",
      role: "Emergency Root Canal Restoration",
      content: "Had a severe throbbing toothache on a busy Saturday. Dr. Kevin Park lanced the abscess, clean-sealed the pulp with fine microscopes, and ended my pain instantly. Truly exceptional rescue dentistry.",
      stars: 5,
      doc: "Dr. Kevin Park",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    }
  ];

  return (
    <div id="clinic-viewport" className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* SECTION 1: STICKY BRAND NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16.5 sm:h-20 items-center justify-between">
            
            {/* Branding Logo */}
            <a href="#" className="flex items-center gap-2 sm:gap-3 group">
              <div className="p-2 sm:p-2.5 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-100 group-hover:bg-blue-700 transition">
                <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
              </div>
              <div>
                <span className="font-extrabold text-[#0f172a] text-base sm:text-lg tracking-tight block">
                  Apex Dental Care
                </span>
                <span className="text-[9.5px] font-bold text-blue-600 uppercase tracking-widest block -mt-0.5">
                  Radiant Smiles Clinic
                </span>
              </div>
            </a>

            {/* Desktop Center Links */}
            <nav className="hidden lg:flex items-center gap-6.5 text-[13px] font-bold text-slate-600">
              <a href="#services" className="hover:text-blue-600 transition">Services</a>
              <a href="#results" className="hover:text-blue-600 transition">Before & After</a>
              <a href="#doctors" className="hover:text-blue-600 transition">Our Doctors</a>
              <a href="#emergency" className="hover:text-blue-600 text-red-650 font-extrabold flex items-center gap-1 bg-red-50 text-red-650 border border-red-100 px-2 rounded-full py-0.5 text-[12px] hover:bg-red-100 animate-pulse transition">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Emergency Triage
              </a>
              <a href="#contact" className="hover:text-blue-600 transition">Locations</a>
              <a href="#faqs" className="hover:text-blue-600 transition">FAQs</a>
            </nav>

            {/* Desktop Right Hand Info Calls & Booking CTAs */}
            <div className="flex items-center gap-3">
              <a 
                href="tel:+15557203000"
                className="hidden md:flex items-center gap-2 p-2 px-3.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700"
              >
                <Phone className="w-4 h-4 text-blue-500 animate-bounce" />
                <span>Downtown: +1 (555) 720-3000</span>
              </a>

              <a
                href="#booking"
                className="p-3 px-5 sm:px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-xs tracking-wide transition shadow-md shadow-blue-100"
              >
                Book Slot
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* Hero Header Section */}
      <Hero onTriggerBooking={handleSelectSlot} />

      {/* Services Directory Catalog */}
      <Services onSelectServiceSlot={handleSelectSlot} />

      {/* Before & After restorative transformations slide slider */}
      <BeforeAfterSlider />

      {/* Our doctor Specialists */}
      <Doctors onSelectDoctorSlot={handleSelectSlot} />

      {/* Urgent Emergency support & checklist warnings */}
      <EmergencyTriage onSelectEmergencySlot={handleSelectSlot} />

      {/* Online Reservation visual Scheduler */}
      <AppointmentScheduler 
        preSelectedDoctorId={preSelectedDoctorId}
        preSelectedServiceId={preSelectedServiceId}
        onResetSelections={handleResetSelections}
      />

      {/* FAQ SECTION */}
      <section id="faqs" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
              Patient Questions & Help
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight leading-normal font-display">
              Patient Questions <span className="font-serif italic font-normal text-blue-600">& Resource Guides</span>
            </h2>
          </div>

          {/* Filter switches */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[
              { id: 'all', n: 'All Topics' },
              { id: 'booking', n: 'Scheduler & Booking' },
              { id: 'procedures', n: 'Treatments & Science' },
              { id: 'emergency', n: 'Emergency Protocols' },
              { id: 'billing', n: 'PPOs & Financing' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFaqFilter(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition ${
                  faqFilter === tab.id 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-350'
                }`}
              >
                {tab.n}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isExpanded = activeFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setActiveFaqId(isExpanded ? null : faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-800 hover:bg-slate-50/50 transition-all"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {isExpanded && (
                    <div className="p-5 pt-0 px-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/20 font-semibold">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Patient Testimonials reviews */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
              Accredited Smile Stories
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight leading-normal font-display">
              Patient Testimonials <span className="font-serif italic font-normal text-blue-600">& Genuine Reviews</span>
            </h2>
          </div>

          {/* Grid Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <div 
                key={idx}
                className="p-6 md:p-8 bg-slate-50 border border-slate-200 rounded-3xl relative flex flex-col justify-between"
              >
                
                {/* Content */}
                <div className="space-y-4">
                  {/* Stars indicators */}
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: test.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-600 text-sm italic font-medium leading-relaxed">
                    "{test.content}"
                  </p>
                </div>

                {/* Profile card below */}
                <div className="mt-6 pt-6 border-t border-slate-200/60 flex items-center gap-4">
                  <img 
                    src={test.image} 
                    alt={test.name} 
                    className="w-10 h-10 rounded-full object-cover shadow-sm bg-slate-350"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm leading-tight">
                      {test.name}
                    </h4>
                    <p className="text-[10.5px] text-blue-600 font-semibold uppercase tracking-wider">
                      Verified {test.role} • treated by {test.doc}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Multi-Location Switcher and embedded Google Maps */}
      <ClinicMap />

      {/* FLOAT SMART CONVERSATION DENTAL ASSISTANT BAR */}
      <SmartAssistant onTriggerBooking={handleSelectSlot} />

      {/* FOOTER COYPRIGHT */}
      <footer className="bg-slate-900 text-slate-400 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 border-b border-slate-800 pb-12 mb-12">
          
          {/* Logo brand info - 4/12 */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-600 text-white rounded-xl shadow-md">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">Apex Dental Care</span>
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Modern digital orthodontics, custom biological crowns, child dentistry, and microscopic root canals. Fully licensed clinical providers of sedation treatments.
            </p>

            <div className="flex gap-4">
              <span className="text-[10px] uppercase tracking-widest font-bold bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded">
                HIPAA Certified
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded">
                ADA Accredited
              </span>
            </div>
          </div>

          {/* Quick links - 3/12 */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Quick Clinic Map</h4>
            <div className="text-xs space-y-2 flex flex-col font-medium">
              <a href="#services" className="hover:text-white transition">Practice Departments</a>
              <a href="#results" className="hover:text-white transition">Before & After Portfolio</a>
              <a href="#doctors" className="hover:text-white transition">Accredited Clinicians</a>
              <a href="#emergency" className="hover:text-white transition text-red-400 font-bold">24/7 Dental Emergency Triage</a>
              <a href="#booking" className="hover:text-white transition">Online Scheduler portal</a>
            </div>
          </div>

          {/* Locations summary - 3/12 */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Clinic Campuses</h4>
            <div className="text-xs space-y-1.5 font-semibold text-slate-500">
              <p className="text-slate-450 text-slate-350 font-bold">Downtown Metropolis Core:</p>
              <p>450 Healthcare Blvd, Suite 210</p>
              <p className="text-blue-500 font-medium">+1 (555) 720-3000</p>
              
              <p className="text-slate-450 text-slate-350 font-bold pt-2">Metro Heights Suburban Plaza:</p>
              <p>102 Meridian Pkwy</p>
              <p className="text-blue-500 font-medium">+1 (555) 480-1200</p>
            </div>
          </div>

          {/* Legal/Safety - 2/12 */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Practice Certifications</h4>
            <ul className="text-xs space-y-1.5 list-disc pl-4 text-slate-550 leading-relaxed font-semibold">
              <li>0% CareCredit Financing</li>
              <li>PPO Insurance Auto-Checks</li>
              <li>Surgical computed CBCT CT scans</li>
              <li>EPA Amalgam-Free Clinics</li>
            </ul>
          </div>

        </div>

        {/* Footer Base bottom line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="font-semibold text-center md:text-left leading-normal">
            © {new Date().getFullYear()} Apex Dental Practice Group. All Rights Reserved. Clinical procedures are monitored relative to dental pre-care criteria. Terms and HIPAA Privacy disclosures apply.
          </p>
          <div className="flex gap-4 font-bold">
            <a href="#" className="hover:text-slate-350">Privacy Disclosures</a>
            <a href="#" className="hover:text-slate-350">ADA Guidelines</a>
            <a href="#" className="hover:text-slate-350">Accessibility</a>
          </div>
        </div>

      </footer>

    </div>
  );
}
