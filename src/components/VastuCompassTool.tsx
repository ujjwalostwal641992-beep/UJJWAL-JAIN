import React, { useState } from 'react';
import { VASTU_DIRECTIONS } from '../data/companyData';
import { VastuDirectionZone } from '../types';
import { Compass, Check, Search } from 'lucide-react';

export const VastuCompassTool: React.FC = () => {
  const [activeDirection, setActiveDirection] = useState<VastuDirectionZone>(VASTU_DIRECTIONS[1]); // Default North-East (Ishan)
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section id="vastu-compass" className="py-20 bg-[#FAF8F5] border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-amber-700" />
            <span>Interactive Directional Guidance</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Vastu Zone & Room Evaluator
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select a direction on the compass or search for a specific room to discover its optimal placement and Panchtattva element rules.
          </p>

          {/* Quick Search Input */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search room (e.g. Master Bedroom, Kitchen, Puja Room)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-amber-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Direction Selectors Dial / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-10">
          {VASTU_DIRECTIONS.map((dir) => {
            const isSelected = activeDirection.code === dir.code;
            return (
              <button
                key={dir.code}
                onClick={() => setActiveDirection(dir)}
                className={`p-3 rounded-xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                  isSelected
                    ? 'bg-amber-800 text-white border-amber-900 shadow-lg scale-105'
                    : 'bg-white text-slate-800 border-amber-200/80 hover:bg-amber-50 hover:border-amber-400'
                }`}
              >
                <span className="font-serif-heading font-black text-sm">{dir.code}</span>
                <span className="text-[10px] font-semibold tracking-wider truncate w-full">
                  {dir.direction.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Zone Card Inspector */}
        {activeDirection && (
          <div className="bg-white rounded-2xl border border-amber-300/80 shadow-xl overflow-hidden">
            {/* Banner Bar */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif-heading font-black text-2xl text-amber-400">
                    {activeDirection.direction}
                  </span>
                  <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-bold border border-amber-400/30">
                    {activeDirection.code}
                  </span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">
                  Ruling Planet: <strong>{activeDirection.rulingPlanet}</strong> • Deity: <strong>{activeDirection.deity}</strong>
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-amber-500/30 text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Panchtattva Element</span>
                  <span className="font-bold text-amber-300 text-sm">{activeDirection.element}</span>
                </div>
                <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-amber-500/30 text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Recommended Palette</span>
                  <span className="font-bold text-amber-300 text-sm">{activeDirection.colorTheme}</span>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8">
              {/* Favorable Rooms */}
              <div className="bg-emerald-50/60 p-6 rounded-xl border border-emerald-200 space-y-4">
                <h4 className="font-bold text-emerald-900 text-base flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  Ideal & Favorable Placements
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeDirection.favorableRooms.map((room, idx) => (
                    <div key={idx} className="bg-white/80 p-3 rounded-lg border border-emerald-100 text-xs text-emerald-950 font-medium flex items-center gap-2.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
                      <span>{room}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

