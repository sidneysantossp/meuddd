import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || 'https://lmzexdnoqqzgqoeqdqqx.supabase.co';
const supabaseAnonKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtemV4ZG5vcXF6Z3FvZXFkcXF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NzA2ODIsImV4cCI6MjA4MjE0NjY4Mn0.A7Yqe6ZmtBiNo6cJt1NQJW3URGFp4qABK-Wh-eF81s4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
