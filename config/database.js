const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
// Use service_role key to bypass RLS; fall back to anon key for dev
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("WARNING: SUPABASE_URL or Supabase API key is missing in environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = {
  supabase
};

