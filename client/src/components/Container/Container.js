import React from 'react';

import styles from './Container.scss';

const Container = props =>
  <main className={styles.Container}>
    {props.children}
  </main>

export default Container;