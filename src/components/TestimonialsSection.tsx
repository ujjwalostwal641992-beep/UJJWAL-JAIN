import React, { useState } from 'react';
import { TESTIMONIALS_LIST } from '../data/companyData';
import { Testimonial } from '../types';
import { Star, MessageSquareQuote, Plus, Check, X, MapPin } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS_LIST);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    location: '',
    role: '',
    rating: 5,
    text: '',
  });
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    const item: Testimonial = {
      id: Date.now().toString(),
      name: newReview.name,
      location: newReview.location || 'India',
      role: newReview.role || 'Verified Client',
      rating: newReview.rating,
      text: newReview.text,
      date: 'Just now',
    };

    setTestimonials([item, ...testimonials]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIsModalOpen(false);
      setNewReview({ name: '', location: '', role: '', rating: 5, text: '' });
    }, 1800);
  };

  return (
    <section id="testimonials" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <MessageSquareQuote className="w-4 h-4 text-amber-700" />
              <span>Client Experiences</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Testimonials & Client Feedback
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Read authentic feedback from homeowners, business leaders, and property developers across Surat, Raipur, Durg, Indore, and pan-India.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs px-5 py-3 rounded-lg shadow transition-colors flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Your Review</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAF8F5] p-6 rounded-2xl border border-amber-200/80 shadow-sm flex flex-col justify-between space-y-4 relative"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <div className="font-serif-heading font-bold text-slate-900 text-sm">
                  {item.name}
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-800 mt-0.5 font-medium">
                  <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                  <span>{item.location}</span>
                  {item.role && <span className="text-slate-500">• {item.role}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Testimonial Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-amber-300">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-heading font-extrabold text-2xl text-slate-900 mb-1">
              Share Your Experience
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Your feedback helps others discover the power of Vedic Vastu and Civil Architecture.
            </p>

            {submittedMessage ? (
              <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-xl text-center space-y-2">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-emerald-900 text-base">Thank You!</h4>
                <p className="text-xs text-emerald-800">
                  Your testimonial has been submitted successfully.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Neha Patel"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City / Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Surat, Raipur"
                      value={newReview.location}
                      onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Rating</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                    >
                      <option value={5}>5 Stars (Excellent)</option>
                      <option value={4}>4 Stars (Very Good)</option>
                      <option value={3}>3 Stars (Good)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Feedback *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe how Vastu guidance improved your space..."
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs py-3 rounded-lg shadow transition-colors cursor-pointer"
                >
                  Submit Testimonial
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
