import React from "react";
import { Link } from "react-router";

class RailButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideChildren: true
    }

    this.toggleChildDisplay = this.toggleChildDisplay.bind(this);
  }

  toggleChildDisplay() {
    const newValue = !this.state.hideChildren;
    this.setState({hideChildren: newValue});
  }

  render() {
    return (
      <div className="rail-button-dropdown-wrapper" onMouseEnter={this.toggleChildDisplay} onMouseLeave={this.toggleChildDisplay}>     
        <div className="rail-button">
          <span>
            {this.props.buttonName}
          </span>
        </div>
        <div className="rail-dropdown-container">
          {this.state.hideChildren ? null : this.props.children}
        </div>
      </div>
    )
  }
}

export default RailButton;

