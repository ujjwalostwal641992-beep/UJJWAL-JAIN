import React from 'react';
import { Flame, Droplets, Wind, Mountain, Maximize2, Sparkles } from 'lucide-react';

export const PanchbhootasSection: React.FC = () => {
  const elements = [
    {
      title: 'Earth (Prithvi)',
      icon: Mountain,
      theme: 'Stability & Structure',
      desc: 'Materials, massing, structure, and connection to ground for thermal stability and calm.',
      color: 'bg-amber-100 text-amber-900 border-amber-300',
      iconBg: 'bg-amber-200 text-amber-900',
    },
    {
      title: 'Water (Jal)',
      icon: Droplets,
      theme: 'Flow & Clarity',
      desc: 'Placement of wet areas, humidity control, and views to water features that can influence mood.',
      color: 'bg-sky-50 text-sky-900 border-sky-200',
      iconBg: 'bg-sky-100 text-sky-800',
    },
    {
      title: 'Fire (Agni)',
      icon: Flame,
      theme: 'Metabolism & Energy',
      desc: 'Sunlight access, kitchen location, lighting spectra, and heat sources managed for safety and vitality.',
      color: 'bg-orange-50 text-orange-900 border-orange-200',
      iconBg: 'bg-orange-100 text-orange-800',
    },
    {
      title: 'Air (Vayu)',
      icon: Wind,
      theme: 'Movement & Freshness',
      desc: 'Cross-ventilation, indoor air quality, and biophilic movement cues that refresh attention.',
      color: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      iconBg: 'bg-emerald-100 text-emerald-800',
    },
    {
      title: 'Space (Akash)',
      icon: Maximize2,
      theme: 'Openness & Silence',
      desc: 'Clear circulation, decluttered centers, proportional volumes supporting focus and restoration.',
      color: 'bg-purple-50 text-purple-900 border-purple-200',
      iconBg: 'bg-purple-100 text-purple-800',
    },
  ];

  return (
    <section id="panchbhootas" className="py-20 bg-white border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* PART 1: Panchbhootas - The Five Elements */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 me-1 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Scientific Vastu Framework</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Panchbhootas: The Five Elements
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Vastu frames every habitat as a balance of Earth (stability), Water (flow), Fire (metabolism/transformative energy), Air (movement/ventilation), and Space (openness/silence). In contemporary design, these map to tangible considerations:
            </p>
          </div>

          {/* 5 Elements Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {elements.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border shadow-sm transition-all hover:shadow-md ${item.color} flex flex-col justify-between space-y-4`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg}`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/80 border border-slate-200/60">
                        {item.theme}
                      </span>
                    </div>
                    <h3 className="font-serif-heading font-extrabold text-xl text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
