import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { MapPin, Phone, Mail, Clock, MessageSquare, Copy, Check, Send, Globe, Navigation } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-amber-700" />
            <span>Get In Touch</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Visit Our Office or Connect Online
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Located at Mahalaxmi Market in Durg (C.G.), serving clients across Chhattisgarh, Surat, Raipur, Indore, New Delhi, and pan-India.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-amber-200 shadow-lg space-y-6">
            <h3 className="font-serif-heading font-extrabold text-2xl text-slate-900 border-b border-amber-200/80 pb-3">
              Office Information
            </h3>

            {/* Address */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Office Address:</span>
              <div className="flex items-start justify-between gap-2 bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-800 font-semibold leading-relaxed">
                    {COMPANY_INFO.contact.address}
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(COMPANY_INFO.contact.address, 'address')}
                  className="p-1.5 rounded hover:bg-slate-100 text-slate-500 cursor-pointer"
                  title="Copy address"
                >
                  {copiedText === 'address' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Phone & WhatsApp:</span>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${COMPANY_INFO.contact.phone}`}
                  className="bg-white p-3 rounded-xl border border-slate-200 hover:border-amber-400 transition-colors flex items-center gap-2 text-xs font-bold text-slate-900"
                >
                  <Phone className="w-4 h-4 text-amber-700" />
                  <span>{COMPANY_INFO.contact.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-50 p-3 rounded-xl border border-emerald-300 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 text-xs font-bold text-emerald-800"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Email Address:</span>
              <div className="flex items-center justify-between gap-2 bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3 truncate">
                  <Mail className="w-4 h-4 text-amber-700 shrink-0" />
                  <a
                    href={`mailto:${COMPANY_INFO.contact.email}`}
                    className="text-xs text-slate-800 font-semibold truncate hover:text-amber-800"
                  >
                    {COMPANY_INFO.contact.email}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(COMPANY_INFO.contact.email, 'email')}
                  className="p-1.5 rounded hover:bg-slate-100 text-slate-500 cursor-pointer"
                >
                  {copiedText === 'email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Working Hours */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Working Hours:</span>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{COMPANY_INFO.contact.workingHoursWeekdays}</span>
                </div>
                <div className="text-slate-300 pl-6">
                  {COMPANY_INFO.contact.workingHoursSunday}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map & Direct Directions Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-heading font-bold text-xl text-amber-300">
                    Location Map — Durg, Chhattisgarh
                  </h3>
                  <p className="text-xs text-slate-300">
                    A14, Mahalaxmi Market, Durg (C.G.) 491001
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    'MAHALAXMI MARKET DURG 491001 CHHATTISGARH INDIA'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Maps</span>
                </a>
              </div>

              {/* Map Placeholder Card */}
              <div className="h-64 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-6 text-center space-y-3 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <MapPin className="w-10 h-10 text-amber-400 animate-bounce" />
                <div className="relative z-10">
                  <h4 className="font-serif-heading font-bold text-slate-100 text-base">
                    UJJWAL JAIN Vastu & Civil Office
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mt-1">
                    A14, Mahalaxmi Market, Durg (C.G.) 491001
                  </p>
                  <p className="text-[10px] text-amber-400 mt-2 font-mono">
                    GPS Coordinates: Durg Municipal Region
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-xs pt-2">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>On-Site Visits:</strong> Serving Durg, Bhilai, Raipur, Surat, Indore & Pan-India</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center gap-2">
                  <Send className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Online Consultations:</strong> CAD blueprint analysis via WhatsApp / Video Call</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
