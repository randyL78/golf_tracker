// dependencies
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// components
import { Logo, Navigation, Title, Loading } from '../../shared/Layout';
import { Button, LinkButton } from '../../shared/Buttons/Button';
import Container, { ButtonContainer, FormContainer } from '../../shared/Containers/Container';

// styles
import styles from './CourseDisplay.scss';

/**
 * CourseDisplay.jsx
 * Component for displaying a single course
 */
class CourseDisplay extends PureComponent {

  componentDidMount = () => {
    const { courseSlug, setCourse, isLoading } = this.props;

    if (!isLoading)
      setCourse(courseSlug);
  }

  componentDidUpdate = (prevProps) => {
    // only update the component if the course name of the loading status changes
    if (prevProps.courseSlug !== this.props.courseSlug ||
      prevProps.isLoading !== this.props.isLoading) {
      const { courseSlug, setCourse } = this.props;

      setCourse(courseSlug);
    }
  }


  render = () => {
    const { course, courseSlug, screenSize, isLoading, handleDeleteCourse, history } = this.props
    return (
      <div className={styles.CourseDisplay}>
        <Logo inline={true} />
        <Navigation showMenu={screenSize !== 'large'} />
        <Container >
          <Title title="Course" />
          {
            isLoading ?
              <Loading />
              :
              course
                ?
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
                :
                <FormContainer>
                  <h3>Course Not Found</h3>
                </FormContainer>
          }

          <ButtonContainer>
            <Button
              text="Delete"
              style="Warning"
              handleOnClick={() => handleDeleteCourse(courseSlug, history)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
            <LinkButton to="/courses" style="Info" text="Cancel" >
              <FontAwesomeIcon icon={faBan} />
            </LinkButton>
            <LinkButton
              text="Edit"
              to={`/courses/${courseSlug}/edit`}
            >
              <FontAwesomeIcon icon={faSave} />
            </LinkButton>
          </ButtonContainer>
        </Container>
      </div>
    )
  }
}

CourseDisplay.defaultProps = {
  isLoading: true
}

export default CourseDisplay;