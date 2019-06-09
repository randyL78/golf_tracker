// dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// styles
import styles from './Row.scss';

const Row = ({ name, city, state }) =>
  <p className={styles.Row}>
    <span className={styles.name}>{name}</span>
    <span className={styles.city}>{city}</span>
    <span className={styles.state}>{state}</span>
    <button className={styles.delete}>
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  </p>

export default Row;