/**
 * Book Model
 * Defines the MongoDB schema for books in the library system
 */

const mongoose = require('mongoose');

/**
 * Book Schema Definition
 * Contains fields for title, author, ISBN, and publication date
 * All fields are required for data integrity
 */
const bookSchema = new mongoose.Schema({
    // Title of the book - required field
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true
    },
    // Author's name - required field
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true
    },
    // ISBN number - required and unique identifier for books
    isbn: {
        type: String,
        required: [true, 'ISBN number is required'],
        trim: true,
        unique: true
    },
    // Publication date of the book
    publicationDate: {
        type: Date,
        required: [true, 'Publication date is required']
    }
}, {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true
});

// Create and export the Book model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
