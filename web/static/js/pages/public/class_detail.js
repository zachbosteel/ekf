import React from "react";
import axios from "axios";


class ClassDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      class: {}
    }

    this.updateClass = this.updateClass.bind(this);
  }

  componentDidMount() {
    this.updateClass(this.props.params.class_id);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.params.class_id !== nextProps.params.class_id) {
      this.updateClass(nextProps.params.class_id);
    }
  } 

  getText() {
    this.setState({description: this.state.class.texts[0] })
  }

  getImage() {
    const image = this.state.class.images.filter((image) => {return image.label === 'page-image'})
    this.setState({image: image[0]})
  }

  updateClass(id) {
    axios.get(`/api/class_page/${id}`)
    .then(res => {
      this.setState({class: res.data.class_page});
      this.getText();
      this.getImage();
    })
  }

  render() {
    let image = null;
    let description = null;
    if (this.state.image) {
      image = <img src={this.state.image.path} alt={this.state.image.alt} />
    }
    if (this.state.description) {
      description = this.state.description.body
    }
    return (
      <div className="non-home-page class-detail">
        <div className="hero">
          {image}
          <h1>{this.state.class.title}</h1>
        </div>
        <p>{description}</p>
      </div>
    )
  }
}

export default ClassDetail;
