/**
 * EditModal Component
 * Modal dialog for editing book information
 */

import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * EditModal functional component
 * @param {Object} props - Component props
 * @param {Object} props.book - The book being edited
 * @param {Function} props.onUpdate - Callback when update is confirmed
 * @param {Function} props.onClose - Callback to close the modal
 */
function EditModal({ book, onUpdate, onClose }) {
  // State for form inputs, pre-filled with existing book data
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    publicationDate: book.publicationDate.split('T')[0] // Format date for input
  });
  
  const [formErrors, setFormErrors] = useState({});

  /**
   * Handles input field changes
   * @param {Event} e - The input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validates the form data
   * @returns {boolean} - True if form is valid
   */
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Book title is required';
    }
    if (!formData.author.trim()) {
      errors.author = 'Author name is required';
    }
    if (!formData.isbn.trim()) {
      errors.isbn = 'ISBN number is required';
    }
    if (!formData.publicationDate) {
      errors.publicationDate = 'Publication date is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Call the update callback with the form data
    onUpdate(formData);
  };

  /**
   * Handles clicking outside the modal to close it
   * @param {Event} e - Click event
   */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal modal-edit">
        <div className="modal-header">
          <h3>Edit Book</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {/* Book Title Input */}
            <div className="form-group">
              <label htmlFor="edit-title" className="form-label">
                Book Title <span className="required">*</span>
              </label>
              <input
                type="text"
                id="edit-title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter book title"
                className={`form-input ${formErrors.title ? 'input-error' : ''}`}
              />
              {formErrors.title && <span className="error-message">{formErrors.title}</span>}
            </div>

            {/* Author Name Input */}
            <div className="form-group">
              <label htmlFor="edit-author" className="form-label">
                Author Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="edit-author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Enter author name"
                className={`form-input ${formErrors.author ? 'input-error' : ''}`}
              />
              {formErrors.author && <span className="error-message">{formErrors.author}</span>}
            </div>

            {/* ISBN Number Input */}
            <div className="form-group">
              <label htmlFor="edit-isbn" className="form-label">
                ISBN Number <span className="required">*</span>
              </label>
              <input
                type="text"
                id="edit-isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleInputChange}
                placeholder="Enter ISBN"
                className={`form-input ${formErrors.isbn ? 'input-error' : ''}`}
              />
              {formErrors.isbn && <span className="error-message">{formErrors.isbn}</span>}
            </div>

            {/* Publication Date Input */}
            <div className="form-group">
              <label htmlFor="edit-publicationDate" className="form-label">
                Publication Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="edit-publicationDate"
                name="publicationDate"
                value={formData.publicationDate}
                onChange={handleInputChange}
                className={`form-input ${formErrors.publicationDate ? 'input-error' : ''}`}
              />
              {formErrors.publicationDate && <span className="error-message">{formErrors.publicationDate}</span>}
            </div>
            
            <div className="modal-actions">
              <button type="submit" className="btn btn-primary">
                Update Book
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// PropTypes for type checking
EditModal.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    isbn: PropTypes.string.isRequired,
    publicationDate: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditModal;
