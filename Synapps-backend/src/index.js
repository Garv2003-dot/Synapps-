const express = require('express');
const cors = require('cors');
require('dotenv').config();

const doctorRoutes = require('./routes/doctorRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/doctors', doctorRoutes);

app.get('/', (req, res) => {
  res.send('Synapps Backend API is Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
