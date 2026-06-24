const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const upload = require('../utils/upload');

router.route('/')
  .get(getProjects)
  .post(protect, upload.single('image'), createProject);

router.route('/:id')
  .put(protect, upload.single('image'), updateProject)
  .delete(protect, deleteProject);

module.exports = router;
