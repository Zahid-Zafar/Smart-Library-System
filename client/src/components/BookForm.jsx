/**
 * BookForm Component
 * Handles the creation of new book entries
 * Contains input fields for title, author, ISBN, and publication date
 */

import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * BookForm functional component
 * @param {Object} props - Component props
 * @param {Function} props.onAddBook - Callback function to add a new book
 */
function BookForm({ onAddBook }) {
  // State for form inputs using useState hook
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publicationDate: ''
  });
  
  // State for form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for form validation errors
  const [formErrors, setFormErrors] = useState({});

  /**
   * Handles input field changes
   * Updates the corresponding field in formData state
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
   * @returns {boolean} - True if form is valid, false otherwise
   */
  const validateForm = () => {
    const errors = {};
    
    // Validate title
    if (!formData.title.trim()) {
      errors.title = 'Book title is required';
    }
    
    // Validate author
    if (!formData.author.trim()) {
      errors.author = 'Author name is required';
    }
    
    // Validate ISBN
    if (!formData.isbn.trim()) {
      errors.isbn = 'ISBN number is required';
    }
    
    // Validate publication date
    if (!formData.publicationDate) {
      errors.publicationDate = 'Publication date is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handles form submission
   * Validates data and calls the onAddBook callback
   * @param {Event} e - The form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Call the parent's add book function
    const result = await onAddBook(formData);
    
    if (result.success) {
      // Clear form on successful submission
      setFormData({
        title: '',
        author: '',
        isbn: '',
        publicationDate: ''
      });
    }
    
    setIsSubmitting(false);
  };

  /**
   * Resets the form to initial state
   */
  const handleReset = () => {
    setFormData({
      title: '',
      author: '',
      isbn: '',
      publicationDate: ''
    });
    setFormErrors({});
  };

  return (
    <section className="form-section">
      <h2 className="section-title">Add New Book</h2>
      
      <form onSubmit={handleSubmit} className="book-form">
        {/* Book Title Input */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Book Title <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter book title"
            className={`form-input ${formErrors.title ? 'input-error' : ''}`}
            disabled={isSubmitting}
          />
          {formErrors.title && (
            <span className="error-message">{formErrors.title}</span>
          )}
        </div>

        {/* Author Name Input */}
        <div className="form-group">
          <label htmlFor="author" className="form-label">
            Author Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="Enter author name"
            className={`form-input ${formErrors.author ? 'input-error' : ''}`}
            disabled={isSubmitting}
          />
          {formErrors.author && (
            <span className="error-message">{formErrors.author}</span>
          )}
        </div>

        {/* ISBN Number Input */}
        <div className="form-group">
          <label htmlFor="isbn" className="form-label">
            ISBN Number <span className="required">*</span>
          </label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleInputChange}
            placeholder="Enter ISBN (e.g., 978-3-16-148410-0)"
            className={`form-input ${formErrors.isbn ? 'input-error' : ''}`}
            disabled={isSubmitting}
          />
          {formErrors.isbn && (
            <span className="error-message">{formErrors.isbn}</span>
          )}
        </div>

        {/* Publication Date Input */}
        <div className="form-group">
          <label htmlFor="publicationDate" className="form-label">
            Publication Date <span className="required">*</span>
          </label>
          <input
            type="date"
            id="publicationDate"
            name="publicationDate"
            value={formData.publicationDate}
            onChange={handleInputChange}
            className={`form-input ${formErrors.publicationDate ? 'input-error' : ''}`}
            disabled={isSubmitting}
          />
          {formErrors.publicationDate && (
            <span className="error-message">{formErrors.publicationDate}</span>
          )}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Book'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}

// PropTypes for type checking
BookForm.propTypes = {
  onAddBook: PropTypes.func.isRequired,
};

export default BookForm;
