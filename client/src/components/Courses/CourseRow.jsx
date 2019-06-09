// dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// styles
import styles from './CourseRow.scss';

/**
 * CourseRow
 * Displays the basic information of a single course
 * @param { id, name, city, state, handleDeleteCourse } props
 */
const Row = ({ id, name, city, state, handleDeleteCourse }) =>
  <p className={styles.Row}>
    <Link to={`/courses/${id}`} className={styles.name}>{name}</Link>
    <Link to={`/courses/${id}`} className={styles.city}>{city}</Link>
    <Link to={`/courses/${id}`} className={styles.state}>{state}</Link>
    <button className={styles.delete} onClick={() => handleDeleteCourse(id)} >
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  </p>

Row.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string,
  state: PropTypes.string,
  handleDeleteCourse: PropTypes.func.isRequired
}

export default Row;