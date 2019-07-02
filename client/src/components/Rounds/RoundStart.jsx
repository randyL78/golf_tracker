// dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faEye } from '@fortawesome/free-solid-svg-icons';

// components
import Container, { FormContainer, ButtonContainer } from '../../shared/Containers/Container';
import { Title, Logo, Navigation } from '../../shared/Layout';
import { LinkButton, Button } from '../../shared/Buttons/Button';
import Modal from '../Modal/Modal';
import { weatherApiKey, giphyApiKey } from '../../config';

// styles
import styles from './RoundStart.scss';


/**
 * RoundStart.js
 * Starts a new round of golf
 * @param {*} props 
 */
class RoundStart extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      modal: {

      }
    }
  }

  handleStartRound = courseId => {
    this.props.handleStartRound(courseId);

    const zip = this.props.courses.find(course => course._id === courseId).zip

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=${weatherApiKey}`;

    fetch(weatherUrl)
      .then(res => res.json())
      .then(data => data.weather[0].description)
      .then(weather => {

        // the query parameters to search by
        const query = `weather%2B${weather}`;
        // limit the respoonse to one gif
        const limit = 1;
        // randomize the offset up to 10
        const offset = Math.floor(Math.random() * 10);

        const giphyUrl = `http://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${query}&limit=${limit}&offset=${offset}`;

        fetch(giphyUrl)
          .then(results => results.json())
          .then(results => results.data[0].images.downsized_large.url)
          .then(image => {
            this.setState(prevState => ({
              modal: {
                ...prevState.modal,
                title: `Round Weather: ${weather}`,
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
                title: `Round Weather: ${weather}`,
                // backup gif if the public API has had too many requests
                image: `https://media.giphy.com/media/kiCXF8mL3j6Oe0vAm9/giphy.gif`,
                isLoading: false
              }
            })
            )
          })

      })
      .catch(err => {
        console.log(err);
      })

    this.setState({
      showModal: true,
      modal: {
        to: '/rounds/start/overview'
      }
    })

  }


  render = () => {

    const { screenSize, courses } = this.props;
    let selectField;
    return (
      <div className={styles.RoundStart}>
        <Logo inline={true} />
        <Navigation showMenu={screenSize !== 'large'} />
        <Container >
          <Title title="Start a New Round" />
          <FormContainer>
            <label>
              <span>Select Your Course</span>
              <select ref={field => { selectField = field }}>
                <option value="" disabled>Please select one</option>
                {
                  courses.map(course =>
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  )
                }

              </select>
            </label>
          </FormContainer>
          <ButtonContainer>
            <LinkButton to="/rounds" style="Info" text="View All">
              <FontAwesomeIcon icon={faEye} />
            </LinkButton>
            <Button text="Start" handleOnClick={() => { this.handleStartRound(selectField.value) }}>
              <FontAwesomeIcon icon={faPlayCircle} />
            </Button>
          </ButtonContainer>
        </Container>
        {
          this.state.showModal
            ?
            <Modal
              closeLink={this.state.modal.to}
              isLoading={this.state.modal.isLoading}
              title={this.state.modal.title}
              image={this.state.modal.image}
            />
            :
            this.props.isInARound
              ?
              <Redirect to="/rounds/start/overview" />
              :
              null
        }

      </div>
    )
  }
};


RoundStart.propTypes = {
  screenSize: PropTypes.oneOf(['small', 'medium', 'large']),
  courses: PropTypes.array.isRequired
}


export default RoundStart;