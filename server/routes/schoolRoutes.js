const express = require('express');
const router = express.Router();
const {
  getAllSchools,
  getSchoolById,
  createSchool,
  updateSchool,
  deleteSchool,
  searchSchools,
} = require('../controllers/schoolController.js');

// Routes
router.get('/', getAllSchools);
router.get('/search', searchSchools);
router.get('/:id', getSchoolById);
router.post('/', createSchool);
router.put('/:id', updateSchool);
router.delete('/:id', deleteSchool);

module.exports = router;