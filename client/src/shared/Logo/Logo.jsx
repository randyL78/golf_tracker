import React from 'react';

import styles from './Logo.scss';

const Logo = props =>
  <h1 className={props.inline ? styles.LogoInline : styles.Logo}>Golf <span className={props.inline ? styles.trackerInline : styles.tracker}>Tracker</span></h1>;

export default Logo;