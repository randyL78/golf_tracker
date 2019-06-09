// dependencies
import React from 'react';
import PropTypes from 'prop-types';


// components
import { Logo, Navigation } from '../../shared/Layout';

/**
 * Home.jsx
 * Renders the layout of the Home route
 * @param {*} props 
 */
const Home = props => {

  return (
    <div>
      <Logo inline={false} />
      <Navigation showMenu={props.screenSize == 'small'} />
    </div>
  )
}

Home.propTypes = {
  screenSize: PropTypes.oneOf(['small', 'medium', 'large'])
}

export default Home;