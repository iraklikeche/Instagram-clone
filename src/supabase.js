import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fycrrbzzefogsebpbdim.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5Y3JyYnp6ZWZvZ3NlYnBiZGltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYyMTkxMzcsImV4cCI6MjAwMTc5NTEzN30.fw358FRwsrhQ3Ritc02ZrGLwhyR49Ktj7EWSAlL-FpA";

export const supabase = createClient(supabaseUrl, supabaseKey);
