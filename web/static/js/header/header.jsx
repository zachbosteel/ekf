// react imports
import React from "react";
import axios from "axios";

// header style imports
import HeaderButton from "./header_button";
import HeaderLogo from "./header_logo";

// dropdown menu imports
import Dropdown from '../dropdown/dropdown';


class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      classes: [],
      instructors: []
    }
  }

  componentDidMount() {
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

  render() {
    return (
      <div>
        <div className="header">
          <HeaderLogo linkTo="/"/>
          <HeaderButton buttonName="Classes" linkTo="/classes"> 
            <Dropdown items={this.state.classes} />
          </HeaderButton>
          <HeaderButton buttonName="Instructors" linkTo="/instructors">
            <Dropdown items={this.state.instructors} />
          </HeaderButton>
          <HeaderButton buttonName="Schedule" linkTo="/schedule" />
          <HeaderButton buttonName="Location" linkTo="/location" />
          <HeaderButton buttonName="Contact Us" linkTo="/contact" />
        </div>

        {this.props.children}
      </div>
    )
  }
}

export default Header;

