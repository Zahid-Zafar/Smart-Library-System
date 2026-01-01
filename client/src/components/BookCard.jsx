/**
 * BookCard Component
 * Displays individual book information in a card format
 * Includes edit and delete functionality
 */

import PropTypes from 'prop-types';

/**
 * BookCard functional component
 * @param {Object} props - Component props
 * @param {Object} props.book - Book object with details
 * @param {Function} props.onDelete - Callback to delete the book
 * @param {Function} props.onEdit - Callback to edit the book
 */
function BookCard({ book, onDelete, onEdit }) {
  /**
   * Formats the publication date for display
   * @param {string} dateString - ISO date string
   * @returns {string} - Formatted date string
   */
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  /**
   * Handles the delete button click
   * Shows confirmation before deleting
   */
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      onDelete(book._id);
    }
  };

  /**
   * Handles the edit button click
   */
  const handleEdit = () => {
    onEdit(book);
  };

  return (
    <article className="book-card">
      {/* Book Information */}
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        
        <div className="book-details">
          <p className="book-author">
            <span className="label">Author:</span>
            <span className="value">{book.author}</span>
          </p>
          
          <p className="book-isbn">
            <span className="label">ISBN:</span>
            <span className="value">{book.isbn}</span>
          </p>
          
          <p className="book-date">
            <span className="label">Published:</span>
            <span className="value">{formatDate(book.publicationDate)}</span>
          </p>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="book-actions">
        <button 
          className="btn btn-edit"
          onClick={handleEdit}
          title="Edit this book"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="btn-icon">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
          Edit
        </button>
        
        <button 
          className="btn btn-delete"
          onClick={handleDelete}
          title="Delete this book"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="btn-icon">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
          Delete
        </button>
      </div>
    </article>
  );
}

// PropTypes for type checking
BookCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    isbn: PropTypes.string.isRequired,
    publicationDate: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default BookCard;
