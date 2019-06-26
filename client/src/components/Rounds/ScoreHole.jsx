// dependencies
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faEye, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// components
import Container, { FormContainer, ButtonContainer } from '../../shared/Containers/Container';
import { Title, Navigation, Logo } from '../../shared/Layout';
import { Button } from '../../shared/Buttons/Button';


// styles
import styles from './ScoreHole.scss';


/**
 * ScoreHole
 * Component for allowing user to enter a score for a
 * particular hole
 */
class ScoreHole extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentHole: {
        number: 0,
        par: 0,
        strokes: 0,
        putts: 0,
        fairway: 'On Target'
      }
    }
  }

  componentDidMount() {
    const { currentHole } = this.props;

    this.setState({
      currentHole: {
        number: currentHole.number,
        par: currentHole.par || 0,
        strokes: currentHole.strokes || 0,
        putts: currentHole.putts || 0,
        fairway: currentHole.fairway || "On Target"
      }
    })

  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentHole.number !== this.props.currentHole.number) {
      const { currentHole } = this.props;

      this.setState({
        currentHole: {
          number: currentHole.number,
          par: currentHole.par || 0,
          strokes: currentHole.strokes || 0,
          putts: currentHole.putts || 0,
          fairway: currentHole.fairway || "On Target"
        }
      })
    }
  }

  // handle the on change event for the number fields
  handleNumberChange = (value, stateKey) => {
    this.setState(prevState => ({
      currentHole: {
        ...prevState.currentHole,
        [stateKey]: value
      }
    }));
  }

  // reset the current hole state back to zeros
  handleReset = () => {
    this.setState(({ number, par }) => ({
      currentHole: {
        number,
        par,
        strokes: 0,
        putts: 0,
        fairway: 'On Target'
      }
    }))
  }

  // set the maximum value for putts
  maxPutts = () => {
    const { strokes } = this.state.currentHole;
    return strokes > 0 ? strokes - 1 : 0;
  }

  // handle saving current hole and redirecting to the next
  nextHole = () => {
    const { history, handleSaveHole, isCurrent, roundId } = this.props;
    const { currentHole } = this.state;
    const { number } = currentHole;

    handleSaveHole(currentHole, roundId)

    const baseUrl = isCurrent ? `/rounds/start/` : `/rounds/${roundId}/`

    // if its the final hole redirect to the round overview route
    // otherewise redirect to the next hole
    number === 18 ?
      history.push(`/rounds/start/overview`) :
      history.push(`${baseUrl}hole-${number + 1}`)
  }

  // handle saving current hole and redirecting to the scorecard
  viewScore = () => {
    const { history, handleSaveHole, isCurrent, roundId } = this.props;
    const { currentHole } = this.state;

    handleSaveHole(currentHole, roundId)

    let url = isCurrent ? `/rounds/start/scorecard` : `/rounds/${roundId}/scorecard`

    history.push(url);

  }

  render() {

    const { currentHole } = this.state
    const { screenSize, number } = this.props;
    const { par, strokes, putts, fairway } = currentHole;

    return (
      <div className={styles.ScoreHole} >
        <Logo inline={true} />
        <Navigation showMenu={screenSize !== 'large'} />
        <Container >
          <Title title={`Hole #${number}`} />
          <FormContainer>
            <table>
              <thead>
                <tr>
                  <th><label>Par</label></th>
                  <th><label>Strokes</label></th>
                  <th><label>Putts</label></th>
                  <th><label>Fairway</label></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="number"
                      min="0" max="7"
                      value={par}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="14"
                      value={strokes}
                      onChange={({ target }) =>
                        this.handleNumberChange(target.value, "strokes")}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max={this.maxPutts()}
                      value={putts}
                      onChange={({ target }) =>
                        this.handleNumberChange(target.value, "putts")}
                    />
                  </td>
                  <td>
                    <select
                      value={fairway}
                      onChange={({ target }) =>
                        this.handleNumberChange(target.value, "fairway")}
                    >
                      <option value="On Target">On Target</option>
                      <option value="Left">Left</option>
                      <option value="Right">Right</option>
                      <option value="Long">Long</option>
                      <option value="Short">Short</option>
                    </select>
                  </td>
                </tr>
              </tbody>

            </table>
          </FormContainer>
          <ButtonContainer>
            <Button text="Reset" style="Warning" handleOnClick={this.handleReset}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </Button>
            <Button text="Score" style="Info" handleOnClick={this.viewScore} >
              <FontAwesomeIcon icon={faEye} />
            </Button>
            <Button text="Next" handleOnClick={this.nextHole} >
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </Button>
          </ButtonContainer>
        </Container>
      </div>
    )
  }



}


export default ScoreHole;

