import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, Mail, MapPin, Menu, X, Compass, Calendar, MessageSquare, Clock } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceTitle?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Pad Vinyas Grid', href: '#pad-vinyas' },
    { name: 'Vastu Compass Tool', href: '#vastu-compass' },
    { name: 'Non-Demolition', href: '#remedies' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-amber-100 text-xs py-2 px-4 border-b border-amber-900/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Durg, Chhattisgarh (Pan-India & Global Online)</span>
            </span>
            <span className="hidden sm:inline-block text-slate-600">•</span>
            <span className="hidden sm:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Mon - Sat: 9 AM - 7 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.contact.phone}`}
              className="flex items-center gap-1 text-slate-200 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">{COMPANY_INFO.contact.phone}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(
                'Hello Er. Ujjwal Jain, I would like to inquire about Vastu Consultation.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-md py-3 border-b border-amber-200/60'
            : 'bg-[#FAF8F5] py-4 border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-700 via-amber-600 to-amber-900 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[7px] flex items-center justify-center">
                <Compass className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="font-serif-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-wider leading-tight group-hover:text-amber-700 transition-colors">
                {COMPANY_INFO.name}
              </div>
              <div className="text-[10px] sm:text-xs font-semibold tracking-widest text-amber-800 uppercase">
                {COMPANY_INFO.subtitle}
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-slate-700 hover:text-amber-700 uppercase tracking-wider transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-600 hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Consultation CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenBooking()}
              className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-amber-50 text-xs font-bold px-4 py-2.5 rounded-md shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-amber-100/60 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-amber-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-slate-800 hover:text-amber-700 py-2 border-b border-slate-100 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-gradient-to-r from-amber-700 to-amber-800 text-white text-sm font-bold py-3 rounded-md shadow flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
