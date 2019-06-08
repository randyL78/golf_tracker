// dependencies
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// styles
import styles from './App.scss';

// components
import Logo from './Logo/Logo';
import Nav from './Navigation/Nav';

/**
 * Main App component responsible for handling routes, redirection, and managing major state
 */
class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      inline: false,
      mobile: false,
      data: {}
    }
  }


  render() {
    return (
      <BrowserRouter>
        <div className={styles.App}>
          <Logo inline={this.state.inline} />
          <Nav mobile={this.state.mobile} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;