const Ranking = require('../models/Ranking');
const School = require('../models/School');

// Get all rankings
exports.getAllRankings = async (req, res) => {
  try {
    
    const rankings = await Ranking.aggregate([
      {
        $lookup: {
          from: 'school',
          let: { uni_name: '$university_name', country: '$country' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$school_name', '$$uni_name'] },
                    { $eq: ['$country', '$$country'] }
                  ]
                }
              }
            }
          ],
          as: 'schoolInfo'
        }
      },
      {
        $sort: { year: -1, world_rank: 1 }
      }
    ]);
    
    res.status(200).json({
      success: true,
      count: rankings.length,
      data: rankings,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get ranking by ID
exports.getRankingById = async (req, res) => {
  try {
    const ranking = await Ranking.findById(req.params.id).populate(
      'school_id',
      'school_name country'
    );

    if (!ranking) {
      return res.status(404).json({
        success: false,
        message: 'Ranking not found',
      });
    }

    res.status(200).json({
      success: true,
      data: ranking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get rankings by school
exports.getRankingsBySchool = async (req, res) => {
  try {
    const rankings = await Ranking.find({ school_id: req.params.schoolId })
      .populate('school_id', 'school_name country')
      .sort({ year: -1 });

    res.status(200).json({
      success: true,
      count: rankings.length,
      data: rankings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get rankings by year
exports.getRankingsByYear = async (req, res) => {
  try {
    const { year } = req.params;
    console.log('Filtering rankings by year:', year);
    
    const rankings = await Ranking.aggregate([
      {
        $match: { year: parseInt(year) }
      },
      {
        $lookup: {
          from: 'school',
          let: { uni_name: '$university_name', country: '$country' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$school_name', '$$uni_name'] },
                    { $eq: ['$country', '$$country'] }
                  ]
                }
              }
            }
          ],
          as: 'schoolInfo'
        }
      },
      {
        $sort: { world_rank: 1 }
      }
    ]);

    console.log('Rankings for year', year, ':', rankings.length);
    
    res.status(200).json({
      success: true,
      count: rankings.length,
      data: rankings,
    });
  } catch (error) {
    console.error('Error filtering by year:', error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Create a new ranking
exports.createRanking = async (req, res) => {
  try {
    const {
      school_id,
      university_name,
      country,
      world_rank,
      teaching,
      international,
      research,
      citations,
      income,
      total_score,
      num_students,
      student_staff_ratio,
      international_students,
      year,
    } = req.body;

    // Verify school exists
    const school = await School.findById(school_id);
    if (!school) {
      return res.status(404).json({
        success: false,
        message: 'School not found',
      });
    }

    const ranking = await Ranking.create({
      school_id,
      university_name,
      country,
      world_rank,
      teaching,
      international,
      research,
      citations,
      income,
      total_score,
      num_students,
      student_staff_ratio,
      international_students,
      year,
    });

    res.status(201).json({
      success: true,
      data: ranking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a ranking
exports.updateRanking = async (req, res) => {
  try {
    let ranking = await Ranking.findById(req.params.id);

    if (!ranking) {
      return res.status(404).json({
        success: false,
        message: 'Ranking not found',
      });
    }

    ranking = await Ranking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: ranking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a ranking
exports.deleteRanking = async (req, res) => {
  try {
    const ranking = await Ranking.findById(req.params.id);

    if (!ranking) {
      return res.status(404).json({
        success: false,
        message: 'Ranking not found',
      });
    }

    await Ranking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Ranking deleted successfully',
      data: ranking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get top rankings by year
exports.getTopRankingsByYear = async (req, res) => {
  try {
    const { year, limit = 10 } = req.query;

    const rankings = await Ranking.find({ year: parseInt(year) })
      .populate('school_id', 'school_name country')
      .sort({ world_rank: 1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: rankings.length,
      data: rankings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};