/**
 * App Component
 * Main application component that serves as the root of the component tree
 * Manages global state and renders the main layout
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import EditModal from './components/EditModal';
import { getBooks, addBook, deleteBook, updateBook } from './services/api';
import './App.css';

function App() {
  // State for managing the list of books
  const [books, setBooks] = useState([]);
  
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  
  // State for error messages
  const [error, setError] = useState(null);
  
  // State for success messages
  const [successMessage, setSuccessMessage] = useState(null);
  
  // State for edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  /**
   * useEffect hook to fetch books on component mount
   * Runs once when the component first renders
   */
  useEffect(() => {
    fetchBooks();
  }, []);

  /**
   * Fetches all books from the backend API
   * Updates the books state with the retrieved data
   */
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getBooks();
      setBooks(response.data.data);
    } catch (err) {
      // Display user-friendly error message
      setError('Failed to load books. Please check your connection and try again.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles adding a new book
   * @param {Object} bookData - The book data to add
   */
  const handleAddBook = async (bookData) => {
    try {
      setError(null);
      const response = await addBook(bookData);
      
      // Add the new book to the beginning of the list
      setBooks(prevBooks => [response.data.data, ...prevBooks]);
      
      // Show success message
      showSuccessMessage('Book added successfully!');
      return { success: true };
    } catch (err) {
      // Display user-friendly error message
      const errorMessage = err.response?.data?.message || 'Failed to add book. Please try again.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  /**
   * Handles deleting a book
   * @param {string} id - The ID of the book to delete
   */
  const handleDeleteBook = async (id) => {
    try {
      setError(null);
      await deleteBook(id);
      
      // Remove the book from the list
      setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
      
      // Show success message
      showSuccessMessage('Book deleted successfully!');
    } catch (err) {
      // Display user-friendly error message
      setError('Failed to delete book. Please try again.');
      console.error('Error deleting book:', err);
    }
  };

  /**
   * Opens the edit modal for a specific book
   * @param {Object} book - The book to edit
   */
  const handleOpenEditModal = (book) => {
    setSelectedBook(book);
    setEditModalOpen(true);
  };

  /**
   * Handles updating a book
   * @param {Object} bookData - Updated book data
   */
  const handleUpdateBook = async (bookData) => {
    try {
      setError(null);
      const response = await updateBook(selectedBook._id, bookData);
      
      // Update the book in the list
      setBooks(prevBooks => 
        prevBooks.map(book => 
          book._id === selectedBook._id ? response.data.data : book
        )
      );
      
      setEditModalOpen(false);
      setSelectedBook(null);
      showSuccessMessage('Book updated successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update book. Please try again.';
      setError(errorMessage);
    }
  };

  /**
   * Shows a success message that auto-dismisses after 3 seconds
   * @param {string} message - The success message to display
   */
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  /**
   * Clears the error message
   */
  const clearError = () => setError(null);

  return (
    <div className="app">
      {/* Header component with app title */}
      <Header />
      
      <main className="main-content">
        {/* Display error message if present */}
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
            <button onClick={clearError} className="alert-close">&times;</button>
          </div>
        )}
        
        {/* Display success message if present */}
        {successMessage && (
          <div className="alert alert-success">
            <span>{successMessage}</span>
          </div>
        )}
        
        {/* Book entry form component */}
        <BookForm onAddBook={handleAddBook} />
        
        {/* Book list component */}
        <BookList 
          books={books}
          loading={loading}
          onDeleteBook={handleDeleteBook}
          onEditBook={handleOpenEditModal}
        />
        
        {/* Edit modal */}
        {editModalOpen && (
          <EditModal
            book={selectedBook}
            onUpdate={handleUpdateBook}
            onClose={() => {
              setEditModalOpen(false);
              setSelectedBook(null);
            }}
          />
        )}
      </main>
      
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Smart Library Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
