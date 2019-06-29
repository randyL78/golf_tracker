// dependencies
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faEye, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// components
import Container, { FormContainer, ButtonContainer } from '../../shared/Containers/Container';
import { Title, Navigation, Logo, Loading } from '../../shared/Layout';
import { Button } from '../../shared/Buttons/Button';
import Modal from '../../components/Modal/Modal';


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
        par: null,
        strokes: null,
        putts: null,
        fairway: "On Target",
      },
      showModal: false,
      modal: {
        closeLink: '/',
        isLoading: true,
        title: 'loading',
        image: null
      }
    }
  }

  componentDidMount() {
    const { currentRound, number } = this.props;

    if (!currentRound) return;

    const { _id, par, strokes, putts, fairway } =
      currentRound.holes[number - 1]

    // if values don't exist, set to null for DB validation
    this.setState({
      currentHole: {
        _id: _id || null,
        number,
        par: par || null,
        strokes: strokes || null,
        putts: putts || null,
        fairway: fairway || "On Target"
      }
    })
  }

  // ensure save if user navigates to different route
  componentWillUnmount() {
    const { handleSaveHole, roundId } = this.props;
    const { currentHole } = this.state;

    handleSaveHole(currentHole, roundId)
  }

  componentDidUpdate(prevProps) {
    if (this.props.isLoading || !this.props.currentRound) return;

    if (
      !prevProps.currentRound ||
      (prevProps.number !== this.props.number)
    ) {
      const { _id, number, par, strokes, putts, fairway } =
        this.props.currentRound.holes[this.props.number - 1];

      // if values don't exist, set to null for DB validation
      this.setState({
        currentHole: {
          _id: _id || null,
          number,
          par: par || null,
          strokes: strokes || null,
          putts: putts || null,
          fairway: fairway || "On Target"
        },
        showModal: false
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
    this.setState(prevState => ({
      currentHole: {
        number: prevState.number,
        par: prevState.par,
        strokes: null,
        putts: null,
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
    const { handleSaveHole, isCurrent, roundId } = this.props;
    const { currentHole } = this.state;
    const { number } = currentHole;

    handleSaveHole(currentHole, roundId)

    const baseUrl = isCurrent ? `/rounds/start/` : `/rounds/${roundId}/`

    const score = currentHole.strokes - currentHole.par;

    let topic;

    if (score < -1) {
      topic = 'amazing';
    } else if (score === -1) {
      topic = 'birdie';
    } else if (score === 0) {
      topic = 'par';
    } else if (score === 1) {
      topic = 'bogie';
    } else {
      topic = 'horrible';
    }

    this.setModalImage(topic);

    // creat link for modal to use
    const closeLink = Number(number) === 18 ?
      `/rounds/start/overview` :
      `${baseUrl}hole-${Number(number) + 1}`;

    // set state to show the modal
    this.setState({
      showModal: true,
      modal: {
        closeLink
      }
    })

  }

  // fetch and image from Giphy and store it in state
  setModalImage(topic) {
    // Giphy's public API key
    const key = 'dc6zaTOxFJmzC';
    // the query parameters to search by
    const query = `golf%2B${topic}`;
    // limit the respoonse to one gif
    const limit = 1;
    // randomize the offset up to 10
    const offset = Math.floor(Math.random() * 10);

    const url = `http://api.giphy.com/v1/gifs/search?api_key=${key}&q=${query}&limit=${limit}&offset=${offset}`;

    fetch(url)
      .then(results => results.json())
      .then(results => results.data[0].images.downsized_large.url)
      .then(image => {
        this.setState(prevState => ({
          modal: {
            ...prevState.modal,
            title: topic,
            image,
            isLoading: false
          }
        })
        )
      })
      .catch(err => {
        this.setState(prevState => ({
          modal: {
            ...prevState.modal,
            title: 'Score',
            // backup gif if the public API has had too many requests
            image: `https://media2.giphy.com/media/DHBqbADArdxoA/giphy-downsized-large.gif?cid=e1bb72ff5d17a926596367784df97357&rid=giphy-downsized-large.gif`,
            isLoading: false
          }
        })
        )
      })
  }

  // handle saving current hole and redirecting to the scorecard
  viewScore = () => {
    const { history, isCurrent, roundId } = this.props;

    let url = isCurrent ? `/rounds/start/scorecard` : `/rounds/${roundId}/scorecard`

    history.push(url);
  }

  render() {
    const { screenSize, number, isLoading } = this.props;

    if (isLoading) {
      return <Loading />
    }

    const { currentHole, showModal, modal } = this.state
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
                      value={Number(par)}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="14"
                      value={Number(strokes)}
                      onChange={({ target }) =>
                        this.handleNumberChange(target.value, "strokes")}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max={this.maxPutts()}
                      value={Number(putts)}
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
        {
          showModal
            ?
            <Modal closeLink={modal.closeLink} isLoading={modal.isLoading} image={modal.image} title={modal.title} />
            :
            null
        }

      </div>
    )
  }



}


export default ScoreHole;

