const express = require('express');
const router = express.Router();
const { getExperiences, createExperience, deleteExperience } = require('../controllers/experienceController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getExperiences)
  .post(protect, createExperience);

router.route('/:id')
  .delete(protect, deleteExperience);

module.exports = router;
