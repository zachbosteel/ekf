import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import store from './store';

class SessionManager extends React.Component {
  constructor (props) {
    super(props)
  }

  logInSuccess(data) {
    return Object.assign({type: "AUTHENTICATED"}, data)
  }

  logInFailure(data) {
    return Object.assign({type: "FAILED"}, data)
  }

  logOutAction() {
    return {type: "LOGOUT"}
  }

  logIn(data) {
    axios.post(`/api/sessions`, data)
    .then(res => {
      store.dispatch(this.logInSuccess({
        user: Object.assign({}, res.data.data, res.data.meta)
      }))
      browserHistory.push('/admin')
    })
    .catch(error => {
      store.dispatch(this.logInFailure({error: "Invalid username or password"}))
      return "error"
    });
  }


  logOut(data) {
    axios.delete(`/api/sessions`, data)
    .then(res => {
      store.dispatch(this.logOutAction())
      browserHistory.push('/admin/login')
    })
  }

  loggedIn() {
    return store.getState().isAuthenticated 
  }

  errors() {
    return store.getState().errors
  }
}

export default SessionManager
