import React from "react";
import { browserHistory } from "react-router";
import axios from 'axios';


class ContactForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.setInitialState()

    this.aoiOptions = [
      '',
      'Youth Classes',
      'Adult Classes',
      'Private Lessons',
      'Events and Seminars',
      'Prices',
      'Other'
    ]

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
  }

  setInitialState() {
    return (
      {
        errors: false,
        first_name: '',
        last_name: '',
        email_address: '',
        aoi: '',
        message: '',
        subject: '',
        phone1: '',
        phone2: '',
        phone3: '',
        thank_you: false
      }
    )
  }

  handleSubmit(event) {
    event.preventDefault()
    let errors = this.validate()
    let params = this.buildFormSubmit()
    if (errors.length > 0) {
      this.setState({errors: errors})
    } else {
      axios.post('/api/email', params)
      .then(resp => {
        this.setState(this.setInitialState())
        this.setState({thank_you: true})
        browserHistory.push('/')
      }).catch(error => {
        console.log(error)
      })
    }
  }

  buildFormSubmit() {
    return {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email_address: this.state.email_address,
      subject: this.state.subject,
      aoi: this.state.aoi,
      message: this.state.message,
      phone: `(${this.state.phone1})${this.state.phone2}-${this.state.phone3}`
    }
  }

  handleChange(event) {
    event.preventDefault();
    let field = event.target.name;
    let value = event.target.value;
    let updatedState = {};
    updatedState[field] = value;
    this.setState(updatedState);
  }

  validate() {
    let errors = [];
    Object.keys(this.state).forEach( (key) => {
      if (["", undefined].includes(this.state[key])) {
        let newKey = `${key[0].toUpperCase()}${key.slice(1)}`;
        if (key == 'aoi') {
          newKey = 'Area of Interest'
        }
        errors.push(`${newKey} is a required field. Please check over your form and fill it out.`);
      }
    })
    return errors;
  }

  render() {
    let errorDiv = <div />
    let thankYouDiv = <div />
    if (this.state.errors) {
      errorDiv = (
        <ul className="form-errors">
          {this.state.errors.map((error) => {
            return <li className="form-error">{error}</li>
          })}
        </ul>
      )
    }
    if (this.state.thank_you) {
      thankYouDiv = (
        <div className="thank-you">
          <p>Thank you! Your message has been sent. We'll contact you as soon as we can.</p>
        </div>
      )
    }

    return(
      <div>
        { errorDiv }
        { thankYouDiv }
        <form onSubmit={this.handleSubmit} className="contact-form">
          <div className="contact-form-name">
            <label className="contact-form-name-field" >
              *First Name <br />
              <input type="text" 
                     value={this.state.first_name} 
                     onChange={this.handleChange} 
                     name="first_name" />
            </label>
            <label className="contact-form-name-field" >
              *Last Name <br />
              <input type="text" 
                     value={this.state.last_name} 
                     onChange={this.handleChange} 
                     name="last_name" />
            </label>
          </div>
          <div className="contact-form-email">
            <label className="contact-form-email-field" >
              *Email <br />
              <input type="text" 
                     value={this.state.email_address} 
                     onChange={this.handleChange} 
                     name="email_address" />
            </label>
          </div>
          <div className="contact-form-phone">
            <label className="contact-form-phone-field" >
              *Phone <br />
              <input type="text" 
                     value={this.state.phone1} 
                     onChange={this.handleChange} 
                     name="phone1" 
                     placeholder="###"
                     maxLength="3"/>
              <input type="text" 
                     value={this.state.phone2} 
                     onChange={this.handleChange} 
                     name="phone2"  
                     placeholder="###"
                     maxLength="3"/>
              <input type="text" 
                     value={this.state.phone3} 
                     onChange={this.handleChange} 
                     name="phone3"  
                     placeholder="####"
                     maxLength="4"/>
            </label>
          </div>
          <div className="contact-form-aoi">
            <label className="contact-form-aoi-field" >
              *What can we help you with?<br />
              <select type="text" 
                     value={this.state.aoi} 
                     onChange={this.handleChange} 
                     name="aoi">
                {this.aoiOptions.map((option) => {
                  return <option value={option} key={option}>{option}</option>  
                }
                )} 
              </select>
            </label>
          </div>
          <div className="contact-form-subject">
            <label className="contact-form-subject-field" >
              *Subject<br />
              <input type="text" 
                     value={this.state.subject} 
                     onChange={this.handleChange} 
                     name="subject" />
            </label>
          </div>
          <div className="contact-form-message">
            <label className="contact-form-message-field" >
              *Message<br />
              <textarea 
                     value={this.state.message} 
                     onChange={this.handleChange} 
                     name="message" />
            </label>
          </div>
          <div className="contact-form-submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default ContactForm
