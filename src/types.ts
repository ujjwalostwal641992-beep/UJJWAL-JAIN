export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: 'Residential' | 'Commercial' | 'Specialized' | 'Architecture';
  iconName: string;
  features: string[];
  idealFor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  role?: string;
  rating: number;
  text: string;
  date?: string;
}

export interface VastuDirectionZone {
  direction: string;
  code: string;
  element: string;
  rulingPlanet: string;
  deity: string;
  favorableRooms: string[];
  unfavorableRooms: string[];
  remedies: string;
  colorTheme: string;
  bgColor: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface ConsultationBooking {
  name: string;
  phone: string;
  email: string;
  city: string;
  propertyType: string;
  consultationType: 'Online' | 'On-site';
  notes: string;
  preferredDate?: string;
}
