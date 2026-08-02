import { ServiceItem, Testimonial, VastuDirectionZone, FAQItem } from '../types';

export const COMPANY_INFO = {
  name: 'UJJWAL JAIN',
  subtitle: 'VEDIC VASTU & ARCHITECTURAL CONSULTANCY',
  fullBrandName: 'UJJWAL JAIN (VEDIC VASTU & ARCHITECTURAL)',
  tagline: 'Transforming Spaces, Enhancing Lives Through Vastu Shastra',
  founder: {
    name: 'Ujjwal Jain',
    title: 'Senior Vastu Consultant & Civil Engineer',
    bio: 'Ujjwal Jain combines deep Vedic Vastu Shastra wisdom with modern Civil Engineering structural practices. With over a decade of hands-on experience, he delivers practical, scientific, and non-destructive Vastu solutions for residential, commercial, and industrial projects.',
  },
  aboutText: 'Ujjwal Jain is a leading Vastu consultant and his firm is based in India, offering professional Vedic Vastu guidance for homes, offices, commercial establishments, factories, and new construction projects. With over 10 years of experience, we combine traditional Vastu principles with modern architectural practices to create balanced and harmonious living and working environments.',
  stats: [
    { value: '10+', label: 'Years Experience' },
    { value: '1500+', label: 'Consultations Completed' },
    { value: '50+', label: 'Cities Served in India' },
    { value: '100%', label: 'Confidential & Non-Demolition' },
  ],
  contact: {
    address: 'A14, MAHALAXMI MARKET, DURG 491001 (C.G.)',
    phone: '+91 7000593516',
    whatsapp: '+917000593516',
    rawPhone: '7000593516',
    email: 'ujjwalostwal641992@gmail.com',
    workingHoursWeekdays: 'Monday – Saturday: 9:00 AM – 7:00 PM',
    workingHoursSunday: 'Sunday: By Appointment Only',
    city: 'Durg',
    state: 'Chhattisgarh',
    pincode: '491001',
    country: 'India',
  },
  whyChooseUs: [
    {
      title: 'Scientific and Practical Approach',
      desc: 'Combining civil engineering precision, directional magnetism, and sunlight geometry with ancient Vedic Vastu Shastra rules.',
      icon: 'Compass',
    },
    {
      title: 'Customized Solutions',
      desc: 'Every plot, home, office, and factory receives tailored grid analysis and personalized energy alignment.',
      icon: 'Sliders',
    },
    {
      title: 'Non-Demolition Remedies',
      desc: '98% of Vastu imbalances are corrected using elemental strips, pyramids, colors, and direction crystals without breaking walls.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Detailed Vastu Reports',
      desc: 'Comprehensive 16-zone CAD grid reports with zone-by-zone energy mapping, room recommendations, and remedial steps.',
      icon: 'FileText',
    },
    {
      title: 'Pan-India & Global Services',
      desc: 'Available for both on-site physical visits across 20+ Indian cities and remote CAD layout consultations globally.',
      icon: 'Globe',
    },
    {
      title: '100% Confidential Consultations',
      desc: 'Your property layouts, financial goals, and personal details remain strictly private and protected.',
      icon: 'Lock',
    },
  ],
  seoKeywords: [
    'Best Vastu Consultant in India',
    'Online Vastu Consultation',
    'Home Vastu Expert',
    'Office Vastu Consultant',
    'Vastu Shastra Services',
    'Industrial Vastu Expert',
    'Vastu for New Home',
    'Pad Vinyas Consultant',
    'Vastu Corrections Without Demolition',
    'Civil Engineer Vastu Expert Durg'
  ]
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'pad-vinyas',
    title: 'Pad Vinyas',
    shortDesc: 'Mathematical 81/64 Grid energy mapping to calculate exact devta & asura positions on your CAD blueprint.',
    fullDesc: 'Pad Vinyas is the foundational Vedic grid system (81 Pada or 64 Pada Vastu Purusha Mandala). Er. Ujjwal Jain calculates exact elemental zones, identifying Brahma Sthan (center), Deva zones, and energy lines to optimize floor plans before construction or interior planning.',
    category: 'Specialized',
    iconName: 'Grid',
    features: [
      '81-Pad / 64-Pad Energy Grid Mapping on CAD',
      'Identification of 45 Vastu Purusha Deities',
      'Brahma Sthan (Zero-Weight Core) Calculation',
      'Mahavastu 16 Zone Sub-Direction Analysis'
    ],
    idealFor: 'Architects, Developers, New Home Builders & Complex Renovations'
  },
  {
    id: 'residential-vastu',
    title: 'Residential Vastu Consultation',
    shortDesc: 'Harmonizing homes for peace, health, prosperity, and family well-being through proven Vedic principles.',
    fullDesc: 'Complete residential evaluation covering main entrance orientation, master bedroom position, kitchen fire element balance, toilet placements, staircase flow, and water tank locations for independent houses and bungalows.',
    category: 'Residential',
    iconName: 'Home',
    features: [
      'Main Door & Entrance Analysis',
      'Kitchen (Agni Cone) & Water System Balance',
      'Master Bedroom & Children Study Zone Alignment',
      'Peace & Health Energy Flow Enhancement'
    ],
    idealFor: 'Homeowners, Bungalows, Villas & Independent Houses'
  },
  {
    id: 'commercial-office-vastu',
    title: 'Commercial & Office Vastu',
    shortDesc: 'Optimizing corporate offices, retail stores, and showrooms for sales growth, cash flow, and team synergy.',
    fullDesc: 'Strategic layout planning for managing directors, finance/accounts desks, sales teams, reception counters, and inventory storage to maximize business profits, customer attraction, and financial stability.',
    category: 'Commercial',
    iconName: 'Briefcase',
    features: [
      'MD / Owner Cabin Positioning (Nairitya/South-West)',
      'Finance & Cash Box Placement (Kuber Zone)',
      'Sales & Marketing Energy Zone Activation',
      'Reception & Entrance Energy Flow Optimization'
    ],
    idealFor: 'Corporate Offices, Retail Stores, Showrooms & Startups'
  },
  {
    id: 'industrial-vastu',
    title: 'Industrial Vastu',
    shortDesc: 'Heavy machinery alignment, raw material flow, transformer placement, and production efficiency for factories.',
    fullDesc: 'Industrial units require specialized Vastu logic to prevent machinery breakdowns, worker disputes, and production bottlenecks. Er. Ujjwal Jain aligns furnace/boilers in Agni, heavy plant in Nairitya, and finished goods in Vayu zone.',
    category: 'Commercial',
    iconName: 'Factory',
    features: [
      'Heavy Plant & Machinery Orientation',
      'Boiler, Transformer & Electric Panel Placement',
      'Raw Material vs Finished Goods Movement Cycle',
      'Effluent Treatment Plant (ETP) & Borewell Positioning'
    ],
    idealFor: 'Factories, Manufacturing Plants, Warehouses & Processing Units'
  },
  {
    id: 'plot-selection',
    title: 'Plot Selection & Analysis',
    shortDesc: 'Soil testing guidance, plot slope, road-facing directions (Vidisha), and surrounding energy assessment.',
    fullDesc: 'Choosing the right plot is 50% of Vastu success. We evaluate plot shapes (Gaumukhi, Shermukhi), road hits (Vithi Shoola), cardinal orientation, magnetic north declination, and surrounding soil energy prior to purchase.',
    category: 'Architecture',
    iconName: 'Compass',
    features: [
      'Gaumukhi vs Shermukhi Shape Analysis',
      'Road Thrusts (Vithi Shoola) Risk Assessment',
      'Soil Quality & Magnetic North Angle Checking',
      'Slope & Drainage Flow Planning'
    ],
    idealFor: 'Plot Buyers, Land Investors & Real Estate Developers'
  },
  {
    id: 'new-construction',
    title: 'Vastu for New Construction',
    shortDesc: 'End-to-end integration of structural civil engineering blueprints with 100% Vastu-compliant layout plans.',
    fullDesc: 'As a Senior Vastu Consultant and Civil Engineer, Er. Ujjwal Jain collaborates directly with your architect or civil draftsperson to create floor plans, beam layouts, column positions, and elevation drawings that are structural and Vastu perfect from day one.',
    category: 'Architecture',
    iconName: 'Layers',
    features: [
      'Civil CAD Drawing & Vastu Layering Integration',
      'Column & Structural Load Distribution Alignment',
      'Bhumipujan & Foundation Layout Guidance',
      'Window, Ventilation & Lighting Optimization'
    ],
    idealFor: 'Plot Owners Constructing New Homes, Villas, Commercial Buildings'
  },
  {
    id: 'apartment-flat-vastu',
    title: 'Apartment & Flat Vastu',
    shortDesc: 'Practical Vastu evaluation and remedies tailored for high-rise flats and leased apartments.',
    fullDesc: 'High-rise living presents unique challenges like fixed structural walls, shared staircases, and cut corners. We analyze tower orientation, balcony view directions, flat entry points, and apply zero-demolition remedies.',
    category: 'Residential',
    iconName: 'Building2',
    features: [
      'Tower Entrance & Flat Main Door Assessment',
      'Balcony & Open Sky Light Direction Check',
      'Cut Corner & Extended Zone Neutralization',
      'Non-Structural Removable Remedies'
    ],
    idealFor: 'Flat Buyers, High-rise Apartment Owners & Tenants'
  },
  {
    id: 'interior-vastu-planning',
    title: 'Interior Vastu Planning',
    shortDesc: 'Aligning furniture, mirror placement, bed orientation, lighting, and color schemes with 5 elements (Panchtattva).',
    fullDesc: 'Combine interior aesthetics with Panchtattva balance. Learn ideal bed headboard directions (South/East), mirror wall positions, indoor plant locations, painting themes, and room color palettes to enhance daily mood and vitality.',
    category: 'Specialized',
    iconName: 'Palette',
    features: [
      'Panchtattva (5 Elements) Color Selection',
      'Bed, Sofa & Working Desk Orientation',
      'Mirror & Water Fountain Placement Rules',
      'Clutter Removal & Energy Channelling'
    ],
    idealFor: 'Interior Designers, Homeowners Renovating Interiors'
  },
  {
    id: 'non-demolition-remedies',
    title: 'Vastu Corrections Without Demolition',
    shortDesc: 'Scientific remedies using element strips, pyramids, copper helixes, direction metals, and color tapes.',
    fullDesc: 'No need to dismantle walls, break toilets, or shift kitchens! Using modern geo-energetic instruments and elemental balancing techniques, Er. Ujjwal Jain neutralizes Vastu doshas through copper/brass/steel strips, pyramids, and color therapy.',
    category: 'Specialized',
    iconName: 'ShieldAlert',
    features: [
      'Elemental Strip & Metal Wire Installation in Flooring',
      'Vastu Pyramids & Helix Placement for Cut Zones',
      'Color Tapes & Light Frequency Corrections',
      'Directional Crystals & Yantras'
    ],
    idealFor: 'Existing Homes, Rented Properties, Built-up Commercial Spaces'
  }
];

