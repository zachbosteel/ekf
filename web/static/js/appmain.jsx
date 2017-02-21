import React from "react"
import ReactDOM from "react-dom"
import {Router, Route, browserHistory, IndexRoute} from "react-router"

import axios from 'axios';

import SessionManager from './session_management'
import store from './store'

// page route imports
import Header from "./header/header"
import Home from "./pages/public/home"
import Classes from "./pages/public/classes"
import Instructors from "./pages/public/instructors"
import Schedule from "./pages/public/schedule"
import Location from "./pages/public/location"
import Contact from "./pages/public/contact"
import Login from "./pages/public/login"
import ClassDetail from "./pages/public/class_detail"
import InstructorDetail from "./pages/public/instructor_detail"

// admin page route imports
import Admin from "./pages/private/admin"
import CreateClass from "./pages/private/create_class"
import EditClass from "./pages/private/edit_class"
import CreateInstructor from "./pages/private/create_instructor"
import EditInstructor from "./pages/private/edit_instructor"
import EditStatic from "./pages/private/static_page_form"

const sessionManager = new SessionManager()


function requireAuth(nextState, replace) {
  let token = sessionStorage.getItem('ekf-token')
  axios.post('/api/sessions/verify', {token: token})
  .then(res => {
    // happy path
  })
  .catch(error => {
    console.log('handling error');
    browserHistory.push('/admin/login');
  })
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Header}>
      <IndexRoute component={Home} />
      <Route path="/classes" component={Classes} /> 
      <Route path='/classes/:class_name/:class_id' component={ClassDetail} />
      <Route path="/instructors" component={Instructors} />
      <Route path='/instructors/:instructor_name/:instructor_id' component={InstructorDetail} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/location" component={Location} />
      <Route path="/contact" component={Contact} />
    </Route>
    <Route path="/admin/login" component={() => (<Login store={store} />)} />
    <Route path="/admin" component={Admin} onEnter={requireAuth}>
      <IndexRoute />
      <Route path="/admin/classes/add" component={CreateClass} onEnter={requireAuth} />
      <Route path="/admin/classes/:class_id/edit" component={EditClass} onEnter={requireAuth} />
      <Route path="/admin/instructors/add" component={CreateInstructor} onEnter={requireAuth} />
      <Route path="/admin/instructors/:instructor_id/edit" component={EditInstructor} onEnter={requireAuth} />
      <Route path="/admin/static/:static_id/edit" component={EditStatic} onEnter={requireAuth} />
    </Route>
  </Router>,
  document.getElementById("root")
)

