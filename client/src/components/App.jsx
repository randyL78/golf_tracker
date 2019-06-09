// dependencies
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// styles
import styles from './App.scss';

// components
import ErrorPage from './Error/ErrorPage';
import Home from './Home/Home';
import Courses from './Courses/Courses';
import Rounds from './Rounds/Rounds';
import Statistics from './Statistics/Statistics';


/**
 * Main App component responsible for handling routes, redirection, and managing major state
 */
class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      // screen size state to adjust layout by
      screenSize: 'small',

      // eventually, data from the server
      // for now static data
      data: {
        currentCourse: 0,
        courses: [
          {
            id: 1,
            name: 'Poplar Forest',
            city: 'Lynchburg',
            state: 'VA'
          },
          {
            id: 2,
            name: 'Boonsboro Country Club',
            city: 'Lynchburg',
            state: 'VA'
          },
          {
            id: 3,
            name: 'Poplar Grove',
            city: 'Lynchburg',
            state: 'VA'
          },
          {
            id: 4,
            name: 'Colonial Downs',
            city: 'Lynchburg',
            state: 'VA'
          }
        ]
      }
    }

    // bind `this` to event listeners
    this.updateScreenSize = this.updateScreenSize.bind(this);
    this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
  }

  // add event listen to detect window resizing.
  componentDidMount() {
    this.setState({
      screenSize: this.getScreenSize()
    })
    window.addEventListener('resize', this.updateScreenSize);
  }

  // remove the window resizing event listener
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateScreenSize);
  }

  // get the type of screen based on window width
  getScreenSize() {
    let screenSize;

    if (window.innerWidth >= 1400) {
      screenSize = 'large'
    } else if (window.innerWidth >= 980) {
      screenSize = 'medium'
    } else {
      screenSize = 'small'
    }

    return screenSize;
  }

  // update `screenSize` based on browser window width
  updateScreenSize() {
    let screenSize = this.getScreenSize();

    if (screenSize !== this.state.screenSize)
      this.setState({
        screenSize
      })
  }

  // delete the course at the current row
  handleDeleteCourse(id) {
    let updatedCourses = this.state.data.courses.filter(course => course.id !== id);

    let data = { ...this.state.data, courses: updatedCourses };

    this.setState({ data });
  }

  render() {
    return (
      <BrowserRouter>
        <div className={styles.App}>
          {/* Redirect root route to the home route so that NavLink active class works properly */}
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Switch>
            <Route exact path="/home" render={() => <Home screenSize={this.state.screenSize} />} />

            <Route exact path="/courses" render={() =>
              <Courses
                screenSize={this.state.screenSize}
                courses={this.state.data.courses}
                handleDeleteCourse={this.handleDeleteCourse}
              />} />

            <Route exact path="/statistics" render={() => <Statistics screenSize={this.state.screenSize} />} />

            <Route exact path="/rounds" render={() => <Rounds screenSize={this.state.screenSize} />} />

            {/* If all else fails, render the error page */}
            <Route render={() => <ErrorPage screenSize={this.state.screenSize} />} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;