import React from "react";
import SessionManager from '../../session_management'


const sessionManager = new SessionManager()


class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  handleLogout(event) {
    event.preventDefault();
    sessionManager.logOut();
  }

  render(){
    return (
      <div>
        <a href="#" onClick={this.handleLogout}>Logout</a>
        {this.props.children}
      </div>
    )
  }
}

export default Admin
