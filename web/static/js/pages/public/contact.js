import React from "react";
import axios from "axios";

import ContactForm from "../../contact_form/contact_form"

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
        <h1 className="contact-header">{this.state['contact-header-1']}</h1>
        <p className="contact-paragraph">{this.state['contact-paragraph-1']}</p>
        <ContactForm />
      </div>
    )
  } 
}

export default Contact;
