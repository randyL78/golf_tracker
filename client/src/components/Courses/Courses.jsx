// dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// components
import Container from '../../shared/Container/Container';
import Logo from '../../shared/Logo/Logo';
import Navigation from '../../shared/Navigation/Navigation';
import Title from '../../shared/Title/Title';
import Row from './CourseRow';

// styles
import styles from './Courses.scss';



/**
 * Courses.js
 * Displays a list of Course information
 * @param {*} props 
 */
const Courses = props =>
  <div>
    <Logo inline={true} />
    <Navigation showMenu={props.screenSize !== 'large'} />
    <Container >
      {
        <div className={styles.Courses}>
          <Title title="Courses" />
          <div className={styles.rowContainer}>
            {
              props.courses.map(({ id, name, city, state }) =>
                <Row
                  key={id}
                  id={id}
                  name={name}
                  city={city}
                  state={state}
                  handleDeleteCourse={props.handleDeleteCourse} />
              )
            }
          </div>
          <div className={styles.buttonContainer}>
            <Link to="/courses/new" className={styles.new}>New</Link>
          </div>
        </div>
      }
    </Container>
  </div>

Courses.propTypes = {
  screenSize: PropTypes.oneOf(['small', 'medium', 'large']),
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string,
    state: PropTypes.string,
  })),
  handleDeleteCourse: PropTypes.func.isRequired
}

export default Courses;