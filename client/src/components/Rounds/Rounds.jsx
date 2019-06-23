// dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// components
import { LinkButton } from "../../shared/Buttons/Button";
import { Logo, Navigation, Title } from '../../shared/Layout';
import Container, { ButtonContainer, RowContainer } from '../../shared/Containers/Container';

// other rounds components
import RoundStart from './RoundStart';
import RoundOverview from './RoundOverview';
import RoundScorecard from './RoundScorecard';
import ScoreHole from './ScoreHole';

// syles 
import styles from './Rounds.scss';

/**
 * Rounds.js
 * Displays a list of Round information
 * @param {*} props 
 */
const Rounds = ({ screenSize, rounds, btnText, currentRound, handleDeleteRound }) => {

  // if currently in a round, add that to rounds array
  rounds = currentRound ?
    [
      currentRound,
      ...rounds
    ]
    :
    rounds


  return (
    <div className={styles.Rounds}>
      <Logo inline={true} />
      <Navigation showMenu={screenSize !== 'large'} />
      <Container >
        <Title title="Rounds" />
        <RowContainer className={styles.rowContainer}>
          {
            rounds.length > 0
              ?
              rounds.map(round =>
                <RoundRow
                  key={round.id}
                  round={round}
                  handleDeleteRound={handleDeleteRound}
                  route={
                    currentRound && currentRound.id === round.id
                      ? `/rounds/start/scorecard`
                      : `/rounds/${round.id}/scorecard`

                  }
                />
              )
              :
              <h3>No Round Information Available</h3>
          }
        </RowContainer>
        <ButtonContainer>
          <LinkButton to="/rounds/start" text={btnText} >
            <FontAwesomeIcon icon={faPlusSquare} />
          </LinkButton>
        </ButtonContainer>
      </Container>
    </div>
  )
}

export default Rounds;

// export other rounds components
export { RoundStart, RoundOverview, RoundScorecard, ScoreHole };

/**
 * RoundRow
 * Rounds dependent component for displaying a single row of 
 * round information
 */
const RoundRow = ({ round, handleDeleteRound, route }) => {

  // create an enum for the months
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // calculate the round's score
  const score = round
    .holes.map(hole => Number(hole.strokes))
    .reduce((total, num) => total + num);
  const date = new Date(round.date);

  return (
    <p className={styles.RoundRow}>
      <Link to={route} className={styles.score}>
        {score}
      </Link>
      <Link to={route} className={styles.course}>
        {round.course}
      </Link>
      <Link to={route} className={styles.date}>
        {`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
      </Link>
      <button className={styles.delete} onClick={() => handleDeleteRound(round.id)} >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </p>

  )
}
