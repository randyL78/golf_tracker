// dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

// components
import { LinkButton, Button } from '../../shared/Buttons/Button';
import { Loading } from '../../shared/Layout';

// placeholder images for testing styles
import image from '../../images/golf_standing.jpeg';

// styles
import styles from './Modal.scss';


const Modal = ({ closeLink, isLoading, title, image }) =>
  <div className={styles.overlay}>
    <div className={styles.Modal}>
      <h2>{title}</h2>
      {
        isLoading
          ?
          <Loading />
          :
          <img src={image} />
      }
      <div className={styles.buttonContainer}>
        <LinkButton text="Close" to={closeLink} >
          <FontAwesomeIcon icon={faTimesCircle} />
        </LinkButton>
      </div>
    </div>
  </div>

Modal.defaultProps = {
  title: '',
  closeLink: '/home',
  // image: image,
  isLoading: true
}

export default Modal