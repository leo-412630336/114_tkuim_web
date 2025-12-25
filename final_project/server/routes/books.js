const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const verifyToken = require('../middleware/auth');

// Protect all routes
router.use(verifyToken);

// GET all books (Visible to everyone)
router.get('/', async (req, res) => {
    try {
        // Return ALL books, sorted by newest. Populate borrower and createdBy info.
        const books = await Book.find()
            .sort({ createdAt: -1 })
            .populate('borrower', 'username')
            .populate('createdBy', 'username');
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single book
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate('borrower', 'username')
            .populate('createdBy', 'username');
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create book (ADMIN ONLY)
router.post('/', async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only Admins can add books' });
    }

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        createdBy: req.user.id
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update book (ADMIN ONLY)
router.put('/:id', async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only Admins can edit books' });
    }

    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (req.body.title != null) book.title = req.body.title;
        if (req.body.author != null) book.author = req.body.author;
        if (req.body.isbn != null) book.isbn = req.body.isbn;
        if (req.body.price != null) book.price = req.body.price;
        if (req.body.category != null) book.category = req.body.category;
        if (req.body.description != null) book.description = req.body.description;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE book (ADMIN ONLY)
router.delete('/:id', async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only Admins can delete books' });
    }

    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// BORROW book (Students/Admins)
router.put('/borrow/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (book.borrower) {
            return res.status(400).json({ message: 'Book is already borrowed' });
        }

        book.borrower = req.user.id;
        const updatedBook = await book.save();

        // Re-fetch to populate
        const populatedBook = await Book.findById(updatedBook._id).populate('borrower', 'username').populate('createdBy', 'username');
        res.json(populatedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// RETURN book
router.put('/return/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        // Check if user is the borrower OR if user is admin (Admin can force return)
        if (book.borrower && book.borrower.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You cannot return a book you did not borrow' });
        }

        book.borrower = null;
        const updatedBook = await book.save();

        // Re-fetch to populate
        const populatedBook = await Book.findById(updatedBook._id).populate('borrower', 'username').populate('createdBy', 'username');
        res.json(populatedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
