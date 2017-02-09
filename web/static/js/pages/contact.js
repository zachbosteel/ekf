import React from "react";
import axios from "axios";

import Header from "../header/header"

class Contact extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      properties: {}
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/api/static_page/3`)
      .then(res => {
        const properties = res.data.static_page;
        this.setState({ properties });
      });
  }

  render() {
    return(
      <div>
        <Header />
        <h1>{this.state.properties.title}</h1>
      </div>
    )
  } 
}

export default Contact;