require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log("Connecting to Supabase:", supabaseUrl);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(" Missing Supabase environment variables!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;

