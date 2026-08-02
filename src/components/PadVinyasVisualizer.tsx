import React, { useState } from 'react';
import { Grid, Compass, Info, CheckCircle2 } from 'lucide-react';

interface PadaCell {
  id: number;
  row: number;
  col: number;
  deity: string;
  zone: 'Brahma' | 'Deva' | 'Inner' | 'Outer';
  direction: string;
  element: string;
  idealFor: string;
  avoid: string;
  engineeringTip: string;
}

export const PadVinyasVisualizer: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<PadaCell | null>(null);

  // Generate 81 Grid (9x9) data for Pad Vinyas
  const gridCells: PadaCell[] = Array.from({ length: 81 }, (_, index) => {
    const row = Math.floor(index / 9);
    const col = index % 9;

    // Center 3x3 is Brahma Sthan (cells row 3-5, col 3-5)
    const isBrahma = row >= 3 && row <= 5 && col >= 3 && col <= 5;
    const isNorthEast = row <= 2 && col >= 6;
    const isSouthEast = row >= 6 && col >= 6;
    const isSouthWest = row >= 6 && col <= 2;
    const isNorthWest = row <= 2 && col <= 2;

    let deity = 'Devta';
    let zone: 'Brahma' | 'Deva' | 'Inner' | 'Outer' = 'Outer';
    let direction = 'Center';
    let element = 'Space (Akash)';
    let idealFor = 'Open Courtyard / Hall / Zero Load';
    let avoid = 'Heavy Columns, Toilets, Staircase';
    let engineeringTip = 'Keep structural load minimal. Allow natural daylight skylight.';

    if (isBrahma) {
      deity = 'Brahma (Creator Core)';
      zone = 'Brahma';
      direction = 'Brahma Sthan (Center)';
      element = 'Ether / Space (Akash)';
      idealFor = 'Open Central Courtyard, Living Skylight, Atrium';
      avoid = 'Heavy Columns, Underground Tanks, Toilets, Beams';
      engineeringTip = 'Civil engineers ensure zero load bearing pillars directly over the exact geometric center.';
    } else if (isNorthEast) {
      deity = 'Shikhi / Parjanya / Jayant (NE Deities)';
      zone = 'Deva';
      direction = 'North-East (Ishan)';
      element = 'Water (Jal)';
      idealFor = 'Puja Room, Meditation, Underground Water Tank, Borewell';
      avoid = 'Kitchen, Toilet, Heavy Master Bedroom, Septic Tank';
      engineeringTip = 'Ensure maximum window openings for early morning UV sunlight.';
    } else if (isSouthEast) {
      deity = 'Agni / Savita / Bhrisha (SE Deities)';
      zone = 'Deva';
      direction = 'South-East (Agni Cone)';
      element = 'Fire (Agni)';
      idealFor = 'Kitchen Cooktop, Transformer, Inverter, Electric Panel';
      avoid = 'Water Tank, Borewell, Underground Water Storage';
      engineeringTip = 'Plan heavy fireproof electrical ducting and proper exhaust ventilation.';
    } else if (isSouthWest) {
      deity = 'Indra / Pitru / Sugreev (SW Deities)';
      zone = 'Inner';
      direction = 'South-West (Nairitya)';
      element = 'Earth (Prithvi)';
      idealFor = 'Master Bedroom, MD Office Desk, Heavy Structural Columns';
      avoid = 'Main Entrance, Puja Room, Underground Tank, Borewell';
      engineeringTip = 'Highest elevation and maximum structural column thickness placed here for stability.';
    } else if (isNorthWest) {
      deity = 'Roga / Vayu / Poshadhanta (NW Deities)';
      zone = 'Inner';
      direction = 'North-West (Vayu)';
      element = 'Air (Vayu)';
      idealFor = 'Guest Room, Finished Goods Store, Garage, Vehicle Parking';
      avoid = 'Master Bedroom (causes restlessness), Heavy Permanent Lockers';
      engineeringTip = 'Design effective cross-ventilation air louvers and light partitioning.';
    } else if (row === 0) {
      deity = 'Kuber / Diti / Aditi (North Line)';
      zone = 'Outer';
      direction = 'North';
      element = 'Water / Mercury';
      idealFor = 'Main Door, Living Area, Cash Safe Facing North';
      avoid = 'Toilets, Heavy Overhead Tanks';
      engineeringTip = 'Keep floor slope gently draining towards North/East.';
    } else if (col === 8) {
      deity = 'Indra / Ravi / Satya (East Line)';
      zone = 'Outer';
      direction = 'East';
      element = 'Air / Wood';
      idealFor = 'Verandah, Windows, Entrance, Balcony';
      avoid = 'High Boundary Walls Blocking Light';
      engineeringTip = 'Optimize window-to-wall ratio for solar heat gain control.';
    } else if (row === 8) {
      deity = 'Yama / Gandharva / Bhringraj (South Line)';
      zone = 'Outer';
      direction = 'South';
      element = 'Fire / Earth';
      idealFor = 'Bedrooms, Staircase, Heavy Storage';
      avoid = 'Borewells, Underground Drainage';
      engineeringTip = 'Thicker exterior masonry walls to block harsh afternoon heat.';
    } else {
      deity = 'Varuna / Pushpadanta / Sugriva (West Line)';
      zone = 'Outer';
      direction = 'West';
      element = 'Space / Metal';
      idealFor = 'Dining Hall, Study Desk, Overhead Water Tank';
      avoid = 'Cooking Range, Puja Room';
      engineeringTip = 'Overhead RCC water tank installed on West or South-West roof.';
    }

    return {
      id: index + 1,
      row,
      col,
      deity,
      zone,
      direction,
      element,
      idealFor,
      avoid,
      engineeringTip,
    };
  });

  return (
    <section id="pad-vinyas" className="py-20 bg-slate-950 text-white relative border-b border-amber-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Grid className="w-4 h-4 text-amber-400" />
            <span>Vedic CAD Mapping Innovation</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Interactive Pad Vinyas Grid Explorer
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Pad Vinyas superimposes an 81-Grid (9x9) Vastu Purusha Mandala over your property CAD drawing. Click any cell below to explore micro-deity energy fields, elemental balances, and civil engineering guidelines.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* 9x9 Interactive Grid Matrix */}
          <div className="lg:col-span-7 bg-slate-900/90 p-4 sm:p-6 rounded-2xl border border-amber-500/30 shadow-2xl">
            <div className="flex items-center justify-between mb-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Compass className="w-4 h-4" />
                <span>North (Top) • East (Right)</span>
              </span>
              <span className="text-slate-400">Click any grid square (1 - 81)</span>
            </div>

            {/* Matrix */}
            <div className="grid grid-cols-9 gap-1 aspect-square bg-slate-950 p-2 rounded-xl border border-slate-800">
              {gridCells.map((cell) => {
                const isSelected = selectedCell?.id === cell.id;

                let cellBg = 'bg-slate-900/90 hover:bg-slate-800 text-slate-400 border-slate-800';
                if (cell.zone === 'Brahma') {
                  cellBg = isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-400'
                    : 'bg-amber-950/60 text-amber-300 border-amber-800/60 hover:bg-amber-900/80';
                } else if (cell.zone === 'Deva') {
                  cellBg = isSelected
                    ? 'bg-amber-400 text-slate-950 border-white ring-2 ring-amber-300'
                    : 'bg-amber-900/40 text-amber-200 border-amber-800/40 hover:bg-amber-800/50';
                } else if (isSelected) {
                  cellBg = 'bg-amber-400 text-slate-950 border-amber-200 ring-2 ring-amber-300';
                }

                return (
                  <button
                    key={cell.id}
                    onClick={() => setSelectedCell(cell)}
                    className={`flex flex-col items-center justify-center p-1 rounded transition-all text-[10px] font-bold border cursor-pointer select-none ${cellBg}`}
                    title={`Pada ${cell.id}: ${cell.deity}`}
                  >
                    <span>{cell.id}</span>
                  </button>
                );
              })}
            </div>

            {/* Grid Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-amber-950 border border-amber-700"></div>
                <span className="text-amber-300 font-medium">Brahma Sthan (Core)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-amber-900/60 border border-amber-800"></div>
                <span className="text-slate-300 font-medium">Deva Zones (NE / SE)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-slate-900 border border-slate-700"></div>
                <span className="text-slate-400 font-medium">Outer Perimeter Padas</span>
              </div>
            </div>
          </div>

          {/* Cell Detail Inspector Box */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-2xl border border-amber-500/30 shadow-2xl space-y-6">
            {selectedCell ? (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                      #{selectedCell.id}
                    </div>
                    <div>
                      <h3 className="font-serif-heading font-extrabold text-lg text-slate-100">
                        {selectedCell.deity}
                      </h3>
                      <p className="text-xs text-amber-400 font-medium">
                        Direction: {selectedCell.direction}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-700/50">
                    {selectedCell.element}
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Zone Category</span>
                    <span className="font-bold text-amber-300">{selectedCell.zone} Zone</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Grid Position</span>
                    <span className="font-bold text-slate-200">Row {selectedCell.row + 1}, Column {selectedCell.col + 1}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center space-y-4 text-slate-400">
                <Info className="w-12 h-12 text-amber-400/60 mx-auto animate-bounce" />
                <h3 className="font-serif-heading font-bold text-slate-200 text-lg">
                  Select Any Grid Number Above
                </h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Click on any of the 81 Pada cells on the left matrix to inspect its Vedic micro-deity field and civil engineering alignment rules.
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Full Pad Vinyas CAD Report:</strong> We superimpose this exact 81-Grid onto your DWG / PDF floor plans during consultation.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
