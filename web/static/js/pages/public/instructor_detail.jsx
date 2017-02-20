import React from "react";
import axios from "axios";


class InstructorDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      instructor: {}
    }

    this.updateInstructor = this.updateInstructor.bind(this);
  }

  componentDidMount() {
    this.updateInstructor(this.props.params.instructor_id);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.params.instructor_id !== nextProps.params.instructor_id) {
      this.updateInstructor(nextProps.params.instructor_id);
    }
  } 

  updateInstructor(id) {
    axios.get(`/api/instructor_page/${id}`)
    .then(res => {
      this.setState({instructor: res.data.instructor_page});
      this.getText();
      this.getImage();
    })
  }


  getText() {
    this.setState({description: this.state.instructor.texts[0] })
  }

  getImage() {
    const image = this.state.instructor.images.filter((image) => {return image.label === 'page-image'})
    this.setState({image: image[0]})
  }

  updateinstructor(id) {
    axios.get(`/api/instructor_page/${id}`)
    .then(res => {
      this.setState({instructor: res.data.instructor_page});
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
      <div className="non-home-page instructor-detail">
        <div className="hero">
          {image}
          <h1>{this.state.instructor.title}</h1>
        </div>
        <p>{description}</p>
      </div>
    )
  }
}

export default InstructorDetail;
