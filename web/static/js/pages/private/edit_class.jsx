import React from 'react';
import { browserHistory } from 'react-router';
import 'whatwg-fetch';


import ClassPageForm from './class_page_form';

class EditClass extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      classPage: {
        title: '',
        slug: '',
        texts: []
      },
      galleryImage: {
        title: '',
        alt: '',
        path: ''
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
    this.updateClass(this.props.params.class_id)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.params.class_id !== nextProps.params.class_id) {
      this.updateClass(nextProps.params.class_id);
    }
  }

  updateClass(id) {
    this.setState({id: id})
    fetch(`/api/class_page/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then( res => {
      return res.json()
    }).then( myJson => {
      this.setState({classPage: myJson.class_page})
      this.getGalleryImage();
      this.getPageImage();
    })
  }

  getGalleryImage() {
    this.setState({galleryImage: this.state.classPage.images.filter(
      (image) => {
        return image.label === 'gallery-image';
      }
    )[0]})
  }

  getPageImage() {
    this.setState({pageImage: this.state.classPage.images.filter(
      (image) => {
        return image.label === 'page-image';
      }
    )[0]})
  }

  handleSubmit(data) {
    fetch(`/api/class_page/${this.props.params.class_id}`, {
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
      <div className="edit-class">
        <ClassPageForm handleSubmit={this.handleSubmit} 
          title={this.state.classPage.title}
          slug={this.state.classPage.slug}
          gallery_image={this.state.galleryImage}
          page_image={this.state.pageImage}
          description={this.state.classPage.texts[0]}
          deletable={true}
          id={this.state.id}
          />
      </div>
    )
  }
}

export default EditClass
