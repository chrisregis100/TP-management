// backend/models/TP.js
const mongoose = require('mongoose');

const TPSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  filiere: {
    type: String,
    required: true,
    trim: true
  },
  annee: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  registeredStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  price: {
    type: Number,
    default: 0
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['PLANNED', 'ONGOING', 'COMPLETED'],
    default: 'PLANNED'
  }
}, { timestamps: true });

TPSchema.methods.isFullyBooked = function() {
  return this.registeredStudents.length >= this.capacity;
};

module.exports = mongoose.model('TP', TPSchema);