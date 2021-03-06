import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
// pushes user to the API
export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    passwordError: null,
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
      passwordError
    } = this.state;

    // let errorObject;
    // console.log(errors.length);
    // if (this.state.errors.length <= 1) {
    //   errorObject = errors
    // } else {
    //   errorObject = errors.map(error => <li key={error}>{error}</li>)
    // }

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <ul className="validation--errors--label">
              {
                errors
                    ? errors.map(error => <li key={error}>{error}</li>)
                    : ''
              }
              { passwordError && password !== confirmPassword &&
                  <li>Passwords do not match</li>
              }
              
            </ul>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={this.change}
                  placeholder="First Name" />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={this.change}
                  placeholder="Last Name" />
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={this.change}
                  placeholder="Confirm Password" />
                
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }
  submit = async () => {
    const { context } = this.props;
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
      confirmPassword
    } = this.state;
    // Create user
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      errors
    };
    if (password !== confirmPassword) {
      this.setState({passwordError: true});
      
    }
    context.actions.signUp(user.firstName, user.lastName, user.emailAddress, user.password)


       .then((createdUser) => {
         if (createdUser.errors){
           console.log("user has errors", createdUser);
          this.setState( {errors: createdUser.errors});
          return;
         }
          context.actions.signIn(user.emailAddress, user.password)
            .then(() => {
              this.props.history.push({pathname: '/authenticated'});
            });
        }
      )
      .catch((err) => {
        this.props.history.push('/error');
      });
  }
  cancel = () => {
    this.props.history.push('/');
  }
} 