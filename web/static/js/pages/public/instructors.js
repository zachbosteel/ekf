import React from "react";
import axios from "axios";

class Instructors extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      properties: {}
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/api/static_page/4`)
      .then(res => {
        const properties = res.data.static_page;
        this.setState({ properties });
      });
  }

  render() {
    return(
      <div>
        <h1>{this.state.properties.title}</h1>
      </div>
    )
  } 
}

export default Instructors;
