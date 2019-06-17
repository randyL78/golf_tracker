// dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSave } from '@fortawesome/free-solid-svg-icons';

// components
import Container, { ButtonContainer } from '../../shared/Containers/Container';
import { Title, Navigation, Logo } from '../../shared/Layout';
import { Button } from '../../shared/Buttons/Button';

// styling
import styles from './RoundOverview.scss';


/**
 * RoundOverview.jsx
 * Displays links to individual holes in a golf round
 */
const RoundOverview = ({ screenSize, holes, history, handleSaveRound, handleQuitRound }) => {
  return (
    <div className={styles.RoundOverview}>
      <Logo inline={true} />
      <Navigation showMenu={screenSize !== 'large'} />
      <Container >
        <Title title="Current Round" />

        {/* have to wrap in `div` because of `children` prop */}
        <div className={styles.HoleContainer}>
          {
            holes.map(hole =>
              <Hole key={hole.number} number={hole.number} />
            )
          }
        </div>

        <ButtonContainer>
          <Button text="Quit" style="Info" handleOnClick={() => handleQuitRound(history)} >
            <FontAwesomeIcon icon={faTimesCircle} />
          </Button>
          <Button text="Save" handleOnClick={() => handleSaveRound(history)}>
            <FontAwesomeIcon icon={faSave} />
          </Button>
        </ButtonContainer>
      </Container>
    </div>
  )
};

/**
 * Hole
 * Displays individual holes in a golf round
 */
const Hole = ({ number }) =>
  <Link className={styles.Hole} to={`/rounds/start/hole-${number}`} >
    <span>Hole </span>
    <span>{number}</span>
  </Link>


export default RoundOverview;