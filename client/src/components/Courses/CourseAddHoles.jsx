// dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faSave, faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// components
import { Logo, Navigation, Title } from '../../shared/Layout';
import { Button, LinkButton } from '../../shared/Buttons/Button';
import Container, { ButtonContainer, FormContainer } from '../../shared/Containers/Container';

// styling
import styles from './CourseAddHoles.scss';


/**
 * Component for adding hole pars when adding a new course
 */
class CourseAddHoles extends Component {

  constructor(props) {
    super(props)

    this.state = {
      holes: []
    }
  }

  componentDidMount() {

    const { holes } = this.props.currentCourse;

    // if the course doesn't have the holes built out yet, then build them
    if (holes.length === 0) {

      for (let i = 1; i <= 18; i++) {
        holes.push({
          number: i,
          par: 0,
          strokes: null,
          putts: null,
          fairway: null
        })
      }
    }

    this.setState({
      holes
    })
  }

  handleValidation = () => {
    const currentCourse = {
      ...this.props.currentCourse,
      holes: this.state.holes
    }

    this.props.handleSaveCourse(currentCourse);

    this.props.history.push(`/courses`);
  }

  handleParChange = (number, par) => {
    number = Number(number);
    par = Number(par);

    this.setState(prevState => {
      const holes = [...prevState.holes];



      holes[number - 1] = {
        ...holes[number - 1],
        par
      }

      return ({
        holes
      })

    })
  }


  render() {
    const holes = this.state.holes;
    const { screenSize } = this.props;
    return (
      <div>
        <Logo inline={true} />
        <Navigation showMenu={screenSize !== 'large'} />
        <Container >
          <Title title="Edit Holes" />
          <form className={styles.CourseAddHoles}>
            {
              holes.map(hole =>
                <Hole
                  key={hole.number}
                  number={hole.number}
                  par={hole.par}
                  onParChange={this.handleParChange}
                />
              )
            }
          </form>
          <ButtonContainer>
            <Button
              text="Save"
              handleOnClick={this.handleValidation}
            >
              <FontAwesomeIcon icon={faSave} />
            </Button>
          </ButtonContainer>
        </Container>
      </div>
    );
  }
}


export default CourseAddHoles;

/**
 * Hole
 * display hole label and form field
 */
const Hole = ({ number, par, onParChange }) => {
  return (
    <label className={styles.Hole}>
      <span>Hole</span>
      <span>{number}</span>
      <input type="number" value={par} min="0" max="7" onChange={e => onParChange(number, e.target.value)} />
    </label>
  );
}