import React from "react";
import { Link } from "react-router";

class HeaderButton extends React.Component {
  render() {
    return (
      <Link to={this.props.linkTo}>       
        <div className="headerButton">
          <span>
            {this.props.buttonName}
          </span>
        </div>
      </Link>
    )
  }
}

export default HeaderButton;