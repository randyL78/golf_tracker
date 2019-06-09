// dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// styles
import styles from './Button.scss';

/**
 * LinkButton
 * Displays a button in the form of a Link component
 * @param {text, to, style} props
 */
export const LinkButton = ({ text, to, style, children }) =>
  <Link to={to} className={styles[`Button${style}`]} >
    {children}
    <span className={styles.ButtonText}>{text}</span>
  </Link>

LinkButton.defaultProps = {
  style: 'Default'
}

LinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  style: PropTypes.oneOf(['Default', 'Warning', 'Info'])
}



/**
 * Button
 * Displays a button in the form of a Button tag
 * @param {text, handleOnClick, style, children} props
 */
export const Button = ({ text, handleOnClick, style, children }) =>
  <button className={styles[`Button${style}`]} onClick={handleOnClick} >
    {children}
    <span className={styles.ButtonText}>{text}</span>
  </button>

Button.defaultProps = {
  style: 'Default'
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  style: PropTypes.string
}
