// dependencies
import React from 'react';
import PropTypes from 'prop-types';

// components
import Container from '../../shared/Containers/Container';
import Logo from '../../shared/Logo/Logo';
import Navigation from '../../shared/Navigation/Navigation';

// styles
import styles from './ErrorPage.scss';


/**
 * ErrorPage.js
 * Displays a 404 like error page on unfound routes
 */
const ErrorPage = props =>
  <div>
    <Logo inline={true} />
    <Navigation showMenu={props.screenSize !== 'large'} />
    <Container >
      {
        <div className={styles.ErrorPage}>
          <h1>Oh no!</h1>
          <p>Looks like the ball flew out of bounds! Please use the menu to get back into play.</p>
        </div>
      }
    </Container>
  </div>

ErrorPage.propTypes = {
  screenSize: PropTypes.oneOf(['small', 'medium', 'large'])
}



export default ErrorPage;