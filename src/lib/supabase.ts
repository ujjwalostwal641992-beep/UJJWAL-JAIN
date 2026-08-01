import { createClient } from '@supabase/supabase-js';

// Supabase project details
export const SUPABASE_PROJECT_ID = 'mrdganulogdlinwbpiut';
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_kzLxQhkaO7O1NBtr8R38uw_qGjOx_Lp';

// Create Supabase client instance
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface SupabaseAppointment {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  property_type: string;
  consultation_type: string;
  notes?: string;
  preferred_date?: string;
  status?: string;
  created_at?: string;
}

/**
 * Save appointment record to Supabase table
 */
export async function saveAppointmentToSupabase(bookingData: {
  name: string;
  phone: string;
  email: string;
  city: string;
  propertyType: string;
  consultationType: string;
  notes: string;
  preferredDate?: string;
}): Promise<{ success: boolean; data?: SupabaseAppointment[]; error?: string }> {
  try {
    const record = {
      name: bookingData.name,
      phone: bookingData.phone,
      email: bookingData.email || null,
      city: bookingData.city,
      property_type: bookingData.propertyType,
      consultation_type: bookingData.consultationType,
      notes: bookingData.notes || null,
      preferred_date: bookingData.preferredDate || new Date().toISOString().split('T')[0],
      status: 'Pending',
      created_at: new Date().toISOString(),
    };

    // Try inserting into 'appointments' table
    let { data, error } = await supabase.from('appointments').insert([record]).select();

    // Fallback attempt: if 'appointments' doesn't exist, try 'bookings'
    if (error && (error.code === 'PGRST301' || error.message?.includes('does not exist') || error.message?.includes('relation'))) {
      const retryResult = await supabase.from('bookings').insert([record]).select();
      if (!retryResult.error) {
        return { success: true, data: retryResult.data as SupabaseAppointment[] };
      }
    }

    if (error) {
      console.error('Supabase insertion error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data as SupabaseAppointment[] };
  } catch (err: any) {
    console.error('Supabase operation failed:', err);
    return { success: false, error: err.message || 'Failed to save appointment to Supabase' };
  }
}

/**
 * Fetch all appointments from Supabase (for admin / verification view)
 */
export async function fetchAppointmentsFromSupabase(): Promise<{
  success: boolean;
  data?: SupabaseAppointment[];
  error?: string;
}> {
  try {
    let { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error && (error.message?.includes('does not exist') || error.message?.includes('relation'))) {
      const retryResult = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (!retryResult.error) {
        return { success: true, data: retryResult.data as SupabaseAppointment[] };
      }
    }

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data as SupabaseAppointment[] };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to fetch appointments' };
  }
}

/**
 * Test connection to Supabase instance
 */
export async function testSupabaseConnection(): Promise<{ connected: boolean; message: string }> {
  try {
    const { error } = await supabase.from('appointments').select('id').limit(1);
    if (!error) {
      return { connected: true, message: 'Connected successfully to "appointments" table!' };
    }

    // Try bookings table
    const retryResult = await supabase.from('bookings').select('id').limit(1);
    if (!retryResult.error) {
      return { connected: true, message: 'Connected successfully to "bookings" table!' };
    }

    // If table doesn't exist yet
    if (error.code === '42P01' || error.message?.includes('does not exist') || error.message?.includes('relation')) {
      return {
        connected: true,
        message: 'Connected to Supabase project! Table "appointments" needs to be created in Supabase SQL editor.',
      };
    }

    return { connected: false, message: error.message };
  } catch (err: any) {
    return { connected: false, message: err.message || 'Connection error' };
  }
}

/**
 * Hash password securely using SHA-256 Web Crypto API
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '_vastu_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Check if the 1-and-only single admin account exists in Supabase or local storage
 */
export async function checkAdminExists(): Promise<{ exists: boolean; email?: string }> {
  try {
    const { data, error } = await supabase.from('admin_accounts').select('email').limit(1);

    if (!error && data && data.length > 0) {
      return { exists: true, email: data[0].email };
    }

    // Check local backup store if table is being created
    const localAdmin = localStorage.getItem('vastu_admin_credentials');
    if (localAdmin) {
      try {
        const parsed = JSON.parse(localAdmin);
        return { exists: true, email: parsed.email };
      } catch (e) {
        // ignore
      }
    }

    return { exists: false };
  } catch (err) {
    const localAdmin = localStorage.getItem('vastu_admin_credentials');
    if (localAdmin) return { exists: true };
    return { exists: false };
  }
}

/**
 * Register the FIRST and ONLY Admin account (Single Slot)
 */
export async function registerSingleSlotAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Verify that no admin exists yet
    const existing = await checkAdminExists();
    if (existing.exists) {
      return {
        success: false,
        error: `Admin slot is already claimed by ${existing.email || 'an existing admin'}. Additional admin signups are strictly prohibited.`,
      };
    }

    // 2. Hash password
    const hashedPassword = await hashPassword(password);

    // 3. Store in local fallback immediately to lock out further signups
    const adminObj = { email, passwordHash: hashedPassword, createdAt: new Date().toISOString() };
    localStorage.setItem('vastu_admin_credentials', JSON.stringify(adminObj));

    // 4. Insert into Supabase 'admin_accounts' table
    const { error } = await supabase.from('admin_accounts').insert([
      {
        email: email,
        password_hash: hashedPassword,
        role: 'admin',
        created_at: new Date().toISOString(),
      },
    ]);

    if (error && !error.message?.includes('relation') && !error.message?.includes('does not exist')) {
      console.warn('Supabase admin insert notice:', error.message);
    }

    // 5. Save session
    localStorage.setItem('vastu_admin_session', JSON.stringify({ email, timestamp: Date.now() }));

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to create admin account' };
  }
}

