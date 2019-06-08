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

      // navigation component props
      nav: {
        contentOpen: true
      },

      // data from the server
      data: {}
    }
  }


  render() {
    return (
      <BrowserRouter>
        <div className={styles.App}>
          <Logo inline={this.state.inline} />
          <Navigation showMenu={!this.state.nav.contentOpen} />
          <Container />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;