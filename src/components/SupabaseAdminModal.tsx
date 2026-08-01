import React, { useState, useEffect } from 'react';
import {
  fetchAppointmentsFromSupabase,
  testSupabaseConnection,
  checkAdminExists,
  registerSingleSlotAdmin,
  loginAdmin,
  getAdminSession,
  logoutAdmin,
  SupabaseAppointment,
  SUPABASE_PROJECT_ID,
  SUPABASE_SQL_SETUP_SCRIPT,
  supabase,
} from '../lib/supabase';
import {
  X,
  Database,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  Clock,
  Copy,
  Check,
  Search,
  Trash2,
  ExternalLink,
  Lock,
  LogOut,
  ShieldCheck,
  UserPlus,
  KeyRound,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface SupabaseAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const SupabaseAdminModal: React.FC<SupabaseAdminModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | undefined>(undefined);
  const [adminSlotExists, setAdminSlotExists] = useState(false);

  // Form state
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);

  // Dashboard state
  const [appointments, setAppointments] = useState<SupabaseAppointment[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<{ connected: boolean; message: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSqlScript, setShowSqlScript] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      checkAuthAndSlot();
    }
  }, [isOpen]);

  const checkAuthAndSlot = async () => {
    setAuthChecking(true);
    setAuthError(null);

    // 1. Check existing session
    const session = getAdminSession();
    if (session.loggedIn) {
      setIsLoggedIn(true);
      setAdminEmail(session.email);
      setAdminSlotExists(true);
      await loadDashboardData();
    } else {
      setIsLoggedIn(false);
      // Check if admin slot has been taken
      const slot = await checkAdminExists();
      setAdminSlotExists(slot.exists);
      if (slot.email) {
        setEmailInput(slot.email);
      }
    }

    setAuthChecking(false);
  };

  const loadDashboardData = async () => {
    setLoading(true);

    // 1. Test connection
    const conn = await testSupabaseConnection();
    setConnectionStatus(conn);

    // 2. Fetch records
    const res = await fetchAppointmentsFromSupabase();
    if (res.success && res.data) {
      setAppointments(res.data);
    } else {
      setAppointments([]);
    }

    setLoading(false);
  };

  const handleRegisterAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!emailInput || !passwordInput) {
      setAuthError('Please fill in both email and password.');
      return;
    }

    if (passwordInput !== confirmPasswordInput) {
      setAuthError('Passwords do not match. Please re-enter.');
      return;
    }

    if (passwordInput.length < 6) {
      setAuthError('Password must be at least 6 characters long.');
      return;
    }

    setAuthSubmitting(true);
    const res = await registerSingleSlotAdmin(emailInput, passwordInput);
    setAuthSubmitting(false);

    if (res.success) {
      setAuthSuccessMsg('Single Admin Account registered successfully! Access granted.');
      setIsLoggedIn(true);
      setAdminEmail(emailInput);
      setAdminSlotExists(true);
      await loadDashboardData();
    } else {
      setAuthError(res.error || 'Failed to register admin account.');
    }
  };

  const handleLoginAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!emailInput || !passwordInput) {
      setAuthError('Please enter both email and password.');
      return;
    }

    setAuthSubmitting(true);
    const res = await loginAdmin(emailInput, passwordInput);
    setAuthSubmitting(false);

    if (res.success && res.email) {
      setIsLoggedIn(true);
      setAdminEmail(res.email);
      await loadDashboardData();
    } else {
      setAuthError(res.error || 'Invalid credentials.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsLoggedIn(false);
    setPasswordInput('');
    setConfirmPasswordInput('');
    setAuthSuccessMsg(null);
  };

  const copySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this appointment from Supabase?')) return;

    setDeletingId(id);
    try {
      const { error } = await supabase.from('appointments').delete().eq('id', id);
      if (error) {
        await supabase.from('bookings').delete().eq('id', id);
      }
      setAppointments((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeletingId(null);
    }
  };

  if (!isOpen) return null;

  const filteredAppointments = appointments.filter((apt) => {
    const q = searchTerm.toLowerCase();
    return (
      apt.name.toLowerCase().includes(q) ||
      apt.phone.toLowerCase().includes(q) ||
      apt.city.toLowerCase().includes(q) ||
      (apt.email && apt.email.toLowerCase().includes(q)) ||
      (apt.property_type && apt.property_type.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative border border-amber-300 animate-in fade-in zoom-in duration-200 my-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-900 text-amber-200 flex items-center justify-center shrink-0 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-heading font-extrabold text-xl sm:text-2xl text-slate-900">
                  Admin Portal & Bookings
                </h3>
                <span className="bg-amber-100 text-amber-900 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-amber-300">
                  Supabase Backend
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Secure 1-slot administrator dashboard for Vastu consultation bookings
              </p>
            </div>
          </div>

          {isLoggedIn && (
            <div className="flex items-center gap-2">
              <button
                onClick={loadDashboardData}
                disabled={loading}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* AUTH CHECKING SPINNER */}
        {authChecking ? (
          <div className="py-16 text-center text-slate-500 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-800" />
            <p className="text-xs font-semibold">Verifying Admin Account credentials & single-slot status...</p>
          </div>
        ) : !isLoggedIn ? (
          /* AUTH SCREEN: LOGIN or FIRST-TIME SETUP */
          <div className="max-w-md mx-auto py-4 space-y-6">
            {!adminSlotExists ? (
              /* CREATE FIRST ADMIN (SINGLE SLOT) */
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 bg-amber-800 text-amber-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif-heading font-extrabold text-lg text-slate-900">
                    Create Admin Account (Single Slot)
                  </h4>
                  <p className="text-xs text-amber-900 bg-amber-100 p-2.5 rounded-lg border border-amber-300 font-medium leading-relaxed">
                    <strong>1-Time Slot Provision:</strong> You are setting up the sole administrator account for this website. Once created, no other admin accounts can be registered.
                  </p>
                </div>

                <form onSubmit={handleRegisterAdmin} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Admin Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="admin@yourdomain.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="At least 6 characters"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Re-enter password"
                      value={confirmPasswordInput}
                      onChange={(e) => setConfirmPasswordInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
                    />
                  </div>

                  {authError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-2.5 rounded-lg text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={authSubmitting}
                    className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs py-3 rounded-lg shadow transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {authSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Registering Admin Slot...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-amber-300" />
                        <span>Claim Single Admin Account Slot</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* LOGIN SCREEN (SLOT CLAIMED) */
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 bg-slate-900 text-amber-300 rounded-full flex items-center justify-center mx-auto mb-2">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif-heading font-extrabold text-lg text-slate-900">
                    Administrator Login
                  </h4>
                  <p className="text-xs text-slate-500">
                    Enter your registered credentials to access the bookings dashboard.
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-2.5 rounded-lg text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Single Slot Claimed:</strong> Registration closed. Login permitted only for the administrator account.
                  </span>
                </div>

                <form onSubmit={handleLoginAdmin} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="admin@domain.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Enter admin password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
                    />
                  </div>

                  {authError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-2.5 rounded-lg text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={authSubmitting}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs py-3 rounded-lg shadow transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {authSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-amber-400" />
                        <span>Sign In to Admin Panel</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          /* DASHBOARD SCREEN: LOGGED IN ADMIN */
          <div>
            {/* Logged in Admin Banner */}
            <div className="bg-slate-900 text-slate-200 p-3 rounded-xl mb-4 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Logged in as <strong>{adminEmail}</strong> (Single Admin Slot)
                </span>
              </div>
              <button
                onClick={() => setShowSqlScript(!showSqlScript)}
                className="text-amber-400 hover:underline text-[11px] font-bold flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                <span>{showSqlScript ? 'Hide SQL Script' : 'Supabase Table SQL Script'}</span>
              </button>
            </div>

            {/* Connection Status Banner */}
            {connectionStatus && (
              <div
                className={`p-3 rounded-xl mb-6 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 border ${
                  connectionStatus.connected
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-amber-50 text-amber-900 border-amber-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {connectionStatus.connected ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  <span>
                    <strong>Database Status:</strong> {connectionStatus.message}
                  </span>
                </div>
                <a
                  href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-amber-900 hover:underline flex items-center gap-1"
                >
                  <span>Open Supabase Console</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* SQL Script Accordion */}
            {showSqlScript && (
              <div className="bg-slate-900 text-amber-200 p-4 rounded-xl text-xs font-mono mb-6 relative border border-slate-800 animate-in fade-in">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                  <span className="font-bold text-amber-400">Supabase SQL Editor Setup Script:</span>
                  <button
                    onClick={copySql}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans text-xs font-bold px-3 py-1 rounded flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-950" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mb-3 font-sans">
                  Run this SQL script in your Supabase Dashboard &gt; SQL Editor to ensure your 'appointments' and 'admin_accounts' tables exist.
                </p>
                <pre className="whitespace-pre-wrap text-[11px] max-h-48 overflow-y-auto p-2 bg-slate-950 rounded border border-slate-800">
                  {SUPABASE_SQL_SETUP_SCRIPT}
                </pre>
              </div>
            )}

            {/* Search & Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by name, phone, city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <span className="text-xs text-slate-500 font-semibold">
                  Total Bookings: <strong>{appointments.length}</strong>
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Test New Booking</span>
                </button>
              </div>
            </div>

            {/* Appointments Table / Cards */}
            {loading ? (
              <div className="py-12 text-center text-slate-500 space-y-3">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto text-amber-700" />
                <p className="text-xs font-semibold">Fetching live appointment records from Supabase...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3 p-6">
                <Database className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="font-serif-heading font-bold text-slate-800 text-lg">No Supabase Appointments Found</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  {searchTerm
                    ? 'No appointment records match your search criteria.'
                    : 'Submissions filed through the booking form will automatically populate here in real-time.'}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBooking();
                    }}
                    className="bg-amber-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow hover:bg-amber-900 cursor-pointer"
                  >
                    Submit First Appointment Form
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {filteredAppointments.map((apt) => (
                  <div
                    key={apt.id || Math.random().toString()}
                    className="bg-slate-50 hover:bg-amber-50/50 p-4 rounded-xl border border-slate-200 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          <User className="w-4 h-4 text-amber-800" />
                          {apt.name}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase">
                          {apt.consultation_type || 'Online'}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {apt.status || 'Pending'}
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-2 text-xs text-slate-600 pt-1">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <a href={`tel:${apt.phone}`} className="hover:text-amber-800 font-semibold">
                            {apt.phone}
                          </a>
                        </div>

                        {apt.email && (
                          <div className="flex items-center gap-1.5 truncate">
                            <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span className="truncate">{apt.email}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{apt.city}</span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-700 pt-1 flex items-center gap-2">
                        <Building className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                        <span>
                          <strong>Property Service:</strong> {apt.property_type}
                        </span>
                      </div>

                      {apt.notes && (
                        <p className="text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-200 italic mt-1">
                          "{apt.notes}"
                        </p>
                      )}

                      <div className="text-[10px] text-slate-400 pt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          Created: {apt.created_at ? new Date(apt.created_at).toLocaleString() : 'Just now'}
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center justify-end gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                      <a
                        href={`https://wa.me/${apt.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1"
                      >
                        <span>WhatsApp Client</span>
                      </a>

                      {apt.id && (
                        <button
                          onClick={() => handleDelete(apt.id)}
                          disabled={deletingId === apt.id}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                          title="Delete record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
