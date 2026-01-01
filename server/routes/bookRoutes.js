/**
 * Book Routes
 * RESTful API endpoints for book management operations
 * Handles GET, POST, DELETE, and PUT requests for books
 */

const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

/**
 * GET /api/books
 * Retrieves all books from the database
 * Returns books sorted by creation date (newest first)
 */
router.get('/', async (req, res) => {
    try {
        // Fetch all books and sort by most recently added
        const books = await Book.find().sort({ createdAt: -1 });
        
        // Return successful response with books array
        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        // Handle database errors
        console.error('Error fetching books:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve books. Please try again later.'
        });
    }
});

/**
 * GET /api/books/:id
 * Retrieves a single book by its ID
 */
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        
        // Check if book exists
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        console.error('Error fetching book:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve book. Please try again later.'
        });
    }
});

/**
 * POST /api/books
 * Adds a new book to the database
 * Required fields: title, author, isbn, publicationDate
 */
router.post('/', async (req, res) => {
    try {
        // Destructure book data from request body
        const { title, author, isbn, publicationDate } = req.body;
        
        // Validate required fields
        if (!title || !author || !isbn || !publicationDate) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: title, author, ISBN, and publication date'
            });
        }
        
        // Check if book with same ISBN already exists
        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
            return res.status(400).json({
                success: false,
                message: 'A book with this ISBN already exists'
            });
        }
        
        // Create new book document
        const book = await Book.create({
            title,
            author,
            isbn,
            publicationDate
        });
        
        // Return success response with created book
        res.status(201).json({
            success: true,
            message: 'Book added successfully',
            data: book
        });
    } catch (error) {
        console.error('Error adding book:', error.message);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }
        
        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'A book with this ISBN already exists'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Failed to add book. Please try again later.'
        });
    }
});

/**
 * DELETE /api/books/:id
 * Deletes a book by its ID
 */
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        
        // Check if book exists
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        // Delete the book
        await Book.findByIdAndDelete(req.params.id);
        
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting book:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to delete book. Please try again later.'
        });
    }
});

/**
 * PUT /api/books/:id
 * Updates an existing book by its ID
 */
router.put('/:id', async (req, res) => {
    try {
        const { title, author, isbn, publicationDate } = req.body;
        
        // Validate required fields
        if (!title || !author || !isbn || !publicationDate) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: title, author, ISBN, and publication date'
            });
        }
        
        const book = await Book.findById(req.params.id);
        
        // Check if book exists
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        // Check if ISBN is being changed and if new ISBN already exists
        if (isbn !== book.isbn) {
            const existingBook = await Book.findOne({ isbn });
            if (existingBook) {
                return res.status(400).json({
                    success: false,
                    message: 'A book with this ISBN already exists'
                });
            }
        }
        
        // Update book fields
        book.title = title;
        book.author = author;
        book.isbn = isbn;
        book.publicationDate = publicationDate;
        await book.save();
        
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: book
        });
    } catch (error) {
        console.error('Error updating book:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to update book. Please try again later.'
        });
    }
});

module.exports = router;
