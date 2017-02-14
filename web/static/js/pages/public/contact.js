import React from "react";
import axios from "axios";

class Contact extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      properties: {}
    }
  }

  componentDidMount() {
    axios.get(`/api/static_page/3`)
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

export default Contact;
