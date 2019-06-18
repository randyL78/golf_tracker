// dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faEye } from '@fortawesome/free-solid-svg-icons';

// components
import Container, { FormContainer, ButtonContainer } from '../../shared/Containers/Container';
import { Title, Logo, Navigation } from '../../shared/Layout';
import { LinkButton, Button } from '../../shared/Buttons/Button';

// styles
import styles from './RoundStart.scss';


/**
 * RoundStart.js
 * Starts a new round of golf
 * @param {*} props 
 */
const RoundStart = ({ screenSize, courses, handleStartRound, history }) => {
  let selectField;
  return (
    <div className={styles.RoundStart}>
      <Logo inline={true} />
      <Navigation showMenu={screenSize !== 'large'} />
      <Container >
        <Title title="Start a New Round" />
        <FormContainer>
          <label>
            <span>Select Your Course</span>
            <select ref={field => { selectField = field }}>
              <option value="" disabled>Please select one</option>
              {
                courses.map(course =>
                  <option key={course.id} value={course.slug}>
                    {course.name}
                  </option>
                )
              }

            </select>
          </label>
        </FormContainer>
        <ButtonContainer>
          <LinkButton to="/rounds" style="Info" text="View All">
            <FontAwesomeIcon icon={faEye} />
          </LinkButton>
          <Button text="Start" handleOnClick={() => { handleStartRound(selectField.value, history) }}>
            <FontAwesomeIcon icon={faPlayCircle} />
          </Button>
        </ButtonContainer>
      </Container>
    </div>
  )
};


RoundStart.propTypes = {
  screenSize: PropTypes.oneOf(['small', 'medium', 'large']),
  courses: PropTypes.array.isRequired
}

export default RoundStart;