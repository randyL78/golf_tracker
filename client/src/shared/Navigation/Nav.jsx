// React Libraries
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// Components
import Menu from './Menu';

// Styles
import styles from './Nav.scss';

/**
 * Renders navigation links
 * @param {*} props 
 */
const Nav = props =>
  <nav id="main-nav" className={props.show ? styles.Nav : styles.NavHide}>
    <NavLink activeClassName={styles.active} className={styles.NavLink} to="/home">Home</NavLink>
    <NavLink activeClassName={styles.active} className={styles.NavLink} to="/courses">Courses</NavLink>
    <NavLink activeClassName={styles.active} className={styles.NavLink} to="/statistics">Statistics</NavLink>
    <NavLink activeClassName={styles.active} className={styles.NavLink} to="/rounds">Start Round</NavLink>
  </nav>

export default Nav;