// dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faEye } from '@fortawesome/free-solid-svg-icons';

// components
import Container, { FormContainer, ButtonContainer } from '../../shared/Containers/Container';
import Logo from '../../shared/Logo/Logo';
import Navigation from '../../shared/Navigation/Navigation';
import { Title } from '../../shared/Layout';
import { LinkButton, Button } from '../../shared/Buttons/Button';

// styles
import styles from './StartRound.scss';


/**
 * Rounds.js
 * Displays a users Rounds or starts a new round of golf
 * @param {*} props 
 */
const Rounds = ({ screenSize, courses, handleStartRound, history }) => {
  let selectField;
  return (
    <div className={styles.StartRound}>
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
                  <option key={course.id} value={course.id}>
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


Rounds.propTypes = {
  screenSize: PropTypes.oneOf(['small', 'medium', 'large']),
  courses: PropTypes.array.isRequired
}

export default Rounds;