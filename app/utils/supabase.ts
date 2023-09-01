import { createClient } from "@supabase/supabase-js";

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsb3JtcmRqeXFmY2ViYndzbWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM5MTk5OTYsImV4cCI6MTk5OTQ5NTk5Nn0.wnMt_x756myUr_kXfYF07xOWwQ74otyl--R2NiPQMDg';

export const supabase = createClient('https://vlormrdjyqfcebbwsmfx.supabase.co', supabaseKey)

