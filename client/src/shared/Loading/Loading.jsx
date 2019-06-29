// dependencies
import React from 'react';

// loading gif
import loading from '../../images/loading.gif';

// styles
import styles from './Loading.scss';

const Loading = () =>
  <div className={styles.Loading}>
    <img src={loading} />
  </div>

export default Loading;