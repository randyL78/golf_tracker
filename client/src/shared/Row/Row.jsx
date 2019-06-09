// dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// styles
import styles from './Row.scss';

const Row = props =>
  <p className={styles.Row}>
    <span className={styles.name}>Poplar Forest</span>
    <span className={styles.city}>Lynchburg</span>
    <span className={styles.state}>VA</span>
    <button className={styles.delete}>
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  </p>

export default Row;