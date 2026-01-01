/**
 * API Service
 * Handles all HTTP requests to the backend API
 * Uses axios for making HTTP requests
 */

import axios from 'axios';

// Base URL for API requests
// In development, this points to the local backend server
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetches all books from the database
 * @returns {Promise} - Promise resolving to the list of books
 */
export const getBooks = async () => {
  return await api.get('/books');
};

/**
 * Fetches a single book by ID
 * @param {string} id - The book ID
 * @returns {Promise} - Promise resolving to the book data
 */
export const getBookById = async (id) => {
  return await api.get(`/books/${id}`);
};

/**
 * Adds a new book to the database
 * @param {Object} bookData - The book data to add
 * @param {string} bookData.title - Book title
 * @param {string} bookData.author - Author name
 * @param {string} bookData.isbn - ISBN number
 * @param {string} bookData.publicationDate - Publication date
 * @returns {Promise} - Promise resolving to the created book
 */
export const addBook = async (bookData) => {
  return await api.post('/books', bookData);
};

/**
 * Deletes a book by ID
 * @param {string} id - The book ID to delete
 * @returns {Promise} - Promise resolving to the deletion confirmation
 */
export const deleteBook = async (id) => {
  return await api.delete(`/books/${id}`);
};

/**
 * Updates a book by ID
 * @param {string} id - The book ID to update
 * @param {Object} bookData - The updated book data
 * @returns {Promise} - Promise resolving to the updated book
 */
export const updateBook = async (id, bookData) => {
  return await api.put(`/books/${id}`, bookData);
};

export default api;
