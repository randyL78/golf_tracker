// dependencies
import React from 'react';
import PropTypes from 'prop-types';

// components
import Container from '../../shared/Container/Container';
import Logo from '../../shared/Logo/Logo';
import Navigation from '../../shared/Navigation/Navigation';

// styles
import styles from './Rounds.scss';


/**
 * Rounds.js
 * Displays a users Rounds or starts a new round of golf
 * @param {*} props 
 */
const Rounds = props =>
  <div>
    <Logo inline={true} />
    <Navigation showMenu={props.screenSize !== 'large'} />
    <Container >
      {
        <div className={styles.Rounds}>
          <h1>Welcome to the different Rounds</h1>
          <p>Here you will be able to add new Rounds and view ones that are already in</p>
        </div>
      }
    </Container>
  </div>

Rounds.propTypes = {
  screenSize: PropTypes.oneOf(['small', 'medium', 'large'])
}

export default Rounds;