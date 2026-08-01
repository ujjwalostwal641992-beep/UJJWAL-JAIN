import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Compass, Sliders, ShieldCheck, FileText, Globe, Lock, Award, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-amber-700" />;
      case 'Sliders':
        return <Sliders className="w-6 h-6 text-amber-700" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-amber-700" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-amber-700" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-amber-700" />;
      case 'Lock':
        return <Lock className="w-6 h-6 text-amber-700" />;
      default:
        return <Award className="w-6 h-6 text-amber-700" />;
    }
  };

  return (
    <section id="why-us" className="py-20 bg-[#FAF8F5] border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-700" />
            <span>Why Choose Us?</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            6 Pillars of Excellence & Trust
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Why thousands of homeowners, business leaders, and industrial clients across India trust Ujjwal Jain for Vedic Vastu & Civil Architecture guidance.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANY_INFO.whyChooseUs.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-amber-200 hover:border-amber-400 shadow-sm hover:shadow-lg transition-all space-y-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                {getPillarIcon(pillar.icon)}
              </div>

              <h3 className="font-serif-heading font-extrabold text-xl text-slate-900 group-hover:text-amber-800 transition-colors">
                {pillar.title}
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {pillar.desc}
              </p>

              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Verified Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
