// dependencies
import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './FormContainer.scss';

/**
 * FormContainer.jsx
 * Wraps form fields in a form element with themed styling
 * @param {children} props 
 */
const FormContainer = ({ children }) =>
  <div className={styles.FormContainer}>
    {children}
  </div>

FormContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
}

export default FormContainer;