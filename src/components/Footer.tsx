import React from 'react';
import { COMPANY_INFO, SERVICES_LIST } from '../data/companyData';
import { Compass, Phone, Mail, MapPin, MessageSquare, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-amber-900/40 relative">
      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(
          'Hello Er. Ujjwal Jain, I would like to inquire about Vastu Consultation.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center border-2 border-white"
        aria-label="Contact on WhatsApp"
        title="Chat on WhatsApp (+91 7000593516)"
      >
        <MessageSquare className="w-6 h-6 fill-white" />
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-700 flex items-center justify-center text-slate-950 font-bold shadow">
                <Compass className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="font-serif-heading font-extrabold text-lg text-slate-100">
                  {COMPANY_INFO.name}
                </h3>
                <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                  {COMPANY_INFO.subtitle}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {COMPANY_INFO.tagline}. Guided by Er. Ujjwal Jain (Senior Vastu Consultant & Civil Engineer), combining ancient Vedic wisdom with modern architectural precision.
            </p>

            <div className="pt-2 text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{COMPANY_INFO.contact.address}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.contact.phone}`} className="hover:text-amber-300 font-semibold">
                  {COMPANY_INFO.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.contact.email}`} className="hover:text-amber-300">
                  {COMPANY_INFO.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif-heading font-bold text-slate-100 text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Vastu Services</a></li>
              <li><a href="#pad-vinyas" className="hover:text-amber-400 transition-colors">Pad Vinyas Grid</a></li>
              <li><a href="#vastu-compass" className="hover:text-amber-400 transition-colors">Vastu Compass Tool</a></li>
              <li><a href="#panchbhootas" className="hover:text-amber-400 transition-colors">Panchbhootas & Energies</a></li>
              <li><a href="#why-us" className="hover:text-amber-400 transition-colors">Why Choose Us</a></li>
              <li><a href="#testimonials" className="hover:text-amber-400 transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact Office</a></li>
            </ul>
          </div>

          {/* Our Services List */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif-heading font-bold text-slate-100 text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              Our Vastu Services
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {SERVICES_LIST.map((srv) => (
                <li key={srv.id} className="truncate">
                  <a href="#services" className="hover:text-amber-400 transition-colors">
                    • {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SEO Tags Cloud */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif-heading font-bold text-slate-100 text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              Top Vastu Specializations
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {COMPANY_INFO.seoKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-slate-900 text-slate-400 px-2 py-1 rounded border border-slate-800"
                >
                  {kw}
                </span>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                className="block text-center bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white text-xs font-bold py-2.5 rounded-lg shadow transition-all cursor-pointer"
              >
                Contact Office For Inquiries
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} {COMPANY_INFO.fullBrandName}. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Durg, Chhattisgarh 491001</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 transition-colors cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

