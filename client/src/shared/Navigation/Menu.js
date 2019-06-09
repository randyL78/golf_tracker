// dependencies
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

// styles
import styles from './Menu.scss'

const Menu = props => {

  const icon = props.open ? faCaretRight : faBars;

  return (
    <button className={styles.Menu} onClick={props.handleClick}>
      <FontAwesomeIcon icon={icon} />
    </button>
  )
};

export default Menu;