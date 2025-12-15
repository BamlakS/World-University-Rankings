// const express = require('express');
// const router = express.Router();
// const {
//   getAllRankings,
//   getRankingById,
//   getRankingsBySchool,
//   getRankingsByYear,
//   createRanking,
//   updateRanking,
//   deleteRanking,
//   getTopRankingsByYear,
// } = require('../controllers/rankingController');

// // Routes
// router.get('/', getAllRankings);
// router.get('/top', getTopRankingsByYear);
// router.get('/year/:year', getRankingsByYear);
// router.get('/school/:schoolId', getRankingsBySchool);
// router.get('/:id', getRankingById);
// router.post('/', createRanking);
// router.put('/:id', updateRanking);
// router.delete('/:id', deleteRanking);

// module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getAllRankings,
  getRankingById,
  getRankingsBySchool,
  getRankingsByYear,
  createRanking,
  updateRanking,
  deleteRanking,
  getTopRankingsByYear,
} = require('../controllers/rankingController');

// Routes
router.get('/', getAllRankings);
router.get('/top', getTopRankingsByYear);
router.get('/year/:year', getRankingsByYear);
router.get('/school/:schoolId', getRankingsBySchool);
router.get('/:id', getRankingById);
router.post('/', createRanking);
router.put('/:id', updateRanking);
router.delete('/:id', deleteRanking);

module.exports = router;