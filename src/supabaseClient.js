import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://smfempwpkyuqwochezox.supabase.co"; // replace with your URL
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtZmVtcHdwa3l1cXdvY2hlem94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzOTYyMTksImV4cCI6MjA3MTk3MjIxOX0.PTkG55oZMKARk-BytuAcHdlHi9rR8C3AtR7wfB1ldT8"; // replace with your key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
