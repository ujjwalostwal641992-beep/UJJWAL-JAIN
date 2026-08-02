import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Award, Compass, Building, Check, Globe, MapPin, Phone, Mail, FileText } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#FAF8F5] relative border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-700" />
            <span>About The Founder & Firm</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            UJJWAL JAIN <span className="text-amber-800">(Vedic Vastu & Architectural)</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Bridging 5,000-year-old Vedic spatial wisdom with modern civil structural engineering to create thriving, high-vibration properties.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Profile & Credentials Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white p-8 border border-amber-200 shadow-xl space-y-6">
              {/* Decorative Corner Motif */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full pointer-events-none"></div>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-700 text-amber-100 flex items-center justify-center font-serif-heading text-2xl font-black shadow-lg">
                  UJ
                </div>
                <div>
                  <h3 className="font-serif-heading font-extrabold text-2xl text-slate-900">
                    {COMPANY_INFO.founder.name}
                  </h3>
                  <p className="text-amber-800 font-bold text-sm">
                    {COMPANY_INFO.founder.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Durg, Chhattisgarh • Pan-India Services
                  </p>
                </div>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed border-t border-slate-100 pt-4">
                {COMPANY_INFO.aboutText}
              </p>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-200">
                  <span className="font-serif-heading font-extrabold text-xl text-amber-900 block">10+ Years</span>
                  <span className="text-xs text-amber-800 font-medium">Industry Experience</span>
                </div>
                <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-200">
                  <span className="font-serif-heading font-extrabold text-xl text-amber-900 block">1500+</span>
                  <span className="text-xs text-amber-800 font-medium">Consultations Completed</span>
                </div>
              </div>

              {/* Contact Snapshot */}
              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{COMPANY_INFO.contact.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{COMPANY_INFO.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{COMPANY_INFO.contact.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Narrative & Core Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif-heading text-2xl font-bold text-slate-900">
                Why Civil Engineering Precision Makes The Real Difference
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Traditional Vastu consultants often recommend breaking walls, altering beam supports, or shifting structural columns without considering building stability or municipal bylaws.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                As a qualified Civil Engineer, <strong className="text-slate-900">Er. Ujjwal Jain</strong> evaluates column loads, plumbing runs, beam stress, CAD layouts, and structural blueprints. He provides practical, non-destructive Vastu solutions that respect your budget and existing architecture.
              </p>
            </div>

            {/* Key Advantages Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-amber-200/80 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">New Construction CAD Integration</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Align floor plans with structural stability and 16 Vastu zones right from excavation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-amber-200/80 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Pad Vinyas Energy Mapping</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Mathematical 81/64 grid overlay to activate favorable deity fields.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-amber-200/80 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Online & On-Site Mode</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Physical site visits across 20+ cities or remote CAD blueprint video analysis.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-amber-200/80 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Detailed Actionable PDF Reports</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Clear room-by-room guidance, elemental color schemes, and non-demolition remedies.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Banner */}
            <div className="pt-2">
              <a
                href="#contact"
                className="bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-sm px-6 py-3 rounded-lg shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Consult Er. Ujjwal Jain Directly</span>
                <Check className="w-4 h-4 text-amber-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

