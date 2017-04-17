import React from 'react';
import { browserHistory } from 'react-router';

class MiniMenu extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      height: 0,
      width: 0,
      menuItems: [],
      secondaryMenuTopic: ''
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.redirect = this.redirect.bind(this)
    this.expandMenu = this.expandMenu.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  redirect(event) {
    let name = event.target.id;
    browserHistory.push(`/${name}`);
    this.props.toggle();
  }

  expandMenu(event) {
    event.preventDefault();
    let newMenuItems = this.props[event.target.id];
    this.setState({menuItems: newMenuItems,
                   secondaryMenuTopic: event.target.id});
  }

  render() {
    return(
      <div className="sidemenu" style={{height:`${this.state.height}px`, width:`${this.state.width}px`}}>
        <div className="sidemenu-half-1" 
          style={{
            height: `${this.state.height}px`,
            width: `${this.state.width/2}px`
          }}>
          <ul className="mini-link-list">
            <li id='' onClick={this.redirect}>Home</li>
            <li id='classes' onClick={this.expandMenu}>Classes</li>
            <li id='instructors' onClick={this.expandMenu}>Instructors</li>
            <li id='schedule' onClick={this.redirect}>Schedule</li>
            <li id='location' onClick={this.redirect}>Location</li>
            <li id='contact' onClick={this.redirect}>Contact</li>
          </ul>
        </div>
        <div className="sidemenu-half-2" 
          style={{
            height:`${this.state.height}px`,
            width:`${this.state.width/2 - 1}px`
          }}>
          <ul className="mini-link-list"
              style={{width: `${this.state.width/2 -2}px`}}>
            {this.state.menuItems.map((item) => {
              return (<li id={`${item.type}/${item.slug}/${item.id}`}
                         key={item.title}
                         onClick={this.redirect}>{item.title}</li>)
            })}
          </ul>
        </div>
      </div>
    )
  }

}

export default MiniMenu
