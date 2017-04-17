// react imports
import React from "react";
import axios from "axios";

// header style imports
import HeaderButton from "./header_button";
import HeaderLogo from "./header_logo";
import MiniMenu from "../mini_menu/mini_menu"

// dropdown menu imports
import Dropdown from '../dropdown/dropdown';


class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      classes: [],
      instructors: [],
      mini_menu_expanded: false
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.toggleMinMenuExpanded = this.toggleMinMenuExpanded.bind(this);
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
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  toggleMinMenuExpanded() {
    this.setState({mini_menu_expanded: !this.state.mini_menu_expanded})
  }

  render() {
    if (window.innerWidth > 797) {
      return (
        <div className="primary">
          <div className="header">
            <HeaderLogo linkTo="/"/>
            <HeaderButton buttonName="Classes" linkTo="/"> 
              <Dropdown items={this.state.classes} />
            </HeaderButton>
            <HeaderButton buttonName="Instructors" linkTo="/">
              <Dropdown items={this.state.instructors} />
            </HeaderButton>
            <HeaderButton buttonName="Schedule" linkTo="/schedule" />
            <HeaderButton buttonName="Location" linkTo="/location" />
            <HeaderButton buttonName="Contact Us" linkTo="/contact" />
          </div>

          {this.props.children}
          <div className="footer">
            <a href="https://facebook.com/EKFchicago/"><i className="fa fa-facebook fa-2" aria-hidden="true"></i></a>
            <a href="https://twitter.com/EKFchicago"><i className="fa fa-twitter fa-2" aria-hidden="true"></i></a>
            <a href="https://instagram.com/ekfchicago"><i className="fa fa-instagram fa-2" aria-hidden="true"></i></a>
          </div>
        </div>
      )
    } else {
      return (
        <div className="primary">
          <div className="header">
            <HeaderLogo linkTo="/"/>
            <div className="mini-menu-icon">
              <i className="fa fa-bars fa-2x" 
                 aria-hidden="true" 
                 onClick={this.toggleMinMenuExpanded}></i>
            </div>
          </div>
          { this.state.mini_menu_expanded ? <MiniMenu classes={this.state.classes} instructors={this.state.instructors} toggle={this.toggleMinMenuExpanded}/> : this.props.children }
          <div className="footer">
            <a href="https://facebook.com/EKFchicago/"><i className="fa fa-facebook fa-2" aria-hidden="true"></i></a>
            <a href="https://twitter.com/EKFchicago"><i className="fa fa-twitter fa-2" aria-hidden="true"></i></a>
            <a href="https://instagram.com/ekfchicago"><i className="fa fa-instagram fa-2" aria-hidden="true"></i></a>
          </div>
        </div>
      )
    }
  }
}

export default Header;

