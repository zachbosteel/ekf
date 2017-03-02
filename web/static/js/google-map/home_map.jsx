import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


function createMapOptions(maps) {
  return {
    panControl: false,
    mapTypeControl: false,
    scrollwheel: false,
  }
}


class Label extends Component {
  constructor(props){
    super(props)

    this.state = {
      hover: false
    }

    this.hoverOn = this.hoverOn.bind(this)
    this.hoverOff = this.hoverOff.bind(this)
  }

  hoverOn() {
    this.setState({hover: true })
  }

  hoverOff() {
    this.setState({hover: false })
  }

  render() {
    return (
      <div className="label-wrapper" onMouseOver={this.hoverOn} onMouseOut={this.hoverOff}>
        { this.state.hover ?
        <div className="ekf-map-label" onMouseOver={this.hoverOn} onMouseOut={this.hoverOff}>
            <img src="https://s3.amazonaws.com/ekf-dev/uploads/EKF_clean_WHT.png?v=63654859872" />
            <span className="map-label-address">5951 N Clark St</span>
            <span className="map-label-address">Chicago, IL 60626</span>
        </div>
        :
        <div className="circle" onMouseOver={this.hoverOn} onMouseOut={this.hoverOff}> </div>
        }
      </div>
    )
  }
} 


class HomeMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: {lat: 41.990082, lng: -87.669499},
      zoom: 17
    }
  };

  render() {
    return (
      <div className="my-home-map">
        <GoogleMapReact
          bootstrapURLKeys={{key: "AIzaSyDOFXT0tiPNrZhR5kAWlNiEPmIFIRz77zE"}}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          options={createMapOptions}
        >
          <Label
            lat={41.990082}
            lng={-87.669499}
            text={'EKF Martial Arts'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default HomeMap
