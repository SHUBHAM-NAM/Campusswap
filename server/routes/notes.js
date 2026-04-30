const express = require('express');
const router = express.Router();
const {
  getNotes, getNoteById,
  uploadNote, incrementDownload, deleteNote
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');
const { uploadPDF } = require('../middleware/uploadMiddleware');

router.get('/', getNotes);
router.get('/:id', getNoteById);
router.post('/', protect, uploadPDF.single('file'), uploadNote);
router.patch('/:id/download', incrementDownload);
router.delete('/:id', protect, deleteNote);

module.exports = router;