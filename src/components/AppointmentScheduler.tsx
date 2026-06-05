/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { doctors, services } from '../data';
import { Appointment } from '../types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  FileText, 
  Check, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Printer, 
  Download,
  CalendarCheck,
  X,
  Phone
} from 'lucide-react';

export default function AppointmentScheduler({ 
  preSelectedDoctorId, 
  preSelectedServiceId,
  onResetSelections 
}: { 
  preSelectedDoctorId?: string | null;
  preSelectedServiceId?: string | null;
  onResetSelections?: () => void;
}) {
  // Stepper flow: 1 = Treatment & Clinician, 2 = Date & Slot, 3 = Personal Info, 4 = Confirmation Ticket
  const [currentStep, setCurrentStep] = useState(1);
  const [myBookings, setMyBookings] = useState<Appointment[]>([]);
  const [showMyBookings, setShowMyBookings] = useState(false);

  // Form states
  const [selectedServiceId, setSelectedServiceId] = useState(preSelectedServiceId || '');
  const [selectedDoctorId, setSelectedDoctorId] = useState(preSelectedDoctorId || '');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [visitReason, setVisitReason] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [latestBooking, setLatestBooking] = useState<Appointment | null>(null);

  // Handle outside bindings
  useEffect(() => {
    if (preSelectedServiceId) setSelectedServiceId(preSelectedServiceId);
    if (preSelectedDoctorId) setSelectedDoctorId(preSelectedDoctorId);
    if (preSelectedServiceId || preSelectedDoctorId) {
      setCurrentStep(1);
    }
  }, [preSelectedServiceId, preSelectedDoctorId]);

  // Load existing bookings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('apex_bookings');
      if (stored) {
        setMyBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Generate basic calendar dates for next 14 days
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    // Start offering from tomorrow
    for (let i = 1; i <= 14; i++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + i);
      
      // Filter out Sundays (closed)
      if (targetDate.getDay() !== 0) {
        const yyyy = targetDate.getFullYear();
        const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
        const dd = String(targetDate.getDate()).padStart(2, '0');
        const str = `${yyyy}-${mm}-${dd}`;
        
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const label = `${dayNames[targetDate.getDay()]} ${targetDate.toLocaleString('default', { month: 'short' })} ${targetDate.getDate()}`;
        dates.push({ value: str, label, activeDayIndex: targetDate.getDay() });
      }
    }
    return dates;
  };

  const datesList = getAvailableDates();

  // Generate standard clinician timeslots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', 
    '04:00 PM', '05:00 PM'
  ];

  const handleNextStep = () => {
    setErrorMsg('');
    if (currentStep === 1) {
      if (!selectedServiceId) {
        setErrorMsg('Please select a dental treatment procedure.');
        return;
      }
      if (!selectedDoctorId) {
        setErrorMsg('Please select your preferred clinician.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedDate) {
        setErrorMsg('Please select an available appointment date.');
        return;
      }
      if (!selectedSlot) {
        setErrorMsg('Please select an preferred time slot.');
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!patientName.trim()) {
      setErrorMsg('Patient full name is required.');
      return;
    }
    if (!patientEmail.trim() || !patientEmail.includes('@')) {
      setErrorMsg('A valid email address is required.');
      return;
    }
    if (!patientPhone.trim() || patientPhone.length < 7) {
      setErrorMsg('A valid telephone phone number is required.');
      return;
    }

    // Generate appointment object
    const ticketId = `RAD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: Appointment = {
      id: Math.random().toString(36).substring(2, 9),
      patientName,
      patientEmail,
      patientPhone,
      serviceId: selectedServiceId,
      doctorId: selectedDoctorId,
      date: selectedDate,
      timeSlot: selectedSlot,
      reason: visitReason,
      isEmergency,
      createdAt: new Date().toISOString(),
      ticketId
    };

    const updated = [newBooking, ...myBookings];
    setMyBookings(updated);
    localStorage.setItem('apex_bookings', JSON.stringify(updated));

    setLatestBooking(newBooking);
    setCurrentStep(4);
    
    // Clear selections helper
    if (onResetSelections) onResetSelections();
  };

  const handleCancelBooking = (id: string) => {
    if (window.confirm("Are you sure you want to cancel this scheduled appointment?")) {
      const filtered = myBookings.filter(b => b.id !== id);
      setMyBookings(filtered);
      localStorage.setItem('apex_bookings', JSON.stringify(filtered));
    }
  };

  // Find names for rendering lists
  const doctorObj = doctors.find(d => d.id === (latestBooking?.doctorId || selectedDoctorId));
  const serviceObj = services.find(s => s.id === (latestBooking?.serviceId || selectedServiceId));

  const activeDateLabel = datesList.find(d => d.value === selectedDate)?.label || selectedDate;

  return (
    <section id="booking" className="py-16 md:py-24 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Grid */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase bg-blue-100/60 px-3 py-1 rounded-full">
              Live Scheduler & Reservation portal
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight leading-normal font-display">
              Reserve Your Live <span className="font-serif italic font-normal text-blue-600">Clinical Placement</span>
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl">
              Reserve your slot instantly. Our clinicians automatically sync with this live planner. All digital submissions trigger immediate checkout and priority entry.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex gap-4">
            <button
              onClick={() => setShowMyBookings(!showMyBookings)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex items-center gap-2 ${
                showMyBookings 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              {showMyBookings ? 'View Scheduler Input' : `My Bookings (${myBookings.length})`}
            </button>
          </div>
        </div>

        {/* SECTION A: LIST RECENT PATIENT BOOKINGS */}
        {showMyBookings ? (
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg md:text-xl font-bold text-slate-900">
                Your Scheduled Clinic Appointments
              </h3>
              <button 
                onClick={() => setShowMyBookings(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {myBookings.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-xl max-w-lg mx-auto">
                <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">You have no active scheduled bookings under this session yet.</p>
                <button 
                  onClick={() => setShowMyBookings(false)}
                  className="mt-4 text-blue-600 text-sm font-bold underline hover:text-blue-700"
                >
                  Schedule Your First Appointment Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myBookings.map((booking) => {
                  const bDoc = doctors.find(d => d.id === booking.doctorId);
                  const bSer = services.find(s => s.id === booking.serviceId);
                  
                  return (
                    <div key={booking.id} className="p-5 rounded-xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/20 relative shadow-xs">
                      
                      {/* Ticket Badge */}
                      <div className="absolute top-4 right-4 text-right">
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-100 uppercase tracking-widest px-2 py-0.5 rounded-md">
                          {booking.ticketId}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-base mb-1">
                        {booking.patientName}
                      </h4>
                      <p className="text-xs text-slate-500 mb-4 font-medium">Recorded Name</p>

                      <div className="space-y-2 text-sm text-slate-700 mb-5">
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium text-xs">Treatment:</span>
                          <span className="font-semibold text-slate-800 text-xs">{bSer?.title || 'General Checkup'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium text-xs">Dentist:</span>
                          <span className="font-semibold text-slate-800 text-xs">{bDoc?.name || booking.doctorId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium text-xs">Date:</span>
                          <span className="font-semibold text-slate-800 text-xs">{booking.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium text-xs">Time Slot:</span>
                          <span className="font-semibold text-blue-600 text-xs">{booking.timeSlot}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 text-xs font-semibold rounded-lg transition"
                        >
                          Cancel Appointment
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          
          /* SECTION B: MULTI-STEP APPOINTMENT FUNNEL */
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            
            {/* Left Steps Helper Sidebar (Visible on large screens) */}
            <div className="lg:col-span-4 bg-slate-900 text-white p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm tracking-wider uppercase mb-8">
                  <ShieldCheck className="w-5 h-5 text-blue-400 animate-pulse" />
                  Apex Security Guarded
                </div>

                <h3 className="text-xl md:text-2xl font-extrabold tracking-tight leading-snug">
                  Your Dental Journey Begins Globally
                </h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  Provide diagnostic choices to let our clinics reserve optimal instruments and decontaminate setups prior to your drive.
                </p>

                {/* Progress Indicators */}
                <div className="mt-10 space-y-6">
                  {[
                    { nr: 1, name: 'Treatment & Clinician', desc: 'Select procedure' },
                    { nr: 2, name: 'Date & Time Selection', desc: 'Visual timeline' },
                    { nr: 3, name: 'Patient Personal File', desc: 'Form files' },
                    { nr: 4, name: 'Gate Entry Ticket', desc: 'Medical PDF invoice' }
                  ].map((step) => {
                    const isDone = currentStep > step.nr;
                    const isActive = currentStep === step.nr;
                    return (
                      <div key={step.nr} className="flex gap-4 items-start">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isDone 
                            ? 'bg-blue-500 text-white' 
                            : isActive 
                            ? 'bg-blue-600 text-white border-2 border-white ring-4 ring-blue-900' 
                            : 'bg-slate-800 text-slate-500'
                        }`}>
                          {isDone ? <Check className="w-4 h-4" /> : step.nr}
                        </div>
                        <div>
                          <h4 className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                            {step.name}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-800 text-xs text-slate-500 leading-relaxed">
                Need urgent same-day help? Reach our Downtown Trauma team at <strong>+1 (555) 720-3099</strong>.
              </div>
            </div>

            {/* Right Funnel Page Content - 8/12 */}
            <div className="lg:col-span-8 p-6 md:p-10 flex flex-col justify-between">
              
              {/* Form Content Wrapper */}
              <div>
                
                {/* Steps Header title */}
                <div className="mb-6">
                  {currentStep === 1 && (
                    <>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">Select Treatment & Clinician</h3>
                      <p className="text-xs text-slate-500 font-semibold mt-1">Select dental services from our catalog and pick an expert.</p>
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">Schedule Date & Choose Time</h3>
                      <p className="text-xs text-slate-500 font-semibold mt-1">Clinician schedules are updated to real-time. Sundays are closed.</p>
                    </>
                  )}
                  {currentStep === 3 && (
                    <>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">Complete Patient Medical Form</h3>
                      <p className="text-xs text-slate-500 font-semibold mt-1">Please provide correct names and contact numbers for ticket dispatch.</p>
                    </>
                  )}
                  {currentStep === 4 && (
                    <>
                      <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full w-fit">
                        <Check className="w-4 h-4 text-emerald-500" />
                        Apex Clinic Reservation Complete
                      </div>
                      <p className="text-xs text-slate-500 mt-1 font-semibold">Print or screenshot this ticket for reception entry.</p>
                    </>
                  )}
                </div>

                {/* Display Warning Error Messages */}
                {errorMsg && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-start gap-2.5 text-xs text-red-800">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="font-semibold">{errorMsg}</p>
                  </div>
                )}

                {/* STEP 1: TREATMENT CHOICE & DOCTOR SELECTION */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    
                    {/* Choose service */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Dental Treatment Needed
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {services.map((ser) => (
                          <div 
                            key={ser.id}
                            onClick={() => setSelectedServiceId(ser.id)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${
                              selectedServiceId === ser.id 
                                ? 'bg-blue-50/50 border-blue-500 shadow-sm shadow-blue-50' 
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="text-xs sm:text-sm font-bold text-slate-800">{ser.title}</h4>
                              <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                                selectedServiceId === ser.id ? 'border-blue-500 bg-blue-500 text-white' : 'border-slate-300 bg-white'
                              }`}>
                                {selectedServiceId === ser.id && <Check className="w-2.5 h-2.5" />}
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1.5 leading-snug line-clamp-2">{ser.shortDesc}</p>
                            <span className="text-[10px] text-blue-600 bg-blue-50/80 rounded-md font-bold px-1.5 py-0.5 mt-2 inline-block">
                              Avg cost: {ser.priceRange}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Choose Doctor */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Preffered Clinician Specialty
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {doctors.map((doc) => (
                          <div 
                            key={doc.id}
                            onClick={() => setSelectedDoctorId(doc.id)}
                            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex gap-3 items-center ${
                              selectedDoctorId === doc.id 
                                ? 'bg-blue-50/50 border-blue-500 shadow-sm shadow-blue-100' 
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <img 
                              src={doc.image} 
                              alt={doc.name} 
                              className="w-10 h-10 rounded-full object-cover shadow-sm bg-slate-300"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs sm:text-sm font-bold text-slate-800 truncate">{doc.name}</h4>
                              <p className="text-[11px] text-slate-500 truncate">{doc.role}</p>
                            </div>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              selectedDoctorId === doc.id ? 'border-blue-500 bg-blue-500 text-white' : 'border-slate-300 bg-white'
                            }`}>
                              {selectedDoctorId === doc.id && <Check className="w-2.5 h-2.5" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* STEP 2: ACTIVE DATES & SLOTS VISUAL SELECTION */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    
                    {/* Date select wrapper */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Available Calendar Days (Mon - Sat)
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                        {datesList.map((dt) => (
                          <button
                            key={dt.value}
                            onClick={() => {
                              setSelectedDate(dt.value);
                              setSelectedSlot('');
                            }}
                            className={`py-3.5 px-2 rounded-xl text-xs font-semibold cursor-pointer border transition-all text-center flex flex-col justify-center items-center gap-1.5 ${
                              selectedDate === dt.value 
                                ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100' 
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <CalendarIcon className={`w-4 h-4 ${selectedDate === dt.value ? 'text-white' : 'text-blue-500'}`} />
                            <span className="truncate">{dt.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Slots wrapper */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Available Time Slots on {activeDateLabel || 'Selected Day'}
                      </label>
                      {!selectedDate ? (
                        <div className="py-8 bg-slate-50 rounded-xl text-center text-xs text-slate-400 font-medium">
                          Please select an Appointment Date above first to populate slots.
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-2 ${
                                selectedSlot === slot 
                                  ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100' 
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-blue-50/50 hover:bg-slate-50'
                              }`}
                            >
                              <Clock className="w-3.5 h-3.5" />
                              {slot}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                )}

                {/* STEP 3: PATIENT CONTACT DATA & SYMPTOMS TRIAGE */}
                {currentStep === 3 && (
                  <form onSubmit={handleBookAppointment} className="space-y-5">
                    
                    {/* Basic names */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Patient Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Johnathan Carter"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:outline-hidden"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          required
                          placeholder="e.g. john@example.com"
                          value={patientEmail}
                          onChange={(e) => setPatientEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:outline-hidden"
                        />
                      </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Telephone Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <input 
                            type="tel" 
                            required
                            placeholder="e.g. +1 (555) 750-2211"
                            value={patientPhone}
                            onChange={(e) => setPatientPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:outline-hidden"
                          />
                        </div>
                      </div>

                      {/* Emergency Checkbox */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">Is this a Dental Emergency?</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">Prioritizes severe toothaches or swelling.</p>
                        </div>
                        <input 
                          type="checkbox"
                          checked={isEmergency}
                          onChange={(e) => setIsEmergency(e.target.checked)}
                          className="w-4.5 h-4.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                        />
                      </div>

                    </div>

                    {/* Check description */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Specific Dental Concerns or Symptoms
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
                        <textarea 
                          rows={3}
                          placeholder="e.g. Sharp throbbing pain on back lower molar when chewing cold food, slight gum swelling."
                          value={visitReason}
                          onChange={(e) => setVisitReason(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:outline-hidden resize-none"
                        ></textarea>
                      </div>
                    </div>

                  </form>
                )}

                {/* STEP 4: CONFIRMATION INVOICE TICKET */}
                {currentStep === 4 && latestBooking && (
                  <div className="space-y-6">
                    
                    {/* Printable Receipt layout */}
                    <div id="booking-invoice-ticket" className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-6 relative select-all flex flex-col md:flex-row gap-6 justify-between items-stretch">
                      
                      {/* Ticket content */}
                      <div className="flex-1 space-y-4">
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded">
                              Confirmed Check-in Ticket
                            </span>
                            <h4 className="font-extrabold text-slate-900 text-lg mt-1">Apex Dental Care</h4>
                          </div>
                          
                          <div className="text-right">
                            <span className="font-mono text-base font-bold text-blue-600 block bg-white px-3 py-1 rounded border border-blue-100">
                              {latestBooking.ticketId}
                            </span>
                          </div>
                        </div>

                        <div className="divide-y divide-slate-200 border-y border-slate-200 py-3.5 space-y-3">
                          
                          <div className="flex justify-between text-xs pt-1">
                            <span className="text-slate-400 font-medium">Recorded PatientName:</span>
                            <span className="font-bold text-slate-800">{latestBooking.patientName}</span>
                          </div>

                          <div className="flex justify-between text-xs pt-3">
                            <span className="text-slate-400 font-medium">Primary Clinician:</span>
                            <span className="font-bold text-slate-800">{doctorObj?.name} ({doctorObj?.role})</span>
                          </div>

                          <div className="flex justify-between text-xs pt-3">
                            <span className="text-slate-400 font-medium">Dental Procedure:</span>
                            <span className="font-bold text-slate-800">{serviceObj?.title}</span>
                          </div>

                          <div className="flex justify-between text-xs pt-3">
                            <span className="text-slate-400 font-medium">Session Date:</span>
                            <span className="font-bold text-blue-700">{latestBooking.date}</span>
                          </div>

                          <div className="flex justify-between text-xs pt-3">
                            <span className="text-slate-400 font-medium">Arrival Time Slot:</span>
                            <span className="font-bold text-blue-600">{latestBooking.timeSlot}</span>
                          </div>

                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-slate-200/50">
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 label text-blue-500">
                            Check-In Instructions & Prep:
                          </h4>
                          <ul className="text-[11px] text-slate-500 space-y-1 list-disc pl-4 leading-relaxed font-semibold">
                            <li>Please arrive 15 minutes early for checkup paper registers.</li>
                            <li>Bring valid photo ID card & dental/health insurance cards.</li>
                            {latestBooking.serviceId === 'emergency-pain-rescue' ? (
                              <li className="text-red-600 font-bold">Avoid consuming solid hot foods 2 hours before root canals.</li>
                            ) : (
                              <li>Avoid coffee, energy drinks, or stimulants prior to appointment.</li>
                            )}
                          </ul>
                        </div>

                      </div>

                      {/* QR Check-in Box overlay */}
                      <div className="w-full md:w-40 border-t md:border-t-0 md:border-l-2 border-dashed border-slate-200 mt-4 md:mt-0 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center items-center text-center">
                        
                        {/* Elegant custom pure-CSS QR Code matching Apex brand */}
                        <div className="w-24 h-24 bg-white border border-slate-300 p-2 rounded-lg grid grid-cols-3 gap-0.5 relative">
                          {/* Anchor squares */}
                          <div className="w-6 h-6 border-4 border-slate-900 rounded bg-slate-900 absolute top-2 left-2 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-white rounded"></div>
                          </div>
                          <div className="w-6 h-6 border-4 border-slate-900 rounded bg-slate-900 absolute top-2 right-2 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-white rounded"></div>
                          </div>
                          <div className="w-6 h-6 border-4 border-slate-900 rounded bg-slate-900 absolute bottom-2 left-2 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-white rounded"></div>
                          </div>
                          {/* random bits */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                            <div className="flex gap-0.5"><div className="w-1.5 h-1.5 bg-slate-900"></div><div className="w-1.5 h-1.5 bg-transparent"></div></div>
                            <div className="flex gap-0.5"><div className="w-1.5 h-1.5 bg-transparent"></div><div className="w-1.5 h-1.5 bg-slate-900"></div></div>
                          </div>
                        </div>

                        <span className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                          Patient Check-in QR
                        </span>
                        
                        <p className="text-[9px] text-slate-400 mt-1 max-w-[130px] leading-tight">
                          Present at central lobby digital kiosks for priority check-in bypass.
                        </p>

                      </div>

                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => window.print()}
                        className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                      >
                        <Printer className="w-4 h-4 text-slate-500" />
                        Print Confirmation
                      </button>
                      <button
                        onClick={() => {
                          setCurrentStep(1);
                          setSelectedDate('');
                          setSelectedSlot('');
                          setPatientName('');
                          setPatientEmail('');
                          setPatientPhone('');
                          setVisitReason('');
                          setIsEmergency(false);
                          setLatestBooking(null);
                        }}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-blue-100"
                      >
                        <CalendarIcon className="w-4 h-4" />
                        Book Another Appointment
                      </button>
                    </div>

                  </div>
                )}

              </div>

              {/* Back & Next Navigation controls */}
              {currentStep < 4 && (
                <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                      currentStep === 1 
                        ? 'text-slate-300 cursor-not-allowed' 
                        : 'text-slate-600 bg-slate-50 hover:bg-slate-100'
                    } flex items-center gap-1`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  <button
                    onClick={currentStep === 3 ? handleBookAppointment : handleNextStep}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-100"
                  >
                    {currentStep === 3 ? 'Confirm Dental Appointment' : 'Continue'}
                    {currentStep < 3 && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
