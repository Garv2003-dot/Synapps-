const pool = require('./src/config/db'); // Adjusted path to match your structure

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Database connected! Current Time:', res.rows[0].now);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    pool.end(); // Close the connection pool after test
  }
})();
