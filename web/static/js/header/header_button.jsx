import React from "react";
import { Link } from "react-router";

class HeaderButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideChildren: true
    }

    this.toggleChildDisplay = this.toggleChildDisplay.bind(this);
  }

  toggleChildDisplay() {
    console.log("TOGGLING")
    const newValue = !this.state.hideChildren;
    this.setState({hideChildren: newValue});
  }

  render() {
    return (
      <div className="header-button-dropdown-wrapper" onMouseEnter={this.toggleChildDisplay} onMouseLeave={this.toggleChildDisplay}>
        <Link to={this.props.linkTo}>       
          <div className="headerButton">
            <span>
              {this.props.buttonName}
            </span>
          </div>
        </Link>
        <div className="header-dropdown-container">
          {this.state.hideChildren ? null : this.props.children}
        </div>
      </div>
    )
  }
}

export default HeaderButton;
