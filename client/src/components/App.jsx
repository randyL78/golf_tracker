// dependencies
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


// static data
import initialState from './InitialState.js';

// styles
import styles from './App.scss';

// components
import ErrorPage from './Error/ErrorPage';
import Home from './Home/Home';
import Courses from './Courses/Courses';
import CourseEdit from './Courses/CourseNew';
import Rounds from './Rounds/Rounds';
import Statistics from './Statistics/Statistics';
import CourseDisplay from './Courses/CourseDisplay.jsx';


/**
 * Main App component responsible for handling routes, redirection,
 * and managing major state
 * @param {*} props
 */
class App extends Component {

  constructor(props) {
    super(props)

    this.state = initialState;

    // bind `this` to event listeners
    this.updateScreenSize = this.updateScreenSize.bind(this);
    this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
    this.handleSaveCourse = this.handleSaveCourse.bind(this);
    this.handleDeleteCourseAndRedirect = this.handleDeleteCourseAndRedirect.bind(this);
  }

  /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  *          Lifecycle Methods
  * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

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


  /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   *          Screen Methods
   * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

  // update `screenSize` based on browser window width
  updateScreenSize() {
    let screenSize = this.getScreenSize();

    if (screenSize !== this.state.screenSize)
      this.setState({
        screenSize
      })
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

  /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   *          Course Related Methods
   * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

  // get the details of a specific course
  getCourse(id) {
    return this.state.data.courses.find(course => course.id === id);
  }

  // delete the course at the current row
  handleDeleteCourse(id) {
    let updatedCourses = this.state.data.courses.filter(course => course.id !== id);

    let data = { ...this.state.data, courses: updatedCourses };

    this.setState({ data });
  }

  // handle saving a new course
  handleSaveCourse(newCourse, history) {

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        courses: [
          ...prevState.data.courses,
          newCourse
        ]
      }
    }))

    history.push('/courses');
  }

  handleDeleteCourseAndRedirect(id, history) {
    this.handleDeleteCourse(id)

    history.push('/courses');
  }



  render() {
    return (
      <BrowserRouter>
        <div className={styles.App}>
          {/* Redirect root route to the home route so that NavLink active class works properly */}
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Switch>
            <Route exact path="/home" render={() => <Home screenSize={this.state.screenSize} />} />

            {/* course routes */}
            {/* Display all courses */}
            <Route exact path="/courses" render={() =>
              <Courses
                screenSize={this.state.screenSize}
                courses={this.state.data.courses}
                handleDeleteCourse={this.handleDeleteCourse}
              />} />

            {/* Create a new course */}
            <Route exact path="/courses/new" render={props =>
              <CourseEdit
                history={props.history}
                screenSize={this.state.screenSize}
                handleSaveCourse={this.handleSaveCourse} />}
            />

            {/* Display a specific course */}
            <Route exact path="/courses/:courseId" render={props =>
              <CourseDisplay
                handleDeleteCourse={this.handleDeleteCourseAndRedirect}
                screenSize={this.state.screenSize}
                history={props.history}
                course={this.getCourse(props.match.params.courseId)}
              />} />

            {/* statistics routes */}
            <Route exact path="/statistics" render={() => <Statistics screenSize={this.state.screenSize} />} />

            {/* round routes */}
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