const { Pool } = require('pg');
require('dotenv').config(); // Load .env variables

console.log("Connecting to database:", process.env.SUPABASE_DATABASE_URL); // Debugging

const pool = new Pool({
  connectionString: process.env.SUPABASE_DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Supabase requires SSL
});

pool.connect()
  .then(() => console.log('✅ Connected to Supabase Database'))
  .catch(err => console.error('❌ Database connection error:', err));

module.exports = pool;
