import React from 'react';


class InstructorPageForm extends React.Component {
  constructor(props) {
    super(props);

    this.buildState(this.props)

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageImageChange = this.handlePageImageChange.bind(this);
  }


  buildState(props) {
    this.state = {
      title: props.title ? props.title : '',
      slug: props.slug ? props.slug : '',
      pageImage: '',
      pageImageTitle: props.page_image ? props.page_image.title : '',
      pageImageAlt: props.page_image ? props.page_image.alt : '',
      pageImagePreview: props.page_image ? props.page_image.path : '',
      description: props.description ? props.description.body : '',
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

  createSlug(title) {
    return title.toLowerCase().split(" ").join("-")
  }

  render() {
    let {pageImagePreview} = this.state;
    let $pageImage = null
    if (pageImagePreview) {
      $pageImage = (<img src={pageImagePreview} />);
    } else {
      $pageImage = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return(
      <form className="instructor-page-form" formEncType="multipart/form-data" onSubmit={this.handleSubmit}>
        <label className="instructor-page-label-1">
          Instructor Name: 
          <input className="instructor-page-input" type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
          Bio:
          <textarea className="instructor-page-textarea" name="description" value={this.state.description} onChange={this.handleChange}/>
        </label>
        <label className="instructor-page-label-2">
          Page Image:
          <input className="instructor-page-input" type="text" placeholder="Image Title" name="pageImageTitle" value={this.state.pageImageTitle} onChange={this.handleChange}/>
          <textarea className="instructor-page-textarea" placeholder="Image Alt Text" name="pageImageAlt" value={this.state.pageImageAlt} onChange={this.handleChange}/>
          <input type="file" name="pageImage" onChange={this.handlePageImageChange} />
          <div className="imgPreview">
            {$pageImage}
          </div>
        </label>
        <div className="instructor-page-submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    )  
  }
}

export default InstructorPageForm;

