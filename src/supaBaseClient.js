import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qojndkoaacgwikdfqidg.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvam5ka29hYWNnd2lrZGZxaWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NjYxMDMsImV4cCI6MjA1NTU0MjEwM30.nvk7nSK2mP6IXdgjN22SH3tyP1tzeShgMedIB7_G064";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { supabase };
