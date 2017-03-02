import React from "react";
import { Link } from "react-router";

class HeaderLogo extends React.Component {
  render() {
    return (
      <div className="headerLogo">
        <Link to={this.props.linkTo}>
          <img src="https://s3.amazonaws.com/ekf-dev/uploads/EKF_clean_WHT.png?v=63654859872" className="headerLogoImage"></img>
        </Link>
      </div>
    )
  }
}

export default HeaderLogo;
