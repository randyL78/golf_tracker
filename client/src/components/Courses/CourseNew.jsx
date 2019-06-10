// dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faSave } from '@fortawesome/free-solid-svg-icons';
import uuidv4 from 'uuid/v4';

// components
import { Logo, Navigation, Title } from '../../shared/Layout';
import { Button, LinkButton } from '../../shared/Buttons/Button';
import Container, { ButtonContainer, FormContainer } from '../../shared/Containers/Container';




// styles
import styles from './CourseNew.scss';

/**
 * CourseEdit.jsx
 * Stateful form component for handling adding and editing of courses
 */
class CourseEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      city: '',
      address: '',
      state: '',
      zip: '',
      nameValid: true
    }

    this.handleValidation = this.handleValidation.bind(this);
  }

  // TODO: UNSAFE OPERATION! In future iteration make sure to sanitize
  // the data before storing it!
  handleValidation() {
    let { name, address, city, state, zip } = this.state;
    let { history } = this.props;
    if (name) {
      let newCourse = {
        id: uuidv4(),
        name,
        address,
        city,
        state,
        zip,
      }

      this.props.handleSaveCourse(newCourse, history);
    } else {
      this.setState({ nameValid: false })
    }
  }

  handleInputChange(value, stateMember) {
    this.setState({ [stateMember]: value })
  }

  handleSelectChange(state) {
    this.setState({ state })
  }

  render() {
    let { name, address, city, state, zip, nameValid } = this.state;
    return (
      <div className={styles.CourseNew}>
        <Logo inline={true} />
        <Navigation showMenu={this.props.screenSize !== 'large'} />
        <Container >
          <Title title="New Course" />
          <FormContainer>
            <label >
              <span>Course Name <span className={styles.required}>
                {nameValid ? "" : "*Required"}
              </span></span>
              <input
                name="name"
                className={nameValid ? "" : styles.required}
                required
                value={name}
                onChange={e => this.handleInputChange(e.target.value, "name")}
              />
            </label>
            <label >
              <span>Address</span>
              <input
                name="address"
                value={address}
                onChange={e => this.handleInputChange(e.target.value, "address")}
              />
            </label>
            <label >
              <span>City</span>
              <input
                name="city"
                value={city}
                onChange={e => this.handleInputChange(e.target.value, "city")}
              />
            </label>
            <label >
              <span>State</span>
              <select
                className={styles.half}
                value={state} onChange={e => this.handleSelectChange(e.target.value)}>
                <option value="" disabled>Please select one</option>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AR">AR</option>
                <option value="AZ">AZ</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DC">DC</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="IA">IA</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="MA">MA</option>
                <option value="MD">MD</option>
                <option value="ME">ME</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MO">MO</option>
                <option value="MS">MS</option>
                <option value="MT">MT</option>
                <option value="NC">NC</option>
                <option value="NE">NE</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NV">NV</option>
                <option value="NY">NY</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WI">WI</option>
                <option value="WV">WV</option>
                <option value="WY">WY</option>
              </select>
            </label>
            <label >
              <span>ZipCode</span>
              <input
                name="zip"
                value={zip}
                className={styles.half}
                onChange={e => this.handleInputChange(e.target.value, "zip")}
              />
            </label>
          </FormContainer>
          <ButtonContainer>
            <LinkButton to="/courses" style="Info" text="Cancel" >
              <FontAwesomeIcon icon={faBan} />
            </LinkButton>
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

CourseEdit.defaultProps = {
  validation: {
    name: false
  }
}

CourseEdit.propTypes = {
  screenSize: PropTypes.oneOf(['small', 'medium', 'large'])
}


export default CourseEdit;

