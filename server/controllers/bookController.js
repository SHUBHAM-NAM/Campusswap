const Book = require('../models/book');

// GET all books with filters
const getBooks = async (req, res) => {
  try {
    const { semester, branch, condition, search } = req.query;
    let filter = { status: 'available' };

    if (semester) filter.semester = semester;
    if (branch) filter.branch = branch;
    if (condition) filter.condition = condition;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }

    const books = await Book.find(filter)
      .populate('seller', 'name phone email branch semester')
      .sort({ createdAt: -1 });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single book
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('seller', 'name phone email branch semester');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create book listing
const createBook = async (req, res) => {
  try {
    const { title, author, subject, semester, branch, price, condition, description } = req.body;
    const photo = req.file ? req.file.path : '';

    const book = await Book.create({
      title, author, subject, semester,
      branch, price, condition, description,
      photo, seller: req.user._id
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH mark as sold
const markAsSold = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    book.status = 'sold';
    await book.save();
    res.status(200).json({ message: 'Marked as sold' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await book.deleteOne();
    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBooks, getBookById, createBook, markAsSold, deleteBook };