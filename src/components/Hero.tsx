import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Compass, Calendar, ShieldCheck, ArrowRight, Building2, Layers, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreCompass: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreCompass }) => {
  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden py-16 lg:py-24 border-b border-amber-900/30">
      {/* Background Sacred Geometry Accent */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] border border-amber-400/40 rounded-full flex items-center justify-center animate-[spin_120s_linear_infinite]">
          <div className="w-[480px] h-[480px] border border-amber-400/30 rotate-45 flex items-center justify-center">
            <div className="w-[360px] h-[360px] border border-amber-400/20 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Founder Credentials Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-inner">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>{COMPANY_INFO.founder.name} • Senior Vastu Consultant & Civil Engineer</span>
            </div>

            {/* Main Brand Title & Tagline */}
            <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
              Transforming Spaces, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                Enhancing Lives
              </span>{' '}
              Through Vastu Shastra
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Combining traditional Vedic Vastu principles with civil engineering practices to create balanced and harmonious living and working environments for homes, offices, factories, and new construction.
            </p>

            {/* Feature Highlights */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-start gap-2.5 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-200 block">Scientific & Practical Approach</span>
                  <span className="text-slate-400">Civil CAD grid alignment with magnetism</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-200 block">Non-Demolition Remedies</span>
                  <span className="text-slate-400">98% doshas resolved without breaking walls</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-slate-950 text-sm font-extrabold px-6 py-3.5 rounded-md shadow-lg shadow-amber-900/40 hover:shadow-amber-800/60 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Book Free Consultation Call</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCompass}
                className="w-full sm:w-auto bg-slate-800/90 hover:bg-slate-800 text-amber-200 border border-amber-500/30 text-sm font-semibold px-6 py-3.5 rounded-md hover:border-amber-400/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Check Vastu Compass</span>
              </button>
            </div>
          </div>

          {/* Graphic & Stats Card Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950/40 p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-6">
              {/* Badge Overlay */}
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-serif-heading font-bold text-slate-100 text-base">
                      Civil & Vastu Fusion
                    </h3>
                    <p className="text-xs text-amber-300">100% Engineering Accuracy</p>
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase bg-amber-900/60 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30">
                  Durg • India
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {COMPANY_INFO.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-colors"
                  >
                    <div className="font-serif-heading font-extrabold text-2xl sm:text-3xl text-amber-400">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-300 font-medium mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Info Box */}
              <div className="bg-amber-950/40 border border-amber-500/30 p-4 rounded-xl flex items-center gap-3">
                <Layers className="w-8 h-8 text-amber-400 shrink-0" />
                <div className="text-xs text-amber-100">
                  <span className="font-bold text-amber-300 block">Pad Vinyas & 16-Zone Grid Reports</span>
                  <span>CAD floor plans mapped with 16 Vastu Zones & 45 Vedic Deities.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
