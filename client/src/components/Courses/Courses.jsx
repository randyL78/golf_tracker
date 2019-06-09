// dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// components
import ButtonContainer from '../../shared/Containers/ButtonContainer';
import Container from '../../shared/Containers/Container';
import Logo from '../../shared/Logo/Logo';
import Navigation from '../../shared/Navigation/Navigation';
import Title from '../../shared/Title/Title';
import Row from './CourseRow';
import RowContainer from '../../shared/Containers/Row.Container';

// styles
import styles from './Courses.scss';



/**
 * Courses.js
 * Displays a list of Course information
 * @param {screenSize, courses, handleDeleteCourse} props 
 */
const Courses = ({ screenSize, courses, handleDeleteCourse }) =>
  <div>
    <Logo inline={true} />
    <Navigation showMenu={screenSize !== 'large'} />
    <Container >
      <Title title="Courses" />
      <RowContainer className={styles.rowContainer}>
        {
          courses.map(({ id, name, city, state }) =>
            <Row
              key={id}
              id={id}
              name={name}
              city={city}
              state={state}
              handleDeleteCourse={handleDeleteCourse} />
          )
        }
      </RowContainer>
      <ButtonContainer>
        <Link to="/courses/new" className={styles.new}>New</Link>
      </ButtonContainer>
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