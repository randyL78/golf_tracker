// dependencies
import React from 'react';
import PropTypes from 'prop-types';

// components
import Container from '../../shared/Container/Container';
import Logo from '../../shared/Logo/Logo';
import Navigation from '../../shared/Navigation/Navigation';
import Title from '../../shared/Title/Title';
import Row from '../../shared/Row/Row';

// styles
import styles from './Courses.scss';



/**
 * Courses.js
 * Displays a list of Course information
 * @param {*} props 
 */
const Courses = props =>
  <div>
    <Logo inline={true} />
    <Navigation showMenu={props.screenSize !== 'large'} />
    <Container >
      {
        <div className={styles.Courses}>
          <Title title="Courses" />
          <div className={styles.rowContainer}>
            <Row />
            <Row />
            <Row />
            <Row />
            <Row />
          </div>
        </div>
      }
    </Container>
  </div>

Courses.propTypes = {
  screenSize: PropTypes.oneOf(['small', 'medium', 'large'])
}

export default Courses;