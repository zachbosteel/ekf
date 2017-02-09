// react imports
import React from "react"

// header style imports
import HeaderButton from "./header_button"
import HeaderLogo from "./header_logo"


class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <HeaderLogo linkTo="/"/>
        <HeaderButton buttonName="Classes" linkTo="/classes" />
        <HeaderButton buttonName="Instructors" linkTo="/instructors" />
        <HeaderButton buttonName="Schedule" linkTo="/schedule" />
        <HeaderButton buttonName="Location" linkTo="/location" />
        <HeaderButton buttonName="Contact Us" linkTo="/contact" />
      </div>
    )
  }
}

export default Header;