export const TESTIMONIALS_LIST: Testimonial[] = [
  {
    id: '1',
    name: 'Neha Patel',
    location: 'Surat, Gujarat',
    role: 'Homeowner',
    rating: 5,
    text: 'The Vastu recommendations helped improve positivity in our home. Highly professional service.',
    date: 'Recent Client'
  },
  {
    id: '2',
    name: 'Rajesh Mehta',
    location: 'Raipur, Chhattisgarh',
    role: 'Business Owner',
    rating: 5,
    text: 'Excellent guidance for our office setup. Very detailed and practical suggestions.',
    date: 'Recent Client'
  },
  {
    id: '3',
    name: 'Anand Sharma',
    location: 'Indore, Madhya Pradesh',
    role: 'Factory Owner',
    rating: 5,
    text: 'Er. Ujjwal Jain analyzed our factory CAD blueprint and corrected machinery placements without breaking any structure. Production efficiency has noticeably improved.',
    date: 'Industrial Client'
  },
  {
    id: '4',
    name: 'Pooja Verma',
    location: 'New Delhi',
    role: 'Apartment Owner',
    rating: 5,
    text: 'The online Pad Vinyas report was extremely clear and easy to follow. Non-demolition remedies worked wonders for our flat.',
    date: 'Online Consultation'
  }
];

