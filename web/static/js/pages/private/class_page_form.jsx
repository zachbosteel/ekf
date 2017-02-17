import React from 'react';


class ClassPageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title ? this.props.title : '',
      slug: this.props.slug ? this.props.slug : '',
      galleryImage: this.props.gallery_image.path ? this.props.gallery_image.path : '',
      pageImage: this.props.page_image.path ? this.props.page_image.path : '',
      description: this.props.description.body ? this.props.description.body : '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.handleSubmit(event)
  }

  handleChange(event, targetField) {
    value = event.target.value
    this.setState(eval(`${targetField}: ${value}`))
  }

  render() {
    return(
      <form className="class-page-form" onSubmit={this.handleSubmit}>
        <label for="title"> 
          <input type="text" value={this.state.title} onChange={this.handleChange('title')}/>
        </label>
        <label for="description">
          <input type="text" value={this.state.description} onChange={this.handleChange('description')}/>
        </label>
      </form>
    )  
  }
}

export default ClassPageForm;
