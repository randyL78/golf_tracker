// dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

// components
import Container, { ButtonContainer } from '../../shared/Containers/Container';
import { Title, Navigation, Logo, Loading } from '../../shared/Layout';
import { LinkButton } from '../../shared/Buttons/Button';

// styling
import styles from './RoundScorecard.scss';

/**
 * RoundScorecard.jsx
 * Displays the Scorecard of the selected round
 */
const RoundScorecard = ({ screenSize, currentRound, history, roundId, isCurrent, isLoading }) => {

  if (!isCurrent && !roundId && !isLoading) {
    history.push('/404');
    return false;
  }

  if (isLoading && !isCurrent) {
    return (<Loading />);
  }



  const { course, holes, datePlayed } = currentRound;

  let route = isCurrent ? `/rounds/start/hole-` : `/rounds/${roundId}/hole-`;

  // create an enum for the months
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // create a 3 x 6 array of holes
  const holesGrid = Array.from({ length: 6 }, (value, index) => holes.slice(index * 3, index * 3 + 3))

  const score = holes
    .map(hole => Number(hole.strokes))
    .reduce((total, num) => total + num);
  const par = holes
    .map(hole => Number(hole.par))
    .reduce((total, num) => total + num);
  const roundDate = new Date(datePlayed);

  return (
    <div className={styles.RoundScorecard}>
      <Logo inline={true} />
      <Navigation showMenu={screenSize !== 'large'} />
      <Container >
        <Title title="Scorecard" />
        <div className={styles.ScorecardContainer} >
          <div className={styles.Scorecard} >
            <h2>{course.name}</h2>
            <h2>{`${months[roundDate.getMonth()]} ${roundDate.getDate()}, ${roundDate.getFullYear()}`}</h2>
            <h3 className={styles.par}>Par: {par}</h3>
            <h3 className={styles.score}>Score: {score}</h3>

            {holesGrid.map((threeHoles, index) =>
              <ScoreTable key={index} holes={threeHoles} route={route} />
            )}


          </div>
        </div>

        <ButtonContainer>
          <LinkButton style="Info" text="View All" to="/rounds" >
            <FontAwesomeIcon icon={faEye} />
          </LinkButton>
          {
            isCurrent
              ?
              <LinkButton
                text="Overview"
                to="/rounds/start/overview" >
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
              </LinkButton>
              : null

          }
        </ButtonContainer>
      </Container>

    </div>
  )
}


export default RoundScorecard;

/**
 * ScoreTable
 */
const ScoreTable = ({ holes, route }) => {

  const determineClass = (par, score) => {

    // ensure the values passed are numbers
    par = Number(par);
    score = Number(score);

    if (!par || !score || par === score)
      return styles.even;
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
                <Link to={`${route}${hole.number}`} >
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
                <Link to={`${route}${number}`} >
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