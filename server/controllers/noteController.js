const Note = require('../models/note');

// GET all notes with filters
const getNotes = async (req, res) => {
  try {
    const { semester, branch, type, search } = req.query;
    let filter = {};

    if (semester) filter.semester = semester;
    if (branch) filter.branch = branch;
    if (type) filter.type = type;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
      ];
    }

    const notes = await Note.find(filter)
      .populate('uploadedBy', 'name branch semester')
      .sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single note
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate('uploadedBy', 'name branch semester');
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST upload note
const uploadNote = async (req, res) => {
  try {
    const { title, subject, semester, branch, type } = req.body;
    const fileUrl = req.file ? req.file.path : '';

    if (!fileUrl) {
      return res.status(400).json({ message: 'Please upload a PDF file' });
    }

    const note = await Note.create({
      title, subject, semester,
      branch, type, fileUrl,
      uploadedBy: req.user._id
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH increment download count
const incrementDownload = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    note.downloads += 1;
    await note.save();
    res.status(200).json({ fileUrl: note.fileUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await note.deleteOne();
    res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotes, getNoteById, uploadNote, incrementDownload, deleteNote };