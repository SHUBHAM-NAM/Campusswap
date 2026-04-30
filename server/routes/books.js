const express = require('express');
const router = express.Router();
const { getBooks, getBookById, createBook, markAsSold, deleteBook } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');
const { uploadImage } = require('../middleware/uploadMiddleware');

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', protect, uploadImage.single('photo'), createBook);
router.patch('/:id/sold', protect, markAsSold);
router.delete('/:id', protect, deleteBook);

module.exports = router;