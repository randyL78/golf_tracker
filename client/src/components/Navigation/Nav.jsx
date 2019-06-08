// React Libraries
import React from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import styles from './Nav.scss';

/*
 * Renders navigation links
 */
const Nav = () =>
  <nav className={styles.Nav}>
    <NavLink className={styles.NavLink} to="/">Home</NavLink>
    <NavLink className={styles.NavLink} to="/courses">Courses</NavLink>
    <NavLink className={styles.NavLink} to="/statistics">Statistics</NavLink>
    <NavLink className={styles.NavLink} to="/round">Start Round</NavLink>
  </nav>


export default Nav;