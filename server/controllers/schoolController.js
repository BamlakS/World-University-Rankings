const School = require('../models/School');
const Ranking = require('../models/Ranking');

// Get all schools
exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.find().sort({ school_name: 1 });
    res.status(200).json({
      success: true,
      count: schools.length,
      data: schools,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single school with its rankings
exports.getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    
    if (!school) {
      return res.status(404).json({
        success: false,
        message: 'School not found',
      });
    }

    const rankings = await Ranking.find({ school_id: req.params.id }).sort({ year: -1 });

    res.status(200).json({
      success: true,
      data: {
        school,
        rankings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new school
exports.createSchool = async (req, res) => {
  try {
    const { school_name, country, description, website, founded_year } = req.body;

    // Check if school already exists
    const existingSchool = await School.findOne({ school_name });
    if (existingSchool) {
      return res.status(400).json({
        success: false,
        message: 'School already exists',
      });
    }

    const school = await School.create({
      school_name,
      country,
      description,
      website,
      founded_year,
    });

    res.status(201).json({
      success: true,
      data: school,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a school
exports.updateSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!school) {
      return res.status(404).json({
        success: false,
        message: 'School not found',
      });
    }

    res.status(200).json({
      success: true,
      data: school,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a school (with protection - cannot delete if rankings exist)
exports.deleteSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: 'School not found',
      });
    }

    // Check if school has any rankings by matching name and country
    const rankings = await Ranking.findOne({
      $and: [
        { university_name: school.school_name },
        { country: school.country }
      ]
    });
    
    if (rankings) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete school with existing rankings. Please delete all rankings first.',
      });
    }

    await School.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'School deleted successfully',
      data: school,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search schools by name or country
exports.searchSchools = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query required',
      });
    }

    const schools = await School.find({
      $or: [
        { school_name: { $regex: q, $options: 'i' } },
        { country: { $regex: q, $options: 'i' } },
      ],
    }).sort({ school_name: 1 });

    res.status(200).json({
      success: true,
      count: schools.length,
      data: schools,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};