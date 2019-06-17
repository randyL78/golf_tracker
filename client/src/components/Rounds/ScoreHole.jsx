// dependencies
import React, { Component } from 'react';

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
    console.log(this.state.currentHole)
    this.setState(prevState => ({
      currentHole: {
        ...prevState.currentHole,
        [stateKey]: value
      }
    }));
  }

  // set the maximum value for putts
  maxPutts = () => {
    const { strokes } = this.state.currentHole;
    return strokes > 0 ? strokes - 1 : 0;
  }

  // handle saving current hole and redirecting to the next
  nextHole = () => {
    const { number, history, handleNextHole } = this.props;
    const { currentHole } = this.state;
    handleNextHole(number, history, currentHole)
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
                      min="0" max="6"
                      onChange={({ target }) =>
                        this.handleNumberChange(target.value, "par")}
                      value={par}
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
            <Button
              text="Next"
              handleOnClick={this.nextHole}
            />
          </ButtonContainer>
        </Container>
      </div>
    )
  }



}


export default ScoreHole;
