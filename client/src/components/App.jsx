// dependencies
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import shortid from 'shortid';

// styles
import styles from './App.scss';

// components
import ErrorPage from './Error/ErrorPage';
import Home from './Home/Home';
import Courses, { CourseAddHoles, CourseDisplay, CourseNew } from './Courses/Courses';
import Rounds, { RoundStart, RoundOverview, RoundScorecard, ScoreHole } from './Rounds/Rounds';
import Statistics from './Statistics/Statistics';
import { serverApi } from '../config';

// named constants
const API_URL = `/api/v1/`;  // the base url for the API's current version

/**
 * Main App component responsible for handling routes, redirection,
 * and managing major state
 * @param {*} props
 */
class App extends Component {

  // constructor
  constructor(props) {
    super(props)

    // TODO: Add Redux Store to manage state
    this.state = {
      // screen size state to adjust layout by
      screenSize: 'small',

      // state for managing round routes
      currentRound: null,

      // set to true to test styling
      isInARound: false,

      // set an empty array for the courses
      courses: [],

      // set an empty array to store holes that are being adjusted
      holes: [],

      // set an empty array to store rounds 
      rounds: [],

      // container for error messages from the API
      error: null,

      // used to determine if the rounds have finished loading from the DB
      isRoundsLoading: true
    }
  }

  /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  *          Lifecycle Methods
  * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */


