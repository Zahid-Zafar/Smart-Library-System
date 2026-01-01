/**
 * Header Component
 * Displays the application header with logo and title
 * Reusable component with props for customization
 */

import PropTypes from 'prop-types';

/**
 * Header functional component
 * @param {Object} props - Component props
 * @param {string} props.title - Main title text (optional, has default)
 * @param {string} props.subtitle - Subtitle text (optional, has default)
 */
function Header({ 
  title = 'Smart Library', 
  subtitle = 'Management System' 
}) {
  return (
    <header className="header">
      <div className="header-content">
        {/* Library icon/logo */}
        <div className="logo">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="logo-icon"
          >
            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.27 5.1 7.63 12 4.18zM4 8.55l7 3.5v7.82l-7-3.5V8.55zm9 11.32v-7.82l7-3.5v7.82l-7 3.5z"/>
          </svg>
        </div>
        
        {/* Title and subtitle */}
        <div className="header-text">
          <h1 className="header-title">{title}</h1>
          <p className="header-subtitle">{subtitle}</p>
        </div>
      </div>
    </header>
  );
}

// PropTypes for type checking
Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Header;
