/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Doctor, Service, FAQItem, EmergencyTriageStep, BeforeAfterDemo } from './types';

export const doctors: Doctor[] = [
  {
    id: 'dr-vance',
    name: 'Dr. Alexander Vance, DDS',
    role: 'Lead Cosmetic & Restorative Dentist',
    specialty: 'cosmetic',
    bio: 'With over 14 years of clinical cosmetic experience, Dr. Vance specializes in creating beautiful, life-changing smiles through advanced digital smile design, veneers, and composite bonding.',
    rating: 4.9,
    reviewsCount: 312,
    education: 'Harvard School of Dental Medicine',
    specialties: ['Porcelain Veneers', 'Digital Smile Design', 'Full-Mouth Dental Makeovers'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop',
    availability: ['Mon', 'Tue', 'Wed', 'Thu'],
    hours: '9:00 AM - 5:00 PM'
  },
  {
    id: 'dr-lin',
    name: 'Dr. Sarah Lin, MDS',
    role: 'Chief Orthodontist & Invisalign Expert',
    specialty: 'orthodontics',
    bio: 'Dr. Lin is a premier Gold-Provider certified Invisalign expert. She is deeply passionate about craft, utilizing robotic diagnostics and light-force brackets to design perfectly balanced, physiological bites.',
    rating: 4.8,
    reviewsCount: 247,
    education: 'UPenn Orthodontics Residency',
    specialties: ['Clear Aligner Orthodontics', 'Early Orthodontic Triage', 'Skeletal Expansion'],
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=600&auto=format&fit=crop',
    availability: ['Tue', 'Wed', 'Thu', 'Fri'],
    hours: '8:30 AM - 4:30 PM'
  },
  {
    id: 'dr-throne',
    name: 'Dr. Marcus Throne, DMD, PhD',
    role: 'Consulting Oral & Maxillofacial Surgeon',
    specialty: 'oral-surgery',
    bio: 'Dr. Throne is a dual-degree surgeon specialising in reconstructive dental implantology, minimally invasive wisdom teeth extraction, and 3D implant navigation templates.',
    rating: 5.0,
    reviewsCount: 189,
    education: 'Columbia University & Mayo Clinic Residency',
    specialties: ['Immediate Same-Day Implants', 'Bone Regeneration', 'Intravenous Deep Sedation'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop',
    availability: ['Mon', 'Wed', 'Fri'],
    hours: '8:00 AM - 4:00 PM'
  },
  {
    id: 'dr-ruiz',
    name: 'Dr. Emily Ruiz, DDS',
    role: 'Pediatric Dental Specialist',
    specialty: 'pediatric',
    bio: 'Dr. Ruiz is famous for her comforting, cheerful "no-fear" dental philosophy. She treats infants, children, and teens, turning checkups into fun scientific adventures in a kid-friendly workspace.',
    rating: 4.9,
    reviewsCount: 380,
    education: 'Columbia School of Dental Medicine',
    specialties: ['Child Psychology Triage', 'Fluoride Protection', 'Sports Mouthguards'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop',
    availability: ['Mon', 'Tue', 'Fri'],
    hours: '9:00 AM - 5:30 PM'
  },
  {
    id: 'dr-park',
    name: 'Dr. Kevin Park, DDS',
    role: 'Restorative & Emergency Dentist',
    specialty: 'general',
    bio: 'Dr. Park is our clinical champion for immediate dental rescue. He focuses on tooth retention treatments, dental crown fabrications, precision root canals, and immediate toothache resolution.',
    rating: 4.7,
    reviewsCount: 418,
    education: 'NYU College of Dentistry',
    specialties: ['Microscopic Root Canals', 'Same-Day Dental Crowns', 'Emergency Pain Rescue'],
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    hours: '9:00 AM - 6:00 PM'
  }
];

export const services: Service[] = [
  {
    id: 'cosmetic-whitening',
    title: 'Cosmetic Veneers & Whitening',
    iconName: 'Sparkles',
    shortDesc: 'Premium porcelain restorations and laser dental whitening to illuminate your radiant smile.',
    longDesc: 'Transform discolored, worn, chipped, or misaligned teeth using custom hand-layered porcelain shell veneers or modern clinical laser whitening. Every makeover starts with an advanced 3D face-driven digital layout simulating your final, natural-looking results before we begin.',
    typicalDuration: '1 - 2 hours per session',
    priceRange: '$$ - $$$',
    symptomsSolved: ['Teeth discoloration', 'Gaps between teeth', 'Slight dental crowding', 'Chipped enamel'],
    benefits: ['Non-invasive option available', 'Instant, dazzling confidence boost', 'Stain-resistant porcelain material', 'Custom shade matched perfectly']
  },
  {
    id: 'invisalign-aligners',
    title: 'Precision Invisalign & Orthodontics',
    iconName: 'Smile',
    shortDesc: 'Sleek, transparent aligners to construct perfect dental alignment comfortably and invisibly.',
    longDesc: 'Move misaligned teeth steadily with gold-certified orthodontic aligners. Using precise intraoral iTero laser scanners, we model your entire dental path in 3D. Over the course of customized weekly aligner swaps, your teeth progress into alignment without unhygienic metal brackets.',
    typicalDuration: '45 mins checkups',
    priceRange: '$$$',
    symptomsSolved: ['Overbite/Underbite', 'Dental crowding', 'Crossbites and rotated teeth', 'Chewing difficulties'],
    benefits: ['100% removable for dining & cleaning', 'Practically invisible in meetings', 'Gentle, continuous physiological force', 'Fewer clinical visits than braces']
  },
  {
    id: 'dental-implants',
    title: 'Advanced Smile Dental Implants',
    iconName: 'Shield',
    shortDesc: 'Permanent biological replacement for missing teeth using pure biocompatible titanium posts.',
    longDesc: 'Replace a single missing tooth or a full arch with lifelong stability. Our specialized Guided Surgical Guide placements utilize computed tomography (CBCT) to safe-path key implant anchors directly into the jaw, causing minimal recovery periods and maximum bone-growth preservation.',
    typicalDuration: '1.5 hours',
    priceRange: '$$$$',
    symptomsSolved: ['Single or multiple missing teeth', 'Unstable, slipping dentures', 'Bone reabsorption', 'Chewing weakness'],
    benefits: ['Matches feel & strength of natural teeth', 'Stops facial bone shrinkage', 'Never slips, clicks or falls out', 'Protected by our lifetime clinic warranty']
  },
  {
    id: 'kids-dentistry',
    title: 'Gentle Kids Caring Dentistry',
    iconName: 'Baby',
    shortDesc: 'Compassionate, friendly checkups and decay prevention tailored uniquely for growing smiles.',
    longDesc: 'Create a warm, delightful core memory for children. We focus on gentle brushing workshops, protective fissure sealants, early jaw growth monitoring, and tooth-strengthening clinical fluorides. Dr. Emily Ruiz avoids stress triggers through playful tools and prize reward systems.',
    typicalDuration: '30 - 45 mins',
    priceRange: '$',
    symptomsSolved: ['First deciduous teeth inspection', 'Cavity risk', 'Early jaw mismatching', 'Thumb-sucking adaptation'],
    benefits: ['100% fear-free interactive setting', 'Educational and fun dental workshops', 'Proactive decay preventive coatings', 'Free pediatric mouth protection advice']
  },
  {
    id: 'emergency-pain-rescue',
    title: 'Urgent Pain Rescue & Root Canals',
    iconName: 'Activity',
    shortDesc: 'Immediate pain extraction and high-precision therapy for damaged or abscessed dental cores.',
    longDesc: 'Save a heavily decayed, infected, or fractured tooth facing extract risks. Utilizing modern electronic apex locators and rotating microscopes, we eliminate infected pulp, decontaminate internal dental channels, and reseal with hermetic gutta-percha fillings, instantly ending severe pain.',
    typicalDuration: '1 - 1.5 hours',
    priceRange: '$$',
    symptomsSolved: ['Severe throbbing dental pain', 'Abscess or facial cheek swelling', 'Intense hot/cold dental pain', 'Horizontal tooth cracks'],
    benefits: ['Saves natural tooth structure', 'Stops infection spreading', 'Immediate pain and pressure resolution', 'Same-day clinical crowns ready']
  }
];

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I schedule an appointment and what can I expect?',
    answer: 'You can easily book online using our live Scheduler tool on this page! Choose your service, select your preferred dentist, and choose a date/time. Once submitted, you will receive an automatic confirmation ticket. Our team will text or email a quick pre-care reminder 24 hours prior to your visit.',
    category: 'booking'
  },
  {
    id: 'faq-2',
    question: 'How do porcelain veneers work, and do they damage my outer teeth?',
    answer: 'Veneers are ultra-thin, highly customized porcelain shells bonded to the front of teeth. Modern bonding relies on minimal preparation – often shaving less than 0.3mm of enamel (about the thickness of a contact lens) or utilizing non-prep veneers. This preserves internal tooth viability while providing immense strength and stain resistance.',
    category: 'procedures'
  },
  {
    id: 'faq-3',
    question: 'What is considered a real dental emergency and what should I do?',
    answer: 'Severe throbbing teeth aches, facial swelling, uncontrolled oral bleeding, or a knocked-out tooth are definite emergencies. Please click our red "Emergency Triage" button above. It triggers custom checklists (e.g., how to preserve a knocked-out tooth in milk) and locks in an immediate, same-day rescue slot.',
    category: 'emergency'
  },
  {
    id: 'faq-4',
    question: 'Do you accept major dental PPO insurance plans or offer financing?',
    answer: 'Yes! We accept all major dental PPOs (including Delta Dental, Cigna, Aetna, MetLife, and UnitedHealthcare). For treatments like implants and clear aligners that might not be fully covered, we offer 0% interest monthly financing plans through CareCredit and simple direct payment installments.',
    category: 'billing'
  },
  {
    id: 'faq-5',
    question: 'I feel extreme anxiety about dentists. How does your clinic handle this?',
    answer: 'Dental fear is extremely common, and we take it very seriously. Our rooms feature soft acoustics, weighted blankets, noise-canceling headphones, and overhead smart screens. For deeper comfort, Dr. Marcus Throne provides mild nitrous oxide (laughing gas) and physician-monitored conscious oral or IV deep sedation options.',
    category: 'procedures'
  }
];

export const emergencySteps: EmergencyTriageStep[] = [
  {
    id: 'knocked-out',
    condition: 'Knocked-Out Adult Tooth',
    severity: 'critical',
    symptoms: [
      'Entire tooth came out of its socket',
      'Visible root structure is intact',
      'Bleeding from socket area',
      'Accidental impact or impact sports injury'
    ],
    doSteps: [
      'Locate the tooth immediately. Handle it ONLY by the crown (chewing top), NEVER touch the root lines.',
      'If dirty, rinse tooth gently under cool running clean water for 10 seconds. Do not scrub or use chemicals.',
      'Try to re-insert the tooth gently back into its socket and hold it there by chewing lightly on clean gauze.',
      'If unable to re-insert, submerge the tooth immediately in a glass of cold milk, saline solution, or saliva.',
      'Our surgeons must treat you within 60 minutes for the highest chance of tooth preservation.'
    ],
    dontSteps: [
      'DO NOT touch the sensitive tooth root.',
      'DO NOT scrub, rub, or scrape the tooth root surface.',
      'DO NOT allow the tooth to dry out (Never wrap it in dry tissue).',
      'DO NOT drink alcohol or use hot liquids on the area.'
    ]
  },
  {
    id: 'abscess-swelling',
    condition: 'Severe Abscess or Facial Swelling',
    severity: 'critical',
    symptoms: [
      'Visible swelling of the gums, cheek, or neck area',
      'Pus-filled pocket or bubble on the gum line',
      'Fever, feeling unwell, or difficulty swallowing',
      'Continuous, extreme throbbing pain'
    ],
    doSteps: [
      'Rinse with warm salt water repeatedly to draw out fluid components.',
      'Apply a cold ice pack wrapped in a clean towel to the outside of the cheek for 15 minutes to reduce active swelling.',
      'Take over-the-counter anti-inflamatory pain relievers (ibuprofen) to help contain severe pain gradients.',
      'Call our urgent care line immediately. Dental infections can migrate to the blood/throat quickly.'
    ],
    dontSteps: [
      'DO NOT pop, puncture, or lance the gum abscess yourself.',
      'DO NOT apply warm heat pads directly to the outside of your swollen cheek.',
      'DO NOT place aspirin directly against the gums or aching tooth (causes chemical gum burns).'
    ]
  },
  {
    id: 'severe-toothache',
    condition: 'Persistent Toothache',
    severity: 'urgent',
    symptoms: [
      'Extreme sensitivity when touching or biting down',
      'Inability to sleep or eat due to pain',
      'Sharp pain when drinking cold or hot fluids',
      'Radiating ear or jaw pain'
    ],
    doSteps: [
      'Floss gently around the aching tooth area to remove jammed hard food particles.',
      'Rinse with warm salt water or antiseptic mouthwash thoroughly.',
      'Apply an over-the-counter oral numbing gel (benzocaine) lightly to the immediate gum area.',
      'Schedule a priority priority walk-in appointment today with Dr. Park.'
    ],
    dontSteps: [
      'DO NOT bite down hard on key aching tooth sections.',
      'DO NOT ignore the pain and rely on temporary pain pills, as the decay is likely reaching the nerve.'
    ]
  },
  {
    id: 'broken-restoration',
    condition: 'Broken Tooth, Crown, or filling',
    severity: 'ambient',
    symptoms: [
      'Chipped or shattered tooth section with sharp edges',
      'Lost existing filling, crown, or temporary cover',
      'Mild sensitivity or occasional discomfort',
      'Laceration risk to tongue or inner cheek'
    ],
    doSteps: [
      'Save any broken tooth fragments or the detached crown structure.',
      'Cover sharp edges with sugarless chewing gum, orthodontic wax, or temporary pharmacy cement to protect your tongue.',
      'Rinse mouth clean to clear fine debris.',
      'Schedule an appointment to rebuild or bond the restoration back in place.'
    ],
    dontSteps: [
      'DO NOT try to superglue dental restorations yourself.',
      'DO NOT chew hard food directly on the fractured tooth side.'
    ]
  }
];

export const portfolioDemos: BeforeAfterDemo[] = [
  {
    id: 'case-1',
    title: 'Full Porcelain Smiles Makeover',
    description: 'Correction of multi-span uneven enamel, persistent deep tetracycline discoloration, and severe dental crowding.',
    doctor: 'Dr. Alexander Vance, DDS',
    beforeLabel: 'Before Makeover',
    afterLabel: 'After 8 Veneers',
    beforeImg: 'https://images.unsplash.com/photo-1516203173041-99713ddbf719?q=80&w=400&h=300&fit=crop&q=40&blur=10', // representative soft base placeholders
    afterImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'case-2',
    title: 'Precision Invisible Alignment',
    description: 'Resolution of severe anterior lower and upper crowding with deep overbite over 11 months.',
    doctor: 'Dr. Sarah Lin, MDS',
    beforeLabel: 'Severe Crowding',
    afterLabel: 'Aligned Physiologic Smile',
    beforeImg: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400&h=300&fit=crop&blur=5',
    afterImg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'case-3',
    title: 'Single Implants & Restorative Crowns',
    description: 'Lifetime restoration of fractured anterior incisor using custom titanium post and high-translucent crown.',
    doctor: 'Dr. Marcus Throne, DMD',
    beforeLabel: 'Missing Incisor Space',
    afterLabel: 'Lifelike Implant Crown',
    beforeImg: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=400&h=300&fit=crop&blur=10',
    afterImg: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?q=80&w=400&h=300&fit=crop'
  }
];

export const clinicLocations = [
  {
    id: 'loc-downtown',
    city: 'Downtown Core',
    name: 'Apex Dental Care - Downtown Central',
    address: '450 Healthcare Blvd, Suite 210, Metropolis, NY 10001',
    phone: '+1 (555) 720-3000',
    emergency: '+1 (555) 720-3099',
    hours: 'Mon-Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 2:00 PM',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12090.496582531653!2d-74.0059413!3d40.7127847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1654382510000!5m2!1sen!2sus&hl=en&style=element.geometry:fill:0xf5f5f5|element.label.text:fill:0x616161',
    parking: 'Free underground clinical parking (Validation provided at reception).'
  },
  {
    id: 'loc-metro',
    city: 'Metro Heights',
    name: 'Apex Dental Care - Suburban Plaza',
    address: '102 Meridian Pkwy, Medical Arts Wing, Heights, NY 10940',
    phone: '+1 (555) 480-1200',
    emergency: '+1 (555) 480-1299',
    hours: 'Tue-Sat: 9:00 AM - 5:30 PM | Sun-Mon: Closed',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96706.50013548316!2d-73.9851310!3d40.7588950!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzMyLjAiTiA3M8KwNTknMDYuNSJX!5e0!3m2!1sen!2sus!4v1654382520000!5m2!1sen!2sus',
    parking: 'Dedicated parking slots directly outside main lobby building.'
  }
];
