import React from "react"
import ReactDOM from "react-dom"
import {Router, Route, hashHistory, IndexRoute} from "react-router"

import axios from 'axios';

// page route imports
import Header from "./header/header"
import Home from "./pages/home"
import Classes from "./pages/classes"
import Instructors from "./pages/instructors"
import Schedule from "./pages/schedule"
import Location from "./pages/location"
import Contact from "./pages/contact"
import Login from "./pages/login"

// admin page route imports
import Admin from "./pages/admin"

function loggedIn() {
  return false
}

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({pathname: '/login'})
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Header}>
      <IndexRoute component={Home} />
      <Route path="/classes" component={Classes} />
      <Route path="/instructors" component={Instructors} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/location" component={Location} />
      <Route path="/contact" component={Contact} />
    </Route>
    <Route path="/login" component={Login}/>
    <Route path="/admin" onEnter={requireAuth} component={Admin}>
      <IndexRoute component={Home} onEnter={requireAuth} />
      <Route path="/admin/classes" component={Home} onEnter={requireAuth} />
      <Route path="/admin/instructors" component={Home} onEnter={requireAuth} />
      <Route path="/admin/classes/add" component={Home} onEnter={requireAuth} />
      <Route path="/admin/instructors/add" component={Home} onEnter={requireAuth} />
      <Route path="/admin/classes/edit" component={Home} onEnter={requireAuth} />
      <Route path="/admin/instructors/edit" component={Home} onEnter={requireAuth} />
      <Route path="/admin/static_pages" component={Home} onEnter={requireAuth} />
      <Route path="/admin/static_pages/edit" component={Home} onEnter={requireAuth} />
    </Route>
  </Router>,
  document.getElementById("root")
)