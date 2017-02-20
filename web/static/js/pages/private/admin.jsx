import React from "react";
import axios from "axios";

import RailButton from '../../admin_nav/rail_button'
import AdminDropdown from '../../admin_nav/admin_dropdown'
import SessionManager from '../../session_management'

const sessionManager = new SessionManager()


class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      staticPages: {},
      classes: {},
      instructors: {}
    }

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/static_page`)
      .then(res => {
        const staticPages = res.data.static_pages;
        this.setState({staticPages: staticPages});
      });
    axios.get(`/api/class_page`)
      .then(res => {
        const classes = res.data.class_pages;
        this.setState({classes: classes});
      });
    axios.get(`/api/instructor_page`)
      .then(res => {
        const instructors = res.data.instructor_pages;
        this.setState({instructors: instructors});
      });
  }
  
  handleLogout(event) {
    event.preventDefault();
    sessionManager.logOut();
  }

  render(){
    return (
      <div className="admin-container">
        <div className="admin-nav">
          <a href="#" onClick={this.handleLogout}>Logout</a>
          <RailButton buttonName="Static Pages">
            <AdminDropdown items={this.state.staticPages} menuType="static" />
          </RailButton>
          <RailButton buttonName="Class Pages">
            <AdminDropdown items={this.state.classes} menuType="classes" />
          </RailButton>
          <RailButton buttonName="Instructor Pages">
            <AdminDropdown items={this.state.instructors} menuType="instructors" />
          </RailButton>
        </div>
        <div className="admin-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Admin
