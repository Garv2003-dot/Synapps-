const supabase = require('./config/db');

async function getUsers() {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    console.error("❌ Supabase Query Error:", error);
    return;
  }
  
  console.log("✅ Users:", data);
}

getUsers();
