import React from "react"
import ReactDOM from "react-dom"
import {Router, Route, hashHistory} from "react-router"

// page route imports
import Home from "./pages/home"
import Classes from "./pages/classes"
import Instructors from "./pages/instructors"
import Schedule from "./pages/schedule"
import Location from "./pages/location"
import Contact from "./pages/contact"

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Home} />
    <Route path="/classes" component={Classes} />
    <Route path="/instructors" component={Instructors} />
    <Route path="/schedule" component={Schedule} />
    <Route path="/location" component={Location} />
    <Route path="/contact" component={Contact} />
  </Router>,
  document.getElementById("root")
)