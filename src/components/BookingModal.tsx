import React, { useState } from 'react';
import { COMPANY_INFO, SERVICES_LIST } from '../data/companyData';
import { ConsultationBooking } from '../types';
import { X, Calendar, MessageSquare, Mail, Phone, CheckCircle2, Send, Clock, Building } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceTitle?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultServiceTitle,
}) => {
  const [formData, setFormData] = useState<ConsultationBooking>({
    name: '',
    phone: '',
    email: '',
    city: '',
    propertyType: defaultServiceTitle || 'Residential Vastu Consultation',
    consultationType: 'Online',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const generateWhatsAppMessage = () => {
    const text = `*New Vastu Consultation Request*
----------------------------------
*Name:* ${formData.name || 'Not provided'}
*Phone:* ${formData.phone || 'Not provided'}
*Email:* ${formData.email || 'Not provided'}
*City/State:* ${formData.city || 'Not provided'}
*Service/Property:* ${formData.propertyType}
*Consultation Mode:* ${formData.consultationType} Mode
*Notes:* ${formData.notes || 'Looking for expert Vastu guidance.'}
----------------------------------
Inquiry sent via UJJWAL JAIN Vastu Website.`;

    return encodeURIComponent(text);
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${generateWhatsAppMessage()}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent(`Vastu Consultation Inquiry - ${formData.name || 'Client'}`);
    const body = encodeURIComponent(
      `Dear Er. Ujjwal Jain,\n\nI would like to inquire about Vastu consultation services.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nCity: ${formData.city}\nService: ${formData.propertyType}\nMode: ${formData.consultationType}\nNotes: ${formData.notes}\n\nThank you.`
    );
    window.open(`mailto:${COMPANY_INFO.contact.email}?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-amber-300 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-800 text-white flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif-heading font-extrabold text-xl sm:text-2xl text-slate-900">
              Book Vastu Consultation
            </h3>
            <p className="text-xs text-slate-500">
              Directly with Senior Vastu Consultant & Civil Engineer Ujjwal Jain
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-serif-heading font-extrabold text-2xl text-slate-900">
              Inquiry Dispatched!
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
              Thank you {formData.name || 'Valued Client'}. Our team will review your details and contact you shortly.
            </p>
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-slate-900 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow hover:bg-slate-800 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleWhatsAppSend} className="space-y-4">
            {/* Consultation Mode Selection */}
            <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200 space-y-2">
              <label className="block text-xs font-bold text-amber-900">
                Select Consultation Type:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, consultationType: 'Online' })}
                  className={`p-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    formData.consultationType === 'Online'
                      ? 'bg-amber-800 text-white border-amber-900 shadow'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Online CAD Review</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, consultationType: 'On-site' })}
                  className={`p-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    formData.consultationType === 'On-site'
                      ? 'bg-amber-800 text-white border-amber-900 shadow'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>On-Site Physical Visit</span>
                </button>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 7000593516"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. ujjwalostwal641992@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City / Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Durg, Raipur, Surat..."
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Service / Property Category</label>
              <select
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
              >
                {SERVICES_LIST.map((srv) => (
                  <option key={srv.id} value={srv.title}>
                    {srv.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Property Size / Specific Notes</label>
              <textarea
                rows={2}
                placeholder="Mention plot size, floor area, construction stage, or specific concerns..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
              ></textarea>
            </div>

            {/* Submit Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-lg shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Instant WhatsApp Inquiry (+91 7000593516)</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleEmailSend}
                  className="w-1/2 bg-slate-900 hover:bg-slate-800 text-amber-200 font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send via Email</span>
                </button>

                <a
                  href={`tel:${COMPANY_INFO.contact.phone}`}
                  className="w-1/2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Directly</span>
                </a>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
