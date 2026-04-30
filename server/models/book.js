const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  condition: {
    type: String,
    enum: ['Good', 'Fair', 'Poor'],
    required: true
  },
  description: {
    type: String
  },
  photo: {
    type: String,
    default: ''
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'sold'],
    default: 'available'
  }
}, { timestamps: true });

module.exports = mongoose.model('book', bookSchema);