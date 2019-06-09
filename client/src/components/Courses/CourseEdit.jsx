// dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faSave } from '@fortawesome/free-solid-svg-icons';

// components
import { Logo, Navigation, Title } from '../../shared/Layout';
import { Button, LinkButton } from '../../shared/Buttons/Button';
import Container, { ButtonContainer, FormContainer } from '../../shared/Containers/Container';




// styles
import styles from './CourseEdit.scss';

/**
 * CourseEdit.jsx
 * Stateful form component for handling adding and editing of courses
 */
class CourseEdit extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.CourseEdit}>
        <Logo inline={true} />
        <Navigation showMenu={this.props.screenSize !== 'large'} />
        <Container >
          <Title title="New Course" />
          <FormContainer>
            <label >
              <span>Course Name <span className={styles.required}>
                {this.props.validation.name ? "*Required" : ""}
              </span></span><input required />
            </label>
            <label >
              <span>Address</span><input />
            </label>
            <label >
              <span>City</span><input />
            </label>
            <label >
              <span>State</span><input className={styles.half} />
            </label>
            <label >
              <span>ZipCode</span><input className={styles.half} />
            </label>
          </FormContainer>
          <ButtonContainer>
            <LinkButton to="/courses" style="Info" text="Cancel" >
              <FontAwesomeIcon icon={faBan} />
            </LinkButton>
            <Button text="Save" handleOnClick={this.props.handleSaveCourse}>
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

