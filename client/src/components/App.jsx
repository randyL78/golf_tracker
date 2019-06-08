// dependencies
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// styles
import styles from './App.scss';

// components
import Logo from './Logo/Logo';
import Container from './Container/Container';
import Navigation from './Navigation/Navigation';

/**
 * Main App component responsible for handling routes, redirection, and managing major state
 */
class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      // sets the Logo to be inline or stacked
      inline: true,

      // navigation component prop
      showMenu: true,      

      // data from the server
      data: {}
    }

    // bind `this` to event listener
    this.updateShowMenu = this.updateShowMenu.bind(this);
  }

  // add event listen to detect window resizing.
  componentDidMount() {
    if ( window.innerWidth >= 1400) {
      this.setState({
        showMenu: false
      });
    }
    window.addEventListener('resize', this.updateShowMenu);
  }

  // remove the event listener
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateShowMenu);
  }

  // update `showMenu` based on browser window width
  updateShowMenu() {
    let isDesktopWidth = window.innerWidth >= 1400;

    if (this.state.showMenu && isDesktopWidth) {
      this.setState({
        showMenu: false
      })
    } else if (!this.state.showMenu && !isDesktopWidth) {
      this.setState({
        showMenu: true
      })
    }
  }


  render() {
    return (
      <BrowserRouter>
        <div className={styles.App}>
          <Logo inline={this.state.inline} />
          <Navigation showMenu={this.state.showMenu} />
          <Container />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;