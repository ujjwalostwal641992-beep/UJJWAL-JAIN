import React from 'react';
import { NON_DEMOLITION_REMEDIES } from '../data/companyData';
import { ShieldAlert, Layers, Triangle, Maximize, Sparkles, Sun, Compass, CheckCircle2, Calendar } from 'lucide-react';

interface RemediesSectionProps {
  onOpenBooking: () => void;
}

export const RemediesSection: React.FC<RemediesSectionProps> = ({ onOpenBooking }) => {
  const getRemedyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-6 h-6 text-amber-700" />;
      case 'Triangle':
        return <Triangle className="w-6 h-6 text-amber-700" />;
      case 'Maximize':
        return <Maximize className="w-6 h-6 text-amber-700" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-700" />;
      case 'Sun':
        return <Sun className="w-6 h-6 text-amber-700" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-amber-700" />;
      default:
        return <ShieldAlert className="w-6 h-6 text-amber-700" />;
    }
  };

  return (
    <section id="remedies" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <span>Zero Demolition • 100% Peace of Mind</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Vastu Corrections Without Demolition
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            No need to break walls, destroy toilets, or dismantle existing architecture! Er. Ujjwal Jain applies scientific Panchtattva elemental remedies to balance energy flows quietly and effectively.
          </p>
        </div>

        {/* Remedies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NON_DEMOLITION_REMEDIES.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FAF8F5] p-6 rounded-2xl border border-amber-200/80 hover:border-amber-400 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                {getRemedyIcon(item.icon)}
              </div>

              <h3 className="font-serif-heading font-bold text-lg text-slate-900">
                {item.title}
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {item.desc}
              </p>

              <div className="pt-2 flex items-center gap-1 text-xs text-amber-800 font-bold">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Zero Structural Damage</span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Banner */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 rounded-2xl p-8 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-amber-500/30">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="font-serif-heading font-extrabold text-xl sm:text-2xl text-amber-300">
              Is Your Built Property Facing Vastu Imbalance?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
              Get an expert layout evaluation from Senior Vastu Consultant & Civil Engineer Ujjwal Jain. Identify simple non-demolition remedies for your existing home or office.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-lg shadow-lg hover:shadow-amber-500/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Calendar className="w-4 h-4 text-slate-950" />
            <span>Request Non-Demolition Report</span>
          </button>
        </div>
      </div>
    </section>
  );
};
