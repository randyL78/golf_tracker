// dependencies
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// componenents
import Menu from './Menu';
import Nav from './Nav';

/**
 * Navigation
 * Component responsible for controlling whether main navigation and menu 
 * button are displayed
 * @param {*} props 
 */
class Navigation extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }

    // bind `this` on the callback
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }


  // open and close the nav menu
  handleMenuClick() {
    this.setState(state => ({
      isOpen: !state.isOpen
    }))
  }



  render() {

    // show the full navigation in desktop mode or if menu is in open state
    const showMenu = this.props.showMenu;
    const showNav = this.state.isOpen || !showMenu;

    return (
      <div>
        {showMenu ?
          <Menu open={this.state.isOpen} handleClick={this.handleMenuClick} /> : ""}
        <Nav show={showNav} />
      </div>
    )
  }
}

Navigation.propTypes = {
  showMenu: PropTypes.bool
}


export default Navigation;