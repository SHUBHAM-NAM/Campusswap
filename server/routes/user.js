const express = require('express');
const router = express.Router();
const {
  getProfile, updateProfile,
  getMyBooks, getMyNotes
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/my-books', protect, getMyBooks);
router.get('/my-notes', protect, getMyNotes);

module.exports = router;