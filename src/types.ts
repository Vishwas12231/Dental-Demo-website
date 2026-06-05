/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialty: 'cosmetic' | 'orthodontics' | 'oral-surgery' | 'pediatric' | 'general';
  bio: string;
  rating: number;
  reviewsCount: number;
  education: string;
  specialties: string[];
  image: string; // Picsum or visual placeholder seed
  availability: string[]; // e.g. ["Mon", "Tue", "Wed", "Thu", "Fri"]
  hours: string;
}

export interface Service {
  id: string;
  title: string;
  iconName: string; // lucide icon identifier
  shortDesc: string;
  longDesc: string;
  typicalDuration: string;
  priceRange: string;
  symptomsSolved: string[];
  benefits: string[];
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceId: string;
  doctorId: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  reason: string;
  isEmergency: boolean;
  notes?: string;
  createdAt: string;
  ticketId: string; // formatted code e.g. "RAD-88219"
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'procedures' | 'emergency' | 'billing';
}

export interface EmergencyTriageStep {
  id: string;
  condition: string;
  severity: 'critical' | 'urgent' | 'ambient';
  symptoms: string[];
  doSteps: string[];
  dontSteps: string[];
}

export interface BeforeAfterDemo {
  id: string;
  title: string;
  description: string;
  doctor: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImg: string;
  afterImg: string;
}
