import React from 'react';
import { browserHistory } from 'react-router';
import 'whatwg-fetch';


import InstructorPageForm from './instructor_page_form';

class CreateInstructor extends React.Component {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    let resp = fetch('/api/instructor_page', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
      },
      body: data
    }).then(res => {
      res.json()
    }).then(jsonResp => {
      browserHistory.push('/admin')
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    return(
      <div>
        <InstructorPageForm handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default CreateInstructor

