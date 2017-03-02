import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import SessionManager from '../../session_management'


const sessionManager = new SessionManager()


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '',
                  password: '',
                  errors: ''};

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    event.preventDefault();
    this.setState({email: event.target.value})
  }

  handlePasswordChange(event) {
    event.preventDefault();
    this.setState({password: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    const login = this;
    sessionManager.logIn({email: login.state.email, password: login.state.password})
  }

  render() {
    return(
      <div className="login-div">
        <form onSubmit={this.handleSubmit} className="login-form">
          <img src="https://s3.amazonaws.com/ekf-dev/uploads/EKF_clean_WHT.png?v=63654859872" className="login-logo"></img>
          <label className="login-field">Email:
            <input type="text"
                   onChange={this.handleEmailChange} />
          </label>
          <label className="login-field">Password:
            <input type="password"
                   onChange={this.handlePasswordChange} />
           </label>
          <button className="login-button" type="submit" value="Submit">Login</button>
        </form>
        <p className="errors">{this.props.errors}</p>
      </div>
    )
  } 
}

const mapStateToProps = (state) => {
  return {errors: state.errors}
}

export default connect(mapStateToProps)(Login);
