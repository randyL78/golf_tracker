// dependencies
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';




// TODO: Link to server/database via proxy
// TODO: Add Redux Store to manage state
// static data, later to be replaced with call to backend database
import initialState from './InitialState.js';

// styles
import styles from './App.scss';

// components
import ErrorPage from './Error/ErrorPage';
import Home from './Home/Home';
import Courses from './Courses/Courses';
import CourseNew from './Courses/CourseNew';
import { RoundStart, RoundOverview, ScoreHole } from './Rounds/Rounds';
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
    // TODO: Convert to arrow class properties now that the Babel plugin:
    // `@babel/plugin-proposal-class-properties` is installed
    this.updateScreenSize = this.updateScreenSize.bind(this);
    this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
    this.handleSaveCourse = this.handleSaveCourse.bind(this);
    this.handleStartRound = this.handleStartRound.bind(this);
    this.handleUpdateCourse = this.handleUpdateCourse.bind(this);
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

    // IMPORTANT: These dimensions map to specific values in the 
    // Sass variables partial `../globalSyles/_variables.scss`
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
  getCourse(slug) {
    return this.state.data.courses.find(course => course.slug === slug);
  }

  // delete the course at the current row
  handleDeleteCourse(slug) {
    let updatedCourses = this.state.data.courses.filter(course => course.slug !== slug);

    let data = { ...this.state.data, courses: updatedCourses };

    this.setState({ data });
  }

  // handle saving a new course
  handleSaveCourse(newCourse, history) {

    if (this.getCourse(newCourse.slug)) {
      return false;
    }

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

  // handle updating a course
  handleUpdateCourse(updatedCourse, history) {
    const existingCourse = this.getCourse(updatedCourse.slug);
    if (existingCourse && existingCourse.id !== updatedCourse.id) {
      return false;
    }

    let updatedCourses = this.state.data.courses.map(course =>
      (course.id === updatedCourse.id) ? updatedCourse : course)

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        courses: updatedCourses
      }
    }))

    history.push('/courses');
  }

  handleDeleteCourseAndRedirect(slug, history) {
    this.handleDeleteCourse(slug)

    history.push('/courses');
  }

  /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   *          Round Related Methods
   * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

  // handle starting a new round
  handleStartRound(courseId, history) {

    let holes = [];

    for (let i = 1; i <= 18; i++) {
      holes.push({
        number: i,
        par: null,
        strokes: null,
        putts: null,
        fairway: null
      });
    }

    this.setState({
      isInARound: true,
      currentRound: {
        courseId,
        holes
      }
    });

    history.push('/rounds/start/overview');
  }

  // save round progress
  handleSaveRound = history => {

    // TODO: Save the round to the database, for now
    // just push to state.
    const rounds = [...this.state.data.rounds, this.state.currentRound];

    // reset the current round and take out `in a round` state
    this.setState(prevState => ({
      isInARound: false,
      currentRound: null,
      data: {
        ...prevState.data,
        rounds
      }
    }))

    history.push('/home');
  }

  // reset round progress and redirect to start new round
  handleQuitRound = history => {
    this.setState(prevState => ({
      isInARound: false,
      currentRound: null,
    }))

    history.push('/rounds/start');
  }

  // handle saving and going to next hole
  handleNextHole = (holeNumber, history, currentHole) => {
    holeNumber = Number(holeNumber);

    const holes = [
      ...this.state.currentRound.holes,
    ]

    holes[holeNumber - 1] = currentHole;

    this.setState(prevState => ({
      currentRound: {
        ...prevState.currentRound,
        holes
      }
    }));

    holeNumber === 18 ? history.push('/rounds/start/overview') : history.push(`/rounds/start/hole-${holeNumber + 1}`)
  }



  /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   *         Render the App
   * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
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
              <CourseNew
                history={props.history}
                screenSize={this.state.screenSize}
                handleSaveCourse={this.handleSaveCourse} />}
            />

            {/* Display a specific course */}
            <Route exact path="/courses/:courseSlug" render={props =>
              <CourseDisplay
                handleDeleteCourse={this.handleDeleteCourseAndRedirect}
                screenSize={this.state.screenSize}
                history={props.history}
                course={this.getCourse(props.match.params.courseSlug)}
              />} />

            {/* edit an existing course */}
            <Route exact path="/courses/:courseSlug/edit" render={props =>
              <CourseNew
                handleDeleteCourse={this.handleDeleteCourseAndRedirect}
                screenSize={this.state.screenSize}
                history={props.history}
                currentCourse={this.getCourse(props.match.params.courseSlug)}
                handleSaveCourse={this.handleUpdateCourse}
              />} />

            {/* statistics routes */}
            <Route exact path="/statistics" render={() => <Statistics screenSize={this.state.screenSize} />} />

            {/* round routes */}

            {/* start a new round */}
            {/* if currently in a round, will redirect to round overview */}
            <Route exact path="/rounds/start" render={props =>
              !this.state.isInARound ?
                <RoundStart
                  screenSize={this.state.screenSize}
                  courses={this.state.data.courses}
                  history={props.history}
                  handleStartRound={this.handleStartRound}
                />
                :
                <Redirect to="/rounds/start/overview" />
            }
            />

            {/* display links to holes in a round */}
            {/* if not in a round, will redirect to round start */}
            <Route exact path="/rounds/start/overview" render={props =>
              this.state.isInARound ?
                <RoundOverview
                  screenSize={this.state.screenSize}
                  holes={this.state.currentRound.holes}
                  history={props.history}
                  handleSaveRound={this.handleSaveRound}
                  handleQuitRound={this.handleQuitRound}
                />
                :
                <Redirect to="/rounds/start" />
            }


            />

            {/* form to enter score for a hole */}
            {/* if not in a round, will redirect to round start */}
            <Route exact path="/rounds/start/hole-:number" render={props =>
              this.state.isInARound ?
                <ScoreHole
                  screenSize={this.state.screenSize}
                  number={props.match.params.number}
                  currentHole={this.state.currentRound.holes[props.match.params.number - 1]}
                  handleNextHole={this.handleNextHole}
                  history={props.history}
                />
                :
                <Redirect to="/rounds/start" />
            }
            />

            {/* Manually directed "Not found" error route */}
            <Route path="/404" render={() =>
              <ErrorPage
                screenSize={this.state.screenSize}
              />}
            />


            {/* If all else fails, render the error component */}
            <Route render={() =>
              <ErrorPage
                screenSize={this.state.screenSize}
              />}

            />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;