  componentDidMount() {

    // add event listener to detect window resizing.
    window.addEventListener('resize', this.updateScreenSize);

    // do an initial check for window screen size
    this.updateScreenSize();

    // fetch all course data
    this.getCourses();

    // fetch allrounds
    this.getRounds();

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

  // returns the authentication headers for all server transactions
  getAuthHeaders = () => {
    // turn api username and password into a url encoded base 64 string
    const encodedAuth = Buffer
      .from(`${serverApi.name}:${serverApi.pass}`)
      .toString('base64');

    // necessary for the authorization on the server side
    return `Basic ${encodedAuth}`
  };



  /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    *          Course Related Methods
    * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

  // get a specific course's information by it's slug
  getCourse = slug =>
    this.state.courses.find(course => course.slug === slug);

  // get a specific course's information by it's id
  getCourseById = id =>
    this.state.courses.find(course => course._id === id);

  // get all courses.
  getCourses = () => {
    this.setState({
      isCoursesLoading: true
    })

    // API route to get courses
    const url = `${API_URL}courses`;

    fetch(url, {
      method: 'Get',
      headers: {
        'Authorization': this.getAuthHeaders()
      }
    })
      .then(data => data.json())
      // sort the course names alphabetically
      .then(courses => courses.sort((a, b) => a.name > b.name ? 1 : -1))
      .then(courses =>
        this.setState({
          courses,
          isCoursesLoading: false
        })
      ).catch(error =>
        this.setState({ error })
      )
  }

  getCourseName = id =>
    this.state.courses.find(course => course._id === id).name;

  getCourseSlug = id =>
    this.state.courses.find(course => course._id === id).slug;

  getHolesByCourse = courseId => {
    this.setState({ areHolesLoading: true });

    const url = `${API_URL}holes/course/${courseId}`;
    fetch(url, {
      headers: {
        'Authorization': this.getAuthHeaders()
      }
    })
      .then(data => data.json())
      .then(res => res.response.message)
      .then(holes => holes.sort((a, b) => a.number - b.number))
      .then(holes =>
        this.setState(prevState => ({
          holes,
          currentRound: {
            ...prevState.currentRound,
            holes
          },
          areHolesLoading: false
        }))
      ).catch(error =>
        this.setState({ error })
      )
  }

  // delete the course at the current row
  handleDeleteCourse = slug => {
    let courses = this.state.courses.filter(course => course.slug !== slug);
    this.setState({ courses });

    // url for the course delete route of the API
    const url = `${API_URL}courses/course/${slug}`;

    // delete course from database
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': this.getAuthHeaders()
      }
    })
      .catch(error =>
        this.setState({ error })
      )

  }


  handleDeleteCourseAndRedirect = (slug, history) => {
    this.handleDeleteCourse(slug)

    history.push('/courses');
  }


  // handle saving a new course
  handleSaveCourse = (newCourse) => {
    if (this.getCourse(newCourse.slug)) {
      return false;
    }
    this.setState({ isCoursesLoading: true })

    // save course to database
    const url = `${API_URL}courses/course`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.getAuthHeaders()
      },
      body: JSON.stringify(newCourse)
    })
      // refresh courselist in state
      // Can't just update state from `newCourse` because Mongo
      // creates it's own ids
      .then(res => { this.getCourses(); return res })
      .catch(error => this.setState({ error }));
    return true;
  }


  // handle updating a course
  handleUpdateCourse = (updatedCourse) => {
    const existingCourse = this.getCourse(updatedCourse.slug);
    if (existingCourse && existingCourse['_id'] !== updatedCourse.id) {
      return false;
    }

    // save course to database
    const url = `${API_URL}courses/course/${updatedCourse.slug}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.getAuthHeaders()
      },
      body: JSON.stringify(updatedCourse)
    })
      // refresh courselist in state
      // Can't just update state from `newCourse` because Mongo
      // creates it's own ids
      .then(res => this.getCourses())
      .catch(error => this.setState({ error }));

    return true;
  }

  // get the details of a specific course
  setCurrentCourse = slug => {
    const currentCourse = this.state.courses.find(course => course.slug === slug);

    if (currentCourse) {
      this.setState({
        currentCourse: ({
          '_id': currentCourse['_id'],
          name: currentCourse.name,
          city: currentCourse.city || '',
          address: currentCourse.address || '',
          state: currentCourse.state || '',
          zip: currentCourse.zip || '',
          holes: currentCourse.holes || []
        }),
        isCourseLoading: false
      })
    }
  }

  // update the course's holes for par adjustments
  updateHolePars = holes => {
    holes.map(hole => this.updateHole(hole))

    this.setState({
      currentRound: null
    })

    return true;
  }

  /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    *          Round Related Methods
    * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
  getRounds = () => {
    this.setState({
      isRoundsLoading: true
    })

    const url = `${API_URL}rounds`;

    fetch(url, {
      headers: {
        'Authorization': this.getAuthHeaders()
      }
    })
      .then(data => data.json())
      .then(rounds => rounds.sort((a, b) => a.date > b.date ? 1 : -1))
      .then(rounds =>
        this.setState({
          rounds,
          isRoundsLoading: false
        })
      ).catch(error =>
        this.setState({ error })
      )
  }

  // get round information for a round with a specific id 
  getRound = id => {
    let round = this.state.rounds.find(round => round._id === id);
    return round;
  }

  // handle starting a new round
  handleStartRound = courseId => {

    this.getHolesByCourse(courseId)

    const course = {
      ...this.getCourseById(courseId)
    }

    this.setState(prevState => ({
      isInARound: true,
      currentRound: {
        _id: shortid.generate(),   // create a url friendly id
        datePlayed: Date.now(),
        course,
        holes: prevState.holes
      },
    }));

    return true;
  }

  // save round progress
  handleSaveRound = history => {

    // save round to database
    const url = `${API_URL}rounds/round`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.getAuthHeaders()
      },
      body: JSON.stringify(this.state.currentRound)
    })
      .catch(error => this.setState({ error }));

    // reset the current round and take out `in a round` state
    this.setState(prevState => ({
      isInARound: false,
      currentRound: null,
      rounds: [
        {
          ...prevState.currentRound
        },
        ...prevState.rounds
      ]
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
      this.setState({ isRoundsLoading: true })

      const url = `${API_URL}rounds/round/${id}`
      // send a delete request to API
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': this.getAuthHeaders()
        }
      })
        // fetch the rounds back from API
        .then(() => this.getRounds())
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

      this.updateHole(currentHole);

      const round = this.getRound(roundId);

      round.holes[holeNumber - 1] = currentHole;

      const rounds = [
        ...this.state.rounds.filter(round => round.id !== roundId),
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


  // update a single hole in the DB
  updateHole = hole => {
    const url = `${API_URL}holes/hole/${hole._id}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.getAuthHeaders()
      },
      body: JSON.stringify(hole)
    }).catch(error => this.setState({ error }));
  }



  /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    *         Render the App
    * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
  render = () =>
    <BrowserRouter basename='/golf-tracker/' >
      <div className={styles.App}>
        {/* Redirect root route to the home route so that NavLink active class works properly */}
        <Route exact path="/" render={() => <Redirect to="/home" />} />


        <Switch>
          <Route exact path="/home" render={() => <Home screenSize={this.state.screenSize} />} />

          {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=            
              Course Routes 
        */}
          {/* Display all courses */}
          <Route exact path="/courses" render={() =>
            <Courses
              screenSize={this.state.screenSize}
              courses={this.state.courses}
              getCourses={this.getCourses}
              handleDeleteCourse={this.handleDeleteCourse}
              isLoading={this.state.isCoursesLoading}
            />} />

          {/* Create a new course */}
          <Route exact path="/courses/new" render={props =>
            <CourseNew
              isLoading={false}
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
              // setCourse={this.setCurrentCourse}
              courseSlug={props.match.params.courseSlug}
              isLoading={this.state.isCoursesLoading}
            />} />

          {/* edit an existing course */}
          <Route exact path="/courses/:courseSlug/edit" render={props =>
            <CourseNew
              handleDeleteCourse={this.handleDeleteCourseAndRedirect}
              screenSize={this.state.screenSize}
              history={props.history}
              currentCourse={this.getCourse(props.match.params.courseSlug)}
              // setCourse={this.setCurrentCourse}
              handleSaveCourse={this.handleUpdateCourse}
              courseSlug={props.match.params.courseSlug}
              isLoading={this.state.isCoursesLoading}
            />} />

          {/* edit par for holes of a course */}
          <Route exact path="/courses/:courseSlug/holes" render={props =>
            <CourseAddHoles
              handleDeleteCourse={this.handleDeleteCourseAndRedirect}
              getHoles={this.getHolesByCourse}
              screenSize={this.state.screenSize}
              history={props.history}
              currentCourse={this.getCourse(props.match.params.courseSlug)}
              handleSaveHoles={this.updateHolePars}
              courseSlug={props.match.params.courseSlug}
              isCoursesLoading={this.state.isCoursesLoading}
              areHolesLoading={this.state.areHolesLoading}
              holes={this.state.holes}
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
              rounds={this.state.rounds}
              currentRound={this.state.currentRound}
              btnText={this.state.isInARound ? "Cont" : "New"}
              handleDeleteRound={this.handleDeleteRound}
            />} />

          } />

          {/* start a new round */}
          {/* if currently in a round, will redirect to round overview */}
          <Route exact path="/rounds/start" render={props =>
            <RoundStart
              screenSize={this.state.screenSize}
              courses={this.state.courses}
              history={props.history}
              handleStartRound={this.handleStartRound}
              isInARound={this.state.isInARound}
            />
          }
          />

          {/* display links to holes in a round */}
          {/* if not in a round, will redirect to round start */}
          <Route exact path="/rounds/start/overview" render={props =>
            this.state.isInARound ?
              <RoundOverview
                screenSize={this.state.screenSize}
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
                currentRound={this.state.currentRound}
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

            <ScoreHole
              screenSize={this.state.screenSize}
              number={props.match.params.number}
              currentRound={this.getRound(props.match.params.roundId)}
              handleSaveHole={this.handleSaveHole}
              history={props.history}
              isCurrent={false}
              roundId={props.match.params.roundId}
              isLoading={this.isRoundsLoading}
            />

          }
          />


          {/* display scorecard for current round */}
          {/* if not in a round, will redirect to round start */}
          <Route exact path="/rounds/start/scorecard"
            render={props =>
              this.state.isInARound ?
                <RoundScorecard
                  screenSize={this.state.screenSize}
                  currentRound={this.state.currentRound}
                  isCurrent={true}
                  history={props.history}
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
                currentRound={this.getRound(props.match.params.roundId)}
                history={props.history}
                isCurrent={false}
                roundId={props.match.params.roundId}
                isLoading={this.state.isRoundsLoading}
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