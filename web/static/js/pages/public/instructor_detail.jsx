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
    })
  }


  render() {
    return (
      <div>
       <h1>{this.state.instructor.title}</h1>
      </div>
    )
  }
}

export default InstructorDetail;
