// dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

// components
import { LinkButton } from "../../shared/Buttons/Button";
import { Logo, Navigation, Title } from '../../shared/Layout';
import Row from './CourseRow';
import Container, { ButtonContainer, RowContainer } from '../../shared/Containers/Container';

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
          courses.map(({ id, slug, name, city, state }) =>
            <Row
              key={id}
              id={id}
              slug={slug}
              name={name}
              city={city}
              state={state}
              handleDeleteCourse={handleDeleteCourse} />
          )
        }
      </RowContainer>
      <ButtonContainer>
        <LinkButton to="/courses/new" text="New" >
          <FontAwesomeIcon icon={faPlusSquare} />
        </LinkButton>
      </ButtonContainer>
    </Container>
  </div>

Courses.propTypes = {
  screenSize: PropTypes.oneOf(['small', 'medium', 'large']),
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string,
    state: PropTypes.string,
  })),
  handleDeleteCourse: PropTypes.func.isRequired
}

export default Courses;