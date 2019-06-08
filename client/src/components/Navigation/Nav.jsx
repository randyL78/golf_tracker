// React Libraries
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// Components
import Menu from './Menu';

// Styles
import styles from './Nav.scss';

/*
 * Renders navigation links
 */
const Nav = props =>
  <nav id="main-nav" className={props.show ? styles.Nav : styles.NavHide}>
    <NavLink className={styles.NavLink} to="/">Home</NavLink>
    <NavLink className={styles.NavLink} to="/courses">Courses</NavLink>
    <NavLink className={styles.NavLink} to="/statistics">Statistics</NavLink>
    <NavLink className={styles.NavLink} to="/round">Start Round</NavLink>
  </nav>

export default Nav;