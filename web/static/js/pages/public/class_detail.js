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

  updateClass(id) {
    axios.get(`/api/class_page/${id}`)
    .then(res => {
      this.setState({class: res.data.class_page});
    })
  }


  render() {
    return (
      <div>
       <h1>{this.state.class.title}</h1>
      </div>
    )
  }
}

export default ClassDetail;
