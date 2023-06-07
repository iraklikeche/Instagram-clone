import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dbuqnfpythmqjwcgjkgz.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRidXFuZnB5dGhtcWp3Y2dqa2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYxNTM1NDMsImV4cCI6MjAwMTcyOTU0M30.CyhNdtODNd8klxBswNs4Wcp4M5E4Pp_3mX4X4u4hExE";

export const supabase = createClient(supabaseUrl, supabaseKey);
