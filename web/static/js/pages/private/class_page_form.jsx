import React from 'react';
import {browserHistory} from 'react-router';
import 'whatwg-fetch';


class ClassPageForm extends React.Component {
  constructor(props) {
    super(props);

    this.buildState(this.props)

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGalleryImageChange = this.handleGalleryImageChange.bind(this);
    this.handlePageImageChange = this.handlePageImageChange.bind(this); 
    this.handleDelete = this.handleDelete.bind(this);
  }


  buildState(props) {
    this.state = {
      title: props.title ? props.title : '',
      slug: props.slug ? props.slug : '',
      galleryImage: '',
      galleryImageTitle: props.gallery_image ? props.gallery_image.title : '',
      galleryImageAlt: props.gallery_image ? props.gallery_image.alt : '',
      galleryImagePreview: props.gallery_image ? props.gallery_image.path : '',
      pageImage: '',
      pageImageTitle: props.page_image ? props.page_image.title : '',
      pageImageAlt: props.page_image ? props.page_image.alt : '',
      pageImagePreview: props.page_image ? props.page_image.path : '',
      description: props.description ? props.description.body : '',
      id: props.id,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.buildState(nextProps);
  } 

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    const submittableState = {
      title: this.state.title,
      slug: this.createSlug(this.state.title),
      galleryImage: this.state.galleryImage,
      galleryImageTitle: this.state.galleryImageTitle,
      galleryImageAlt: this.state.galleryImageAlt,
      pageImage: this.state.pageImage,
      pageImageTitle: this.state.pageImageTitle,
      pageImageAlt: this.state.pageImageAlt,
      description: this.state.description,
    }
    for (var key in submittableState) {
      formData.append(key, submittableState[key])
    }
    this.props.handleSubmit(formData)
  }

  handleChange(event) {
    event.preventDefault();
    let updatedState = {}
    updatedState[event.target.name] = event.target.value
    this.setState(updatedState);
  }

  handleGalleryImageChange(e) {
      e.preventDefault();

      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        this.setState({
          galleryImage: file,
          galleryImagePreview: reader.result
        });
      }

      reader.readAsDataURL(file)
  }

  handlePageImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        pageImage: file,
        pageImagePreview: reader.result
      });
    }


    reader.readAsDataURL(file)
  }


  handleDelete(e) {
    e.preventDefault()
    fetch(`/api/class_page/${this.state.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
      }
    }).then( res => {
      res.json()
    }).then( jsonRes => {
      browserHistory.push('/admin')
    })
  }

  createSlug(title) {
    return title.toLowerCase().split(" ").join("-")
  }

  render() {
    let {galleryImagePreview} = this.state;
    let {pageImagePreview} = this.state;
    let $galleryImage = null
    if (galleryImagePreview) {
      $galleryImage = (<img src={galleryImagePreview} />);
    } else {
      $galleryImage = (<div className="previewText">Please select an Image for Preview</div>);
    }
    let $pageImage = null
    if (pageImagePreview) {
      $pageImage = (<img src={pageImagePreview} />);
    } else {
      $pageImage = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return(
      <form className="class-page-form" formEncType="multipart/form-data" onSubmit={this.handleSubmit}>
        <label className="class-page-label-1">
          Class Name: 
          <input className="class-page-input" type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
          Description:
          <textarea className="class-page-textarea" name="description" value={this.state.description} onChange={this.handleChange}/>
        </label>
        <label className="class-page-label-2">
          Gallery Image:
          <input className="class-page-input" type="text" placeholder="Image Title" name="galleryImageTitle" value={this.state.galleryImageTitle} onChange={this.handleChange}/>
          <textarea className="class-page-textarea" placeholder="Image Alt Text" name="galleryImageAlt" value={this.state.galleryImageAlt} onChange={this.handleChange}/>
          <input type="file" name="galleryImage" onChange={this.handleGalleryImageChange} />
          <div className="imgPreview">
            {$galleryImage}
          </div>
        </label>
        <label className="class-page-label-3">
          Page Image:
          <input className="class-page-input" type="text" placeholder="Image Title" name="pageImageTitle" value={this.state.pageImageTitle} onChange={this.handleChange}/>
          <textarea className="class-page-textarea" placeholder="Image Alt Text" name="pageImageAlt" value={this.state.pageImageAlt} onChange={this.handleChange}/>
          <input type="file" name="pageImage" onChange={this.handlePageImageChange} />
          <div className="imgPreview">
            {$pageImage}
          </div>
        </label>
        <div className="class-page-submit">
          <button type="submit">Submit</button>
        </div>
        { this.props.deletable ? <div className="class-page-delete"><button type="button" onClick={this.handleDelete}>Delete</button></div> : <div></div> }
      </form>
    )  
  }
}

export default ClassPageForm;
