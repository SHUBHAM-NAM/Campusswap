const express = require('express');
const router = express.Router();
const { getChatHistory, saveMessage, getBuyersForBook } = require('../controllers/chatController');
const { protect } = require('../middleware/authmiddleware');

router.get('/book/:bookId/buyers', protect, getBuyersForBook);
router.get('/:roomId', protect, getChatHistory);
router.post('/', protect, saveMessage);

module.exports = router;
