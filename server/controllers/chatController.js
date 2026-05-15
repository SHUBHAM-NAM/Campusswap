const Chat = require('../models/Chat');
const User = require('../models/user');

// GET chat history for a room
const getChatHistory = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Chat.find({ roomId })
      .populate('sender', 'name')
      .sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST save message to DB
const saveMessage = async (req, res) => {
  try {
    const { roomId, message, senderName, bookId } = req.body;
    const chat = await Chat.create({
      roomId,
      sender: req.user._id,
      senderName,
      message,
      bookId
    });
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all unique buyers who chatted about a specific book
const getBuyersForBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const sellerId = req.user._id.toString();

    // Find all unique roomIds for this book
    const roomIds = await Chat.find({ bookId }).distinct('roomId');

    // Extract buyer IDs from roomIds
    const buyerIds = [];
    roomIds.forEach(roomId => {
      const ids = roomId.split('_');
      ids.forEach(id => {
        if (id !== sellerId && !buyerIds.includes(id)) {
          buyerIds.push(id);
        }
      });
    });

    // Get buyer details
    const buyers = await User.find({
      _id: { $in: buyerIds }
    }).select('name email branch semester phone');

    res.status(200).json(buyers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getChatHistory, saveMessage, getBuyersForBook };
