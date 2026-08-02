import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/companyData';
import { ServiceItem } from '../types';
import {
  Grid,
  Home,
  Briefcase,
  Factory,
  Compass,
  Layers,
  Building2,
  Palette,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X,
  Phone,
  Layers3
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const categories = ['All', 'Residential', 'Commercial', 'Specialized', 'Architecture'];

  const filteredServices = SERVICES_LIST.filter((service) => {
    if (activeCategory === 'All') return true;
    return service.category === activeCategory;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Grid':
        return <Grid className="w-6 h-6 text-amber-700" />;
      case 'Home':
        return <Home className="w-6 h-6 text-amber-700" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-amber-700" />;
      case 'Factory':
        return <Factory className="w-6 h-6 text-amber-700" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-amber-700" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-amber-700" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-amber-700" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-amber-700" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-amber-700" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-700" />;
      default:
        return <Layers3 className="w-6 h-6 text-amber-700" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-amber-700" />
            <span>Comprehensive Vastu Solutions</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Professional Vastu & Architectural Services
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            From plot selection and CAD floor planning to non-demolition remedies and Pad Vinyas energy grid mapping, we offer specialized services tailored for your needs.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-bold px-4 py-2.5 rounded-full transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-800 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-amber-100/80 hover:text-amber-900'
              }`}
            >
              {cat === 'All' ? `All Services (${SERVICES_LIST.length})` : cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#FAF8F5] rounded-2xl p-6 border border-amber-200/80 hover:border-amber-400/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-100/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-amber-900/10 text-amber-800 border border-amber-800/20">
                    {service.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-heading font-extrabold text-xl text-slate-900 group-hover:text-amber-800 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Key Features List */}
                <ul className="space-y-1.5 pt-2 border-t border-slate-200/60">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-6 border-t border-slate-200/60 flex items-center justify-between gap-3 mt-4">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-bold text-amber-800 hover:text-amber-900 underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="#contact"
                  className="bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold px-3.5 py-2 rounded-md shadow transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Inquire</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-amber-300 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                  {getIcon(selectedService.iconName)}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    {selectedService.category}
                  </span>
                  <h3 className="font-serif-heading font-extrabold text-2xl text-slate-900 mt-1">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Service Overview</h4>
                <p className="text-slate-700 text-sm mt-1 leading-relaxed">
                  {selectedService.fullDesc}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Key Scope & Deliverables</h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {selectedService.features.map((feat, idx) => (
                    <div key={idx} className="bg-amber-50/80 p-2.5 rounded-lg border border-amber-200/80 flex items-start gap-2 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 text-amber-100 p-4 rounded-xl text-xs space-y-1">
                <span className="font-bold text-amber-300 block">Ideal For:</span>
                <span>{selectedService.idealFor}</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Close
                </button>

                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold text-xs px-6 py-2.5 rounded-md shadow flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Inquire for {selectedService.title}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

