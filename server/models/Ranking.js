// const mongoose = require('mongoose');

// const RankingSchema = new mongoose.Schema(
//   {
//     world_rank: {
//       type: String,
//       required: [true, 'Please add a world rank'],
//     },
//     university_name: {
//       type: String,
//       required: [true, 'Please add a university name'],
//       trim: true,
//     },
//     country: {
//       type: String,
//       required: [true, 'Please add a country'],
//       trim: true,
//     },
//     teaching: {
//       type: Number,
//       default: null,
//     },
//     international: {
//       type: Number,
//       default: null,
//     },
//     research: {
//       type: Number,
//       default: null,
//     },
//     citations: {
//       type: Number,
//       default: null,
//     },
//     income: {
//       type: Number,
//       default: null,
//     },
//     total_score: {
//       type: Number,
//       default: null,
//     },
//     num_students: {
//       type: String,
//       default: null,
//     },
//     student_staff_ratio: {
//       type: Number,
//       default: null,
//     },
//     international_students: {
//       type: String,
//       default: null,
//     },
//     year: {
//       type: Number,
//       required: [true, 'Please add a year'],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Connect to existing collection
// RankingSchema.set('collection', 'timesData');

// const Ranking = mongoose.model('Ranking', RankingSchema);

// module.exports = Ranking;
const mongoose = require('mongoose');

const RankingSchema = new mongoose.Schema(
  {
    world_rank: String,
    university_name: String,
    country: String,
    teaching: Number,
    international: Number,
    research: Number,
    citations: Number,
    income: Number,
    total_score: Number,
    num_students: String,
    student_staff_ratio: Number,
    international_students: String,
    year: Number,
  },
  {
    collection: 'timesData'
  }
);

module.exports = mongoose.model('Ranking', RankingSchema);