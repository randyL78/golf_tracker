import React, { PureComponent } from 'react';

import styles from './Logo.scss';

class Logo extends PureComponent {
  render = () => {
    const { inline } = this.props;
    return (
      <h1 className={inline ? styles.LogoInline : styles.Logo}>Golf <span className={inline ? styles.trackerInline : styles.tracker}>Tracker</span></h1>);
  }
}


export default Logo;