// dependencies
import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './Title.scss';

/**
 * Title.jsx
 * Renders the title portion of the content container
 * @param {*} props 
 */
const Title = props =>
  <div className={styles.Title} >
    <h2>{props.title}</h2>
  </div>


Title.propTypes = {
  title: PropTypes.string.isRequired
}

export default Title;