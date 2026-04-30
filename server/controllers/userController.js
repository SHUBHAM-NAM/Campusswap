const User = require('../models/user');
const Book = require('../models/book');
const Note = require('../models/note');

// GET my profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, branch, semester } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, branch, semester },
      { new: true }
    ).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET my book listings
const getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ seller: req.user._id })
      .sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET my uploaded notes
const getMyNotes = async (req, res) => {
  try {
    const notes = await Note.find({ uploadedBy: req.user._id })
      .sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile, updateProfile, getMyBooks, getMyNotes };