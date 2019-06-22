// dependencies
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import shortid from 'shortid';
import slugify from 'react-slugify';

// TODO: Link to server/database via proxy
// TODO: Add Redux Store to manage state
// static data, later to be replaced with call to backend database
import initialState from './InitialState.js';

// styles
import styles from './App.scss';

// components
import ErrorPage from './Error/ErrorPage';
import Home from './Home/Home';
import Courses, { CourseAddHoles, CourseDisplay, CourseNew } from './Courses/Courses';
import Rounds, { RoundStart, RoundOverview, RoundScorecard, ScoreHole } from './Rounds/Rounds';
import Statistics from './Statistics/Statistics';




/**
 * Main App component responsible for handling routes, redirection,
 * and managing major state
 * @param {*} props
 */
class App extends Component {

  constructor(props) {
    super(props)

    this.state = initialState;
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
  updateScreenSize = () => {
    let screenSize = this.getScreenSize();

    if (screenSize !== this.state.screenSize)
      this.setState({
        screenSize
      })
  }

  // get the type of screen based on window width
  getScreenSize = () => {
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
  getCourse = slug => {
    return this.state.data.courses.find(course => course.slug === slug) || false;
  }

  // delete the course at the current row
  handleDeleteCourse = slug => {
    let updatedCourses = this.state.data.courses.filter(course => course.slug !== slug);

    let data = { ...this.state.data, courses: updatedCourses };

    this.setState({ data });
  }

  // handle saving a new course
  handleSaveCourse = (newCourse) => {

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

    return true;
  }

  // handle updating a course
  handleUpdateCourse = (updatedCourse) => {
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

    return true;
  }

  handleDeleteCourseAndRedirect = (slug, history) => {
    this.handleDeleteCourse(slug)

    history.push('/courses');
  }

  /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   *          Round Related Methods
   * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

  // get round information for a round with a specific id 
  getRound = id => {
    let round = this.state.data.rounds.find(round => round.id === id);
    return round;
  }

  // handle starting a new round
  handleStartRound = (course, history) => {

    let holes = this.getCourse(slugify(course)).holes;

    this.setState({
      isInARound: true,
      currentRound: {
        id: shortid.generate(),   // create a url friendly id
        date: Date.now(),
        course,
        holes
      }
    });

    history.push('/rounds/start/overview');
  }

  // save round progress
  handleSaveRound = history => {

    // TODO: Save the round to the database, for now
    // just push to state.
    const rounds = [this.state.currentRound, ...this.state.data.rounds];

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

  // delete round 
  handleDeleteRound = id => {
    if (this.state.currentRound && id === this.state.currentRound.id) {
      this.setState({
        isInARound: false,
        currentRound: null,
      })
    } else {
      let updatedRounds = this.state.data.rounds.filter(round => round.id !== id);

      let data = { ...this.state.data, rounds: updatedRounds };

      this.setState({ data });
    }
  }

  // reset round progress and redirect to start new round
  handleQuitRound = history => {
    this.setState({
      isInARound: false,
      currentRound: null,
    })

    history.push('/rounds/start');
  }

  // handle saving and going to next hole
  handleSaveHole = (currentHole, roundId) => {

    // ensure the hole number is a number not a string
    const holeNumber = Number(currentHole.number);

    // if a round id is present, find the round in the data and update it
    if (roundId) {
      // TODO: I feel there is a refactor opportunity here
      const round = this.getRound(roundId);

      round.holes[holeNumber - 1] = currentHole;

      const rounds = [
        ...this.state.data.rounds.filter(round => round.id !== roundId),
        round
      ]

      this.setState(prevState => ({
        data: {
          ...prevState.data,
          rounds: rounds
        }
      }));

      // otherwise save it as a current round
    } else {
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
    }




    return true;

  }



  /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   *         Render the App
   * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
  render = () =>
    <BrowserRouter>
      <div className={styles.App}>
        {/* Redirect root route to the home route so that NavLink active class works properly */}
        <Route exact path="/" render={() => <Redirect to="/home" />} />

        {/* If user enters bad course name in url, redirect to course overview */}
        <Route path="/courses/:courseSlug" render={props =>
          props.match.params.courseSlug !== 'new' &&
            !this.getCourse(props.match.params.courseSlug)
            ?
            <Redirect to="/courses" /> : ''
        } />

        <Switch>
          <Route exact path="/home" render={() => <Home screenSize={this.state.screenSize} />} />

          {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=            
                  Course Routes 
            */}
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

          {/* edit par for holes of a course */}
          <Route exact path="/courses/:courseSlug/holes" render={props =>
            <CourseAddHoles
              handleDeleteCourse={this.handleDeleteCourseAndRedirect}
              screenSize={this.state.screenSize}
              history={props.history}
              currentCourse={this.getCourse(props.match.params.courseSlug)}
              handleSaveCourse={this.handleUpdateCourse}
            />} />

          {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=            
                  Statistics Routes 
            */}
          {/* statistics routes */}
          <Route exact path="/statistics" render={() => <Statistics screenSize={this.state.screenSize} />} />

          {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=            
                  Round Routes 
            */}

          {/* Display all rounds */}
          <Route exact path="/rounds" render={() =>
            <Rounds
              screenSize={this.state.screenSize}
              rounds={this.state.data.rounds}
              currentRound={this.state.currentRound}
              btnText={this.state.isInARound ? "Cont" : "New"}
              handleDeleteRound={this.handleDeleteRound}
            />} />

          } />

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

          {/* form to enter score for a hole in current round */}
          {/* if not in a round, will redirect to round start */}
          <Route exact path="/rounds/start/hole-:number" render={props =>
            this.state.isInARound ?
              <ScoreHole
                screenSize={this.state.screenSize}
                number={props.match.params.number}
                currentHole={this.state.currentRound.holes[props.match.params.number - 1]}
                handleSaveHole={this.handleSaveHole}
                history={props.history}
                isCurrent={true}
              />
              :
              <Redirect to="/rounds/start" />
          }
          />

          {/* form to enter score for a hole in a saved round */}
          <Route exact path="/rounds/:roundId/hole-:number" render={props =>
            this.getRound(props.match.params.roundId)
              ?
              <ScoreHole
                screenSize={this.state.screenSize}
                number={props.match.params.number}
                currentHole={this
                  .getRound(props.match.params.roundId)
                  .holes[props.match.params.number - 1]}
                handleSaveHole={this.handleSaveHole}
                history={props.history}
                isCurrent={false}
                roundId={props.match.params.roundId}
              />
              :
              <Redirect to="/404" />
          }
          />


          {/* display scorecard for current round */}
          {/* if not in a round, will redirect to round start */}
          <Route exact path="/rounds/start/scorecard"
            render={props =>
              this.state.isInARound ?
                <RoundScorecard
                  screenSize={this.state.screenSize}
                  round={this.state.currentRound}
                  isCurrent={true}
                />
                :
                <Redirect to="/rounds/start"
                  screenSize={this.state.screenSize}
                  round={this.state.currentRound}
                />
            }
          />

          {/* Display scorecard for selected round */}
          <Route exact path="/rounds/:roundId/scorecard"
            render={props =>
              <RoundScorecard
                screenSize={this.state.screenSize}
                round={this.getRound(props.match.params.roundId)}
                history={props.history}
                isCurrent={false}
              />
            }
          />

          {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=            
                  Error Routes 
            */}
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
}

export default App;