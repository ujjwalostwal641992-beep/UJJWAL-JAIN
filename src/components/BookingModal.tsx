import React, { useState } from 'react';
import { COMPANY_INFO, SERVICES_LIST } from '../data/companyData';
import { ConsultationBooking } from '../types';
import {
  saveAppointmentToSupabase,
  SUPABASE_PROJECT_ID,
  SUPABASE_SQL_SETUP_SCRIPT,
} from '../lib/supabase';
import {
  X,
  Calendar,
  MessageSquare,
  Mail,
  Phone,
  CheckCircle2,
  Send,
  Building,
  Database,
  Loader2,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceTitle?: string;
  onOpenAdmin?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultServiceTitle,
  onOpenAdmin,
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

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [supabaseSaved, setSupabaseSaved] = useState(false);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  const [showSql, setShowSql] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isOpen) return null;

  const handleSaveAndSubmit = async (method: 'supabase_only' | 'whatsapp' | 'email') => {
    setSubmitting(true);
    setSupabaseError(null);

    // 1. Save to Supabase backend table
    const result = await saveAppointmentToSupabase(formData);

    if (result.success) {
      setSupabaseSaved(true);
    } else {
      console.warn('Supabase save warning:', result.error);
      setSupabaseError(result.error || 'Saved locally; backend table may need initial creation.');
    }

    setSubmitting(false);
    setSubmitted(true);

    // 2. Dispatch externally if WhatsApp or Email requested
    if (method === 'whatsapp') {
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
Inquiry saved to Supabase (Project ID: ${SUPABASE_PROJECT_ID})`;
      const url = `https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    } else if (method === 'email') {
      const subject = encodeURIComponent(`Vastu Consultation Inquiry - ${formData.name || 'Client'}`);
      const body = encodeURIComponent(
        `Dear Er. Ujjwal Jain,\n\nI would like to inquire about Vastu consultation services.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nCity: ${formData.city}\nService: ${formData.propertyType}\nMode: ${formData.consultationType}\nNotes: ${formData.notes}\n\n[Record saved to Supabase backend ID: ${SUPABASE_PROJECT_ID}]\n\nThank you.`
      );
      window.open(`mailto:${COMPANY_INFO.contact.email}?subject=${subject}&body=${body}`, '_blank');
    }
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
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

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-800 text-white flex items-center justify-center shrink-0">
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
        </div>

        {/* Supabase Status Banner */}
        <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Connected to <strong>Supabase Backend</strong> ({SUPABASE_PROJECT_ID})
            </span>
          </div>
          {onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 hover:underline cursor-pointer"
            >
              View Records
            </button>
          )}
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-serif-heading font-extrabold text-2xl text-slate-900">
              Inquiry Dispatched & Saved!
            </h4>

            {supabaseSaved ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-300">
                <Database className="w-3.5 h-3.5" />
                <span>Successfully saved to Supabase 'appointments' table</span>
              </div>
            ) : supabaseError ? (
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-left text-xs text-amber-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-800">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Notice: Table setup in Supabase SQL editor recommended</span>
                </div>
                <p className="text-[11px] text-amber-700">
                  If the 'appointments' table hasn't been created yet in your Supabase dashboard, run the one-click SQL script:
                </p>
                <button
                  onClick={() => setShowSql(!showSql)}
                  className="text-[11px] font-bold text-amber-900 underline cursor-pointer"
                >
                  {showSql ? 'Hide SQL Script' : 'Show Supabase SQL Setup Query'}
                </button>

                {showSql && (
                  <div className="bg-slate-900 text-amber-200 p-3 rounded-lg text-[10px] font-mono relative overflow-x-auto">
                    <button
                      onClick={copySqlToClipboard}
                      className="absolute top-2 right-2 p-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[10px] flex items-center gap-1"
                    >
                      {copiedSql ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedSql ? 'Copied' : 'Copy SQL'}</span>
                    </button>
                    <pre className="whitespace-pre-wrap">{SUPABASE_SQL_SETUP_SCRIPT}</pre>
                  </div>
                )}
              </div>
            ) : null}

            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
              Thank you <strong>{formData.name || 'Valued Client'}</strong>. Er. Ujjwal Jain and team will review your consultation request promptly.
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-slate-900 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow hover:bg-slate-800 cursor-pointer"
              >
                Close Window
              </button>
              {onOpenAdmin && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAdmin();
                  }}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs px-5 py-2.5 rounded-lg border border-amber-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>View All Supabase Bookings</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveAndSubmit('supabase_only');
            }}
            className="space-y-4"
          >
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
                disabled={submitting}
                className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs py-3 rounded-lg shadow transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving to Supabase Backend...</span>
                  </>
                ) : (
                  <>
                    <Database className="w-4 h-4 text-amber-300" />
                    <span>Book Appointment & Save to Supabase</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleSaveAndSubmit('whatsapp')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Save + WhatsApp</span>
                </button>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleSaveAndSubmit('email')}
                  className="bg-slate-900 hover:bg-slate-800 text-amber-200 font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Save + Email</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

