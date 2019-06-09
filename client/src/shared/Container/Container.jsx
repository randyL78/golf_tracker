// dependencies
import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './Container.scss';

/**
 * Container.js
 * renders the content area of the routes
 * @param {*} props 
 */
const Container = props =>
  <main className={styles.Container}>
    {props.children}
  </main>

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
}

export default Container;