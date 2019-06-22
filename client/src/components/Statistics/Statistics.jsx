// dependencies
import React from 'react';
import PropTypes from 'prop-types';

// components
import Container from '../../shared/Containers/Container';
import Logo from '../../shared/Logo/Logo';
import Navigation from '../../shared/Navigation/Navigation';

// styles
import styles from './Statistics.scss';


/**
 * Statistics.js
 * Displays a users statistics such as GIR, average putts, etc
 * @param {*} props 
 */
const Statistics = props =>
  <div>
    <Logo inline={true} />
    <Navigation showMenu={props.screenSize !== 'large'} />
    <Container >
      {
        <div className={styles.Statistics}>
          <h1>Statistics: Coming Soon!</h1>
          <p>Here you will be able to view different statistics based on scores you have entered</p>
        </div>
      }
    </Container>
  </div>

Statistics.propTypes = {
  screenSize: PropTypes.oneOf(['small', 'medium', 'large'])
}

export default Statistics;