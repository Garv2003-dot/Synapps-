const pool = require('../config/db');

const getDoctorsBySpecialty = async (req, res) => {
  const { specialty } = req.params;
  
  try {
    const query = 'SELECT * FROM doctors WHERE specialty = $1';
    const result = await pool.query(query, [specialty]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getDoctorsBySpecialty };
