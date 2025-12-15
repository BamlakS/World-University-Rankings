const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema(
  {
    school_name: {
      type: String,
      required: [true, 'Please add a school name'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Please add a country'],
      trim: true,
    },
    description: {
      type: String,
      default: 'No description provided',
    },
    website: {
      type: String,
      default: '',
    },
    founded_year: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Connect to existing collection
SchoolSchema.set('collection', 'school');

const School = mongoose.model('School', SchoolSchema);

module.exports = School;