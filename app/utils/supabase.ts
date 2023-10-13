import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseUrl = 'https://vlormrdjyqfcebbwsmfx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsb3JtcmRqeXFmY2ViYndzbWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM5MTk5OTYsImV4cCI6MTk5OTQ5NTk5Nn0.wnMt_x756myUr_kXfYF07xOWwQ74otyl--R2NiPQMDg';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

