import React from "react";
import axios from "axios";

class Schedule extends React.Component {
  constructor(props) {
    super(props)
    
    this.id = 6
  }

  componentWillMount() {
    this.props.getContent(this.id);
  }

  render() {
    const scrollStyle = {
      overflow: scroll,
    }
    return(
      <div className="non-home-page schedule-page">
        <h1>Schedule</h1>
        <div className='embed-div' style={scrollStyle}>
          <embed className='schedule-image' src='/images/ekf_updated_sched_2018.jpg' />
        </div>
     </div>
    )
  } 
}

export default Schedule;
