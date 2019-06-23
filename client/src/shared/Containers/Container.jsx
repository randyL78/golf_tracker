// dependencies
import React from 'react';
import PropTypes from 'prop-types';

// other container components
import ButtonContainer from './ButtonContainer';
import FormContainer from './FormContainer';
import RowContainer from './Row.Container';

// styles
import styles from './Container.scss';

/**
 * Container.js
 * renders the content area of the routes
 * @param {children} props 
 */
const Container = ({ children }) =>
  <main className={styles.Container}>
    {children}
  </main>

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
}

export default Container;

export { ButtonContainer, FormContainer, RowContainer };