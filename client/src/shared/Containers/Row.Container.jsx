// dependencies
import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './RowContainer.scss';

/**
 * RowContainer.jsx
 * renders a consistent flex container for displaying a list of Row components
 * @param {children} props 
 */
const RowContainer = ({ children }) =>
  <div className={styles.RowContainer}>
    {children}
  </div>

RowContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
}

export default RowContainer;