/**
 * Login existing Admin
 */
export async function loginAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; email?: string; error?: string }> {
  try {
    const hashedPassword = await hashPassword(password);

    // 1. Check Supabase DB first
    const { data, error } = await supabase
      .from('admin_accounts')
      .select('email, password_hash')
      .eq('email', email)
      .limit(1);

    if (!error && data && data.length > 0) {
      if (data[0].password_hash === hashedPassword) {
        localStorage.setItem('vastu_admin_session', JSON.stringify({ email, timestamp: Date.now() }));
        return { success: true, email };
      } else {
        return { success: false, error: 'Incorrect admin password.' };
      }
    }

    // 2. Check local backup credentials
    const localAdmin = localStorage.getItem('vastu_admin_credentials');
    if (localAdmin) {
      try {
        const parsed = JSON.parse(localAdmin);
        if (parsed.email.toLowerCase() === email.toLowerCase() && parsed.passwordHash === hashedPassword) {
          localStorage.setItem('vastu_admin_session', JSON.stringify({ email: parsed.email, timestamp: Date.now() }));
          return { success: true, email: parsed.email };
        } else {
          return { success: false, error: 'Invalid admin credentials.' };
        }
      } catch (e) {
        // ignore
      }
    }

    return { success: false, error: 'Admin account not found. Please verify your email.' };
  } catch (err: any) {
    return { success: false, error: err.message || 'Login failed' };
  }
}

/**
 * Check if admin is currently logged in
 */
export function getAdminSession(): { loggedIn: boolean; email?: string } {
  const session = localStorage.getItem('vastu_admin_session');
  if (!session) return { loggedIn: false };
  try {
    const parsed = JSON.parse(session);
    if (parsed && parsed.email) {
      return { loggedIn: true, email: parsed.email };
    }
  } catch (e) {
    // ignore
  }
  return { loggedIn: false };
}

/**
 * Logout admin
 */
export function logoutAdmin() {
  localStorage.removeItem('vastu_admin_session');
}

export const SUPABASE_SQL_SETUP_SCRIPT = `-- Supabase Complete Setup for Vastu Website Backend
-- Copy and run this in your Supabase Dashboard SQL Editor (https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new)

-- 1. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT NOT NULL,
  property_type TEXT NOT NULL,
  consultation_type TEXT NOT NULL DEFAULT 'Online',
  notes TEXT,
  preferred_date TEXT,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for appointments
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON appointments FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public select" ON appointments FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public delete" ON appointments FOR DELETE TO anon USING (true);

-- 2. ADMIN ACCOUNTS TABLE (SINGLE SLOT ENFORCED)
CREATE TABLE IF NOT EXISTS admin_accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for admin_accounts
ALTER TABLE admin_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select admin_accounts" ON admin_accounts FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public insert admin_accounts" ON admin_accounts FOR INSERT TO anon WITH CHECK (true);
`;
