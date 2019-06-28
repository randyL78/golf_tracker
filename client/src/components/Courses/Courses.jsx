// dependencies
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// components
import { LinkButton } from "../../shared/Buttons/Button";
import { Logo, Navigation, Title, Loading } from '../../shared/Layout';
import Container, { ButtonContainer, RowContainer } from '../../shared/Containers/Container';

// other course components
import CourseAddHoles from './CourseAddHoles';
import CourseDisplay from './CourseDisplay';
import CourseNew from './CourseNew';

// styles
import styles from './Courses.scss';

/**
 * Courses.js
 * Displays a list of Course information
 * @param {screenSize, courses, handleDeleteCourse} props 
 */
class Courses extends PureComponent {

  render = () => {
    const { screenSize, courses, handleDeleteCourse, isLoading } = this.props;
    return (
      <div className={styles.Courses}>
        <Logo inline={true} />
        <Navigation showMenu={screenSize !== 'large'} />
        <Container >
          <Title title="Courses" />
          <RowContainer className={styles.rowContainer}>
            {
              isLoading               // ternary condition 1
                ?
                <Loading />
                :
                courses.length > 0    // ternary condition 2
                  ?
                  courses.map(course =>
                    <CourseRow
                      key={course['_id']}
                      id={course['_id']}
                      slug={course.slug}
                      name={course.name}
                      city={course.city}
                      state={course.state}
                      handleDeleteCourse={handleDeleteCourse} />
                  )
                  :
                  <h3>No Course Information Available</h3>
            }
          </RowContainer>
          <ButtonContainer>
            <LinkButton to="/courses/new" text="New" >
              <FontAwesomeIcon icon={faPlusSquare} />
            </LinkButton>
          </ButtonContainer>
        </Container>
      </div>
    )
  };
}
Courses.propTypes = {
  screenSize: PropTypes.oneOf(['small', 'medium', 'large']),
  courses: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string,
      state: PropTypes.string,
    })),
    PropTypes.array
  ])
  ,
  handleDeleteCourse: PropTypes.func.isRequired
}


export default Courses;

export { CourseAddHoles, CourseDisplay, CourseNew };


/**
 * CourseRow
 * Displays the basic information of a single course
 * @param { id, name, city, state, handleDeleteCourse } props
 */
const CourseRow = ({ id, slug, name, city, state, handleDeleteCourse }) =>
  <p className={styles.CourseRow}>
    <Link to={`/courses/${slug}`} className={styles.name}>{name}</Link>
    <Link to={`/courses/${slug}`} className={styles.city}>{city}</Link>
    <Link to={`/courses/${slug}`} className={styles.state}>{state}</Link>
    <button className={styles.delete} onClick={() => handleDeleteCourse(slug)} >
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  </p>

CourseRow.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  city: PropTypes.string,
  state: PropTypes.string,
  handleDeleteCourse: PropTypes.func.isRequired
}
