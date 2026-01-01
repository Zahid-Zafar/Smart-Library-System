/**
 * BookList Component
 * Displays the list of books in a card format
 * Handles loading states and empty states
 */

import PropTypes from 'prop-types';
import BookCard from './BookCard';

/**
 * BookList functional component
 * @param {Object} props - Component props
 * @param {Array} props.books - Array of book objects to display
 * @param {boolean} props.loading - Loading state indicator
 * @param {Function} props.onDeleteBook - Callback to delete a book
 * @param {Function} props.onEditBook - Callback to edit a book
 */
function BookList({ 
  books, 
  loading, 
  onDeleteBook, 
  onEditBook 
}) {
  // Show loading spinner while fetching data
  if (loading) {
    return (
      <section className="book-list-section">
        <h2 className="section-title">Available Books</h2>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading books...</p>
        </div>
      </section>
    );
  }

  // Show empty state if no books are available
  if (!books || books.length === 0) {
    return (
      <section className="book-list-section">
        <h2 className="section-title">Available Books</h2>
        <div className="empty-state">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="empty-icon"
          >
            <path d="M19 2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2zm0 14H5V5c0-.806.55-.988 1-1h13v12z"/>
          </svg>
          <h3>No Books Available</h3>
          <p>Start by adding your first book to the library.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="book-list-section">
      <div className="section-header">
        <h2 className="section-title">Available Books</h2>
        <div className="book-stats">
          <span className="stat">
            <span className="stat-number">{books.length}</span> Total Books
          </span>
        </div>
      </div>
      
      {/* Books grid container */}
      <div className="books-grid">
        {books.map(book => (
          <BookCard
            key={book._id}
            book={book}
            onDelete={onDeleteBook}
            onEdit={onEditBook}
          />
        ))}
      </div>
    </section>
  );
}

// PropTypes for type checking
BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      isbn: PropTypes.string.isRequired,
      publicationDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  onDeleteBook: PropTypes.func.isRequired,
  onEditBook: PropTypes.func.isRequired,
};

export default BookList;
