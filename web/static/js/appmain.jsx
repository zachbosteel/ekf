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

const sessionManager = new SessionManager()

const classPages = (
  axios.get('http://localhost:4000/api/class_page')
    .then( res => {
        return res.class_pages;
      }
    )
)

function requireAuth(nextState, replace) {
  if (!sessionManager.loggedIn()) {
    replace({pathname: '/admin/login'})
  }
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
    </Route>
  </Router>,
  document.getElementById("root")
)

    // <Route path="/login" component={Login}/>
    // <Route path="/admin" onEnter={requireAuth} component={Admin}>
    //   <IndexRoute component={Home} onEnter={requireAuth} />
    //   <Route path="/admin/classes" component={Home} onEnter={requireAuth} />
    //   <Route path="/admin/instructors" component={Home} onEnter={requireAuth} />
    //   <Route path="/admin/classes/add" component={Home} onEnter={requireAuth} />
    //   <Route path="/admin/instructors/add" component={Home} onEnter={requireAuth} />
    //   <Route path="/admin/classes/edit" component={Home} onEnter={requireAuth} />
    //   <Route path="/admin/instructors/edit" component={Home} onEnter={requireAuth} />
    //   <Route path="/admin/static_pages" component={Home} onEnter={requireAuth} />
    //   <Route path="/admin/static_pages/edit" component={Home} onEnter={requireAuth} />
    // </Route>
