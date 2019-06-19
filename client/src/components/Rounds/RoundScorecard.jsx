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

  // create an enum for the months
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // create a 3 x 6 array of holes
  const holes = Array.from({ length: 6 }, (value, index) => round.holes.slice(index * 3, index * 3 + 3))

  const score = round
    .holes.map(hole => Number(hole.strokes))
    .reduce((total, num) => total + num);
  const par = round
    .holes.map(hole => Number(hole.par))
    .reduce((total, num) => total + num);
  const date = new Date(round.date);

  return (
    <div className={styles.RoundScorecard}>
      <Logo inline={true} />
      <Navigation showMenu={screenSize !== 'large'} />
      <Container >
        <Title title="Scorecard" />
        <div className={styles.ScorecardContainer} >
          <div className={styles.Scorecard} >
            <h2>{round.course}</h2>
            <h2>{`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}</h2>
            <h3 className={styles.par}>Par: {par}</h3>
            <h3 className={styles.score}>Score: {score}</h3>

            {
              holes.map((threeHoles, index) =>
                <ScoreTable key={index} holes={threeHoles} />
              )
            }

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

  const determineClass = (par, score) => {
    if (!par || !score || par === score)
      return styles.par;
    else if (par - score > 1)
      return styles.eagle;
    else if (par - score === 1)
      return styles.birdie;
    else if (par - score === -1)
      return styles.bogie;
    else
      return styles.double;
  }

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
            holes.map(({ number, strokes, par }) =>
              <td key={number}>
                <Link to={`/rounds/start/hole-${number}`} >
                  <div className={determineClass(par, strokes)}>
                    {strokes}
                  </div>
                </Link>
              </td>
            )
          }
        </tr>
      </tbody>
    </table>
  );
}