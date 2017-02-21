import React from "react";
import axios from "axios";

class Schedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      properties: {}
    }
  }

  componentDidMount() {
    axios.get(`/api/static_page/6`)
      .then(res => {
        const properties = res.data.static_page;
        this.setState({ properties });
        this.getTexts();
        this.getImages();
      });
  }

  getTexts() {
    let updatedState = {}
    for (const text of this.state.properties.texts) {
      updatedState[text.label] = text.body;
    }
    this.setState(updatedState)
  }

  getImages() {
    let updatedState = {}
    for (const image of this.state.properties.images) {
      updatedState[image.label] = image.path;
    }
    this.setState(updatedState)
  }

  render() {
    return(
      <div className="non-home-page schedule-page">
        <h1>{this.state['schedule-header-1']}</h1>
        <img src={this.state['schedule-adult']} />
        <h1>{this.state['schedule-header-2']}</h1>
        <img src={this.state['schedule-youth']} />
      </div>
    )
  } 
}

export default Schedule;
