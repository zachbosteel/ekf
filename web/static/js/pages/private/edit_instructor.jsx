import React from 'react';
import { browserHistory } from 'react-router';
import 'whatwg-fetch';


import InstructorPageForm from './instructor_page_form';

class EditInstructor extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      instructorPage: {
        title: '',
        slug: '',
        texts: []
      },
      pageImage: {
        title: '',
        alt: '',
        path: ''
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.updateInstructor(this.props.params.instructor_id)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.params.instructor_id !== nextProps.params.instructor_id) {
      this.updateInstructor(nextProps.params.instructor_id);
    }
  }

  updateInstructor(id) {
    this.setState({id: id})
    fetch(`/api/instructor_page/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then( res => {
      return res.json()
    }).then( myJson => {
      this.setState({instructorPage: myJson.instructor_page})
      this.getPageImage();
    })
  }

  getPageImage() {
    this.setState({pageImage: this.state.instructorPage.images.filter(
      (image) => {
        return image.label === 'page-image';
      }
    )[0]})
    console.log(this.state)
  }

  handleSubmit(data) {
    fetch(`/api/instructor_page/${this.props.params.instructor_id}`, {
      method: 'PUT',
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
      <div className="edit-instructor">
        <InstructorPageForm handleSubmit={this.handleSubmit} 
          title={this.state.instructorPage.title}
          slug={this.state.instructorPage.slug}
          page_image={this.state.pageImage}
          description={this.state.instructorPage.texts[0]}
          deletable={true}
          id={this.state.id}
          />
      </div>
    )
  }
}

export default EditInstructor

