import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eexcikngfxvuxrirhifm.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVleGNpa25nZnh2dXhyaXJoaWZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTA4MzQyOCwiZXhwIjoyMDU2NjU5NDI4fQ.ltVkFWwqruCXy0vmhuFk7aQ8gdMESVBJC2ufpSe4Tg4';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
