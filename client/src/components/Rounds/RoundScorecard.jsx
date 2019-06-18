// dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faEye } from '@fortawesome/free-solid-svg-icons';

// components
import Container, { ButtonContainer } from '../../shared/Containers/Container';
import { Title, Navigation, Logo } from '../../shared/Layout';
import { Button, LinkButton } from '../../shared/Buttons/Button';

// styling
import styles from './RoundScorecard.scss';

/**
 * RoundScorecard.jsx
 * Displays the Scorecard of the selected round
 */
const RoundScorecard = ({ screenSize, round }) => {

  const frontNine = round.holes.filter(hole => hole.number <= 9);
  const backNine = round.holes.filter(hole => hole.number > 9);
  const score = round
    .holes.map(hole => Number(hole.strokes))
    .reduce((total, num) => total + num);
  const par = round
    .holes.map(hole => Number(hole.par))
    .reduce((total, num) => total + num);

  return (
    <div className={styles.RoundScorecard}>
      <Logo inline={true} />
      <Navigation showMenu={screenSize !== 'large'} />
      <Container >
        <Title title="Scorecard" />
        <div className={styles.ScorecardContainer} >
          <div className={styles.Scorecard} >
            <h2>{round.course}</h2>
            <h3 className={styles.par}>Par: {par}</h3>
            <h3 className={styles.score}>Score: {score}</h3>
            <ScoreTable holes={frontNine} />

            <ScoreTable holes={backNine} />
          </div>
        </div>
        <ButtonContainer>
          <LinkButton text="View All" to="/rounds" >
            <FontAwesomeIcon icon={faEye} />
          </LinkButton>
        </ButtonContainer>
      </Container>

    </div>
  )
}

export default RoundScorecard;

/**
 * ScoreTable
 */
const ScoreTable = ({ holes }) => {

  return (
    <table>
      <thead>
        <tr>
          {
            holes.map(hole =>
              <th key={hole.number}>
                <Link to={`/rounds/start/hole-${hole.number}`} >
                  {hole.number}
                </Link>
              </th>
            )
          }
        </tr>
      </thead>
      <tbody>
        <tr>
          {
            holes.map(hole =>
              <td key={hole.number}>
                <Link to={`/rounds/start/hole-${hole.number}`} >
                  {hole.strokes}
                </Link>
              </td>
            )
          }
        </tr>
      </tbody>
    </table>
  );
}