export const VASTU_DIRECTIONS: VastuDirectionZone[] = [
  {
    direction: 'North (Uttar)',
    code: 'N',
    element: 'Water (Jal)',
    rulingPlanet: 'Mercury (Budh)',
    deity: 'Kuber / Kuberan',
    favorableRooms: ['Main Cash Counter', 'Living Room', 'Open Lawn / Water Feature', 'Borewell'],
    unfavorableRooms: ['Kitchen (Fire)', 'Toilet', 'Heavy Overhead Water Tank', 'Staircase'],
    remedies: 'Use Blue/Off-White colors. Place brass/copper items or lush money plants. Avoid clutter in North.',
    colorTheme: 'Sky Blue / White',
    bgColor: 'from-blue-500/10 to-cyan-500/10'
  },
  {
    direction: 'North-East (Ishan)',
    code: 'NE',
    element: 'Water / Ether',
    rulingPlanet: 'Jupiter (Guru)',
    deity: 'Lord Shiva / Ishan',
    favorableRooms: ['Puja Room / Meditation', 'Study Room', 'Main Entrance', 'Clean Open Area'],
    unfavorableRooms: ['Toilet', 'Kitchen', 'Master Bedroom', 'Heavy Storage / Overhead Tank'],
    remedies: 'Keep NE light, clean, and well-lit. Use crystal pyramids or brass bowl with clean water if blocked.',
    colorTheme: 'Light Yellow / White / Light Blue',
    bgColor: 'from-sky-500/10 to-amber-500/10'
  },
  {
    direction: 'East (Purva)',
    code: 'E',
    element: 'Air / Wood',
    rulingPlanet: 'Sun (Surya)',
    deity: 'Indra',
    favorableRooms: ['Main Entrance', 'Living Room', 'Verandah', 'Study Room', 'Guest Room'],
    unfavorableRooms: ['Toilet', 'Kitchen Heavy Equipment', 'Master Bedroom'],
    remedies: 'Allow morning sunlight. Green plants, wooden decor, or Surya brass Yantra help balance energy.',
    colorTheme: 'Emerald Green / Light Brown',
    bgColor: 'from-emerald-500/10 to-teal-500/10'
  },
  {
    direction: 'South-East (Agni)',
    code: 'SE',
    element: 'Fire (Agni)',
    rulingPlanet: 'Venus (Shukra)',
    deity: 'Agni Dev',
    favorableRooms: ['Kitchen (Cooktop facing East)', 'Electrical Meter / Panel', 'Inverter', 'Boiler / Transformer'],
    unfavorableRooms: ['Water Storage Tank', 'Bedrooms', 'Main Entrance', 'Pond / Fountain'],
    remedies: 'If toilet or water is present here, install red color tape or copper strip around the fixture.',
    colorTheme: 'Red / Pink / Orange / Coral',
    bgColor: 'from-red-500/10 to-orange-500/10'
  },
  {
    direction: 'South (Dakshin)',
    code: 'S',
    element: 'Earth / Fire',
    rulingPlanet: 'Mars (Mangal)',
    deity: 'Yama',
    favorableRooms: ['Bedroom', 'Office Manager Cabin', 'Store Room', 'Staircase'],
    unfavorableRooms: ['Main Entrance (if defective)', 'Puja Room', 'Underground Water Tank'],
    remedies: 'Use red/brown earthy tones. Coral/red copper helix helps neutralize negative South entrances.',
    colorTheme: 'Terracotta / Dark Red / Tan',
    bgColor: 'from-amber-600/10 to-red-600/10'
  },
  {
    direction: 'South-West (Nairitya)',
    code: 'SW',
    element: 'Earth (Prithvi)',
    rulingPlanet: 'Rahu',
    deity: 'Nairiti',
    favorableRooms: ['Master Bedroom (Head of House)', 'MD / Director Desk', 'Heavy Storage', 'Overhead Water Tank'],
    unfavorableRooms: ['Puja Room', 'Main Entrance', 'Borewell / Underground Tank', 'Toilet'],
    remedies: 'Keep SW heavy and tall. Yellow brass helix, yellow lead strips, or rock salt neutralizes cuts.',
    colorTheme: 'Golden Yellow / Beige / Earthy Brown',
    bgColor: 'from-amber-500/10 to-yellow-600/10'
  },
  {
    direction: 'West (Paschim)',
    code: 'W',
    element: 'Space / Metal',
    rulingPlanet: 'Saturn (Shani)',
    deity: 'Varuna',
    favorableRooms: ['Dining Hall', 'Children Study Room', 'Overhead Water Tank', 'Toilet / Washroom'],
    unfavorableRooms: ['Main Cooking Range', 'Puja Room', 'Underground Tank'],
    remedies: 'Place white/grey or metallic accents. Brass Varuna yantra or metal helix balances financial flow.',
    colorTheme: 'White / Metallic Silver / Slate Grey',
    bgColor: 'from-slate-500/10 to-zinc-500/10'
  },
  {
    direction: 'North-West (Vayu)',
    code: 'NW',
    element: 'Air (Vayu)',
    rulingPlanet: 'Moon (Chandra)',
    deity: 'Vayu Dev',
    favorableRooms: ['Guest Bedroom', 'Finished Goods Warehouse', 'Garage / Vehicles', 'Unmarried Daughter Bedroom'],
    unfavorableRooms: ['Master Bedroom (causes restlessness)', 'Heavy Fixed Storage'],
    remedies: 'Use light cream/grey shades. Windchimes, white marble, or brass Vayu helix enhances movement.',
    colorTheme: 'Cream / Off-White / Light Grey',
    bgColor: 'from-zinc-400/10 to-sky-300/10'
  }
];

