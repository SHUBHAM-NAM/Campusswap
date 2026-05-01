const Chat = require('../models/Chat');

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

module.exports = { getChatHistory, saveMessage };