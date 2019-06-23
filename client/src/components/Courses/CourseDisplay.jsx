// dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// components
import { Logo, Navigation, Title } from '../../shared/Layout';
import { Button, LinkButton } from '../../shared/Buttons/Button';
import Container, { ButtonContainer, FormContainer } from '../../shared/Containers/Container';

// styles
import styles from './CourseDisplay.scss';

/**
 * CourseDisplay.jsx
 * Component for displaying a single course
 */
const CourseDisplay = ({ course, screenSize, handleDeleteCourse, history }) =>
  <div className={styles.CourseDisplay}>
    <Logo inline={true} />
    <Navigation showMenu={screenSize !== 'large'} />
    <Container >
      <Title title="Course" />
      <FormContainer>
        <label >
          <span>Course Name </span>
          <input
            disabled
            name="name"
            value={course.name}
          />
        </label>
        <label >
          <span>Address</span>
          <input
            disabled
            name="address"
            value={course.address}
          />
        </label>
        <label >
          <span>City</span>
          <input
            disabled
            name="city"
            value={course.city}
          />
        </label>
        <label >
          <span>State</span>
          <input
            disabled
            name="state"
            value={course.state}
          />

        </label>
        <label >
          <span>ZipCode</span>
          <input
            disabled
            name="zip"
            value={course.zip}
          />
        </label>
      </FormContainer>
      <ButtonContainer>
        <Button
          text="Delete"
          style="Warning"
          handleOnClick={() => handleDeleteCourse(course.slug, history)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
        <LinkButton to="/courses" style="Info" text="Cancel" >
          <FontAwesomeIcon icon={faBan} />
        </LinkButton>
        <LinkButton
          text="Edit"
          to={`/courses/${course.slug}/edit`}
        >
          <FontAwesomeIcon icon={faSave} />
        </LinkButton>
      </ButtonContainer>
    </Container>
  </div>

export default CourseDisplay;