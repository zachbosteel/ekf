import React from "react";
import axios from "axios";

import SimpleMap from '../../google-map/google_map'

class Location extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      properties: {}
    }
  }

  componentDidMount() {
    axios.get(`/api/static_page/5`)
      .then(res => {
        const properties = res.data.static_page;
        this.setState({ properties });
        this.getTexts();
      });
  }

  getTexts() {
    let updatedState = {}
    for (const text of this.state.properties.texts) {
      updatedState[text.label] = text.body;
    }
    this.setState(updatedState)
  }

  render() {
    return(
      <div className="non-home-page">
        <SimpleMap />
        <div className="address-overlay">
          <h2>{this.state['location-header-1']}</h2>
          <h4>{this.state['location-info-1']}</h4>
          <h4>{this.state['location-info-2']}</h4>
          <h4>{this.state['location-info-3']}</h4>
        </div>
      </div>
    )
  } 
}

export default Location;
