import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PadVinyasVisualizer } from './components/PadVinyasVisualizer';
import { VastuCompassTool } from './components/VastuCompassTool';
import { RemediesSection } from './components/RemediesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceTitle, setBookingServiceTitle] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceTitle?: string) => {
    setBookingServiceTitle(serviceTitle);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingServiceTitle(undefined);
  };

  const scrollToSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-amber-100 selection:text-amber-900">
      {/* Top Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main>
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreCompass={() => scrollToSection('vastu-compass')}
        />

        <AboutSection onOpenBooking={() => handleOpenBooking()} />

        <ServicesSection onOpenBooking={handleOpenBooking} />

        <PadVinyasVisualizer />

        <VastuCompassTool />

        <RemediesSection onOpenBooking={() => handleOpenBooking()} />

        <WhyChooseUs />

        <TestimonialsSection />

        <FAQSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        defaultServiceTitle={bookingServiceTitle}
      />
    </div>
  );
}
