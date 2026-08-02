import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PadVinyasVisualizer } from './components/PadVinyasVisualizer';
import { VastuCompassTool } from './components/VastuCompassTool';
import { PanchbhootasSection } from './components/PanchbhootasSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-amber-100 selection:text-amber-900">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero onExploreCompass={() => scrollToSection('vastu-compass')} />

        <AboutSection />

        <ServicesSection />

        <PadVinyasVisualizer />

        <VastuCompassTool />

        <PanchbhootasSection />

        <WhyChooseUs />

        <TestimonialsSection />

        <FAQSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}