export const NON_DEMOLITION_REMEDIES = [
  {
    title: 'Elemental Strips (Copper/Brass/Steel/Lead)',
    desc: 'Engraved metal wires or strips inserted flush into tile/flooring joints to seal energy leaks around toilets or entrances without breaking slabs.',
    icon: 'Layers'
  },
  {
    title: 'Vastu Pyramids & Helix Energy Boosters',
    desc: 'Geometrically tuned pyramids and brass/copper helices installed in missing corners (cut zones) to restore 100% virtual symmetry.',
    icon: 'Triangle'
  },
  {
    title: 'Panchtattva Color & Frequency Tapes',
    desc: 'Scientifically matched color bands applied to specific zone thresholds to balance Fire, Water, Air, Earth, and Space elements.',
    icon: 'Maximize'
  },
  {
    title: 'Directional Yantras & Crystals',
    desc: 'Purified brass energy Yantras and natural quartz crystals positioned in key directional grid coordinates to boost positive vibration.',
    icon: 'Sparkles'
  },
  {
    title: 'Mirror & Lighting Deflectors',
    desc: 'Strategic convex/flat mirrors and warm full-spectrum LED lighting to expand compressed spaces and illuminate dark energy pockets.',
    icon: 'Sun'
  },
  {
    title: 'Directional Metal & Energy Placement',
    desc: 'Specific elemental metal objects placed in designated directional zones for immediate financial and health relief.',
    icon: 'Compass'
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    category: 'General Vastu',
    question: 'Can Vastu defects really be corrected without demolition?',
    answer: 'Yes! Over 98% of Vastu imbalances in existing homes, apartments, and offices can be corrected using non-destructive remedies such as elemental metal strips (copper, brass, lead, steel), Vastu pyramids, color balancing, and directional helices without breaking walls or tiles.'
  },
  {
    category: 'Process & Services',
    question: 'How does Online Vastu Consultation work?',
    answer: 'You share your property blueprint/CAD drawing, floor plan photos/videos, and Google Maps location with Er. Ujjwal Jain via WhatsApp or email. He superimposes the 16-zone Vastu grid (Pad Vinyas) and conducts a detailed video call walkthrough followed by a PDF Vastu report.'
  },
  {
    category: 'Pad Vinyas',
    question: 'What is Pad Vinyas and why is it essential?',
    answer: 'Pad Vinyas is the ancient Vedic 81-grid or 64-grid mapping of the Vastu Purusha Mandala. It divides a property into 45 micro-deity energy fields. Er. Ujjwal Jain uses mathematical calculations to pinpoint exact energy balances before placing key rooms or remedies.'
  },
  {
    category: 'Civil Engineering Fusion',
    question: 'Why choose a Vastu Consultant who is also a Civil Engineer?',
    answer: 'A Civil Engineer understands structural load distribution, column-beam placements, plumbing layouts, CAD drawings, local municipal building codes, and material science. Er. Ujjwal Jain ensures that Vastu remedies are 100% structurally safe, practical, and feasible for construction.'
  },
  {
    category: 'Consultation',
    question: 'Are consultation details kept confidential?',
    answer: 'Absolutely. We maintain 100% client privacy. Your floor plans, personal information, financial discussions, and business reports are strictly confidential.'
  }
];
