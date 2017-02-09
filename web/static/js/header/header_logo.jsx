import React from "react";
import { Link } from "react-router";

class HeaderLogo extends React.Component {
  render() {
    return (
      <div className="headerLogo">
        <Link to={this.props.linkTo}>
          <img src="images/logo.png" className="headerLogoImage"></img>
        </Link>
      </div>
    )
  }
}

export default HeaderLogo;