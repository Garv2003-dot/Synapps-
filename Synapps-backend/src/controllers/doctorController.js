const supabase = require('../config/db'); 

const getDoctorsBySpecialty = async (req, res) => {
  const { specialty } = req.params;
  
  try {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .ilike('specialty', `%${specialty}%`);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getDoctorsBySpecialty };
