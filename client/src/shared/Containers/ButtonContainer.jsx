// dependencies
import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './ButtonContainer.scss';

/**
 * ButtonContainer.jsx
 * renders a consistent flex container for displaying a row of buttons
 * @param {children} props 
 */
const ButtonContainer = ({ children }) =>
  <main className={styles.ButtonContainer}>
    {children}
  </main>

ButtonContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
}

export default ButtonContainer;