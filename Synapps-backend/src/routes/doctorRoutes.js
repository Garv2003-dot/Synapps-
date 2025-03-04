const express = require('express');
const router = express.Router();
const { getDoctorsBySpecialty } = require('../controllers/doctorController');

router.get('/:specialty', getDoctorsBySpecialty);

module.exports = router;
