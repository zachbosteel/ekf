import React from 'react';
import { browserHistory } from 'react-router';
import 'whatwg-fetch';
 
class EditStatic extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      staticPage: {},
      texts: [],
      images: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.displayImage = this.displayImage.bind(this)
  }


  componentDidMount() {
    this.updatePage(this.props.params.static_id)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.params.static_id !== nextProps.params.static_id) {
      this.updatePage(nextProps.params.static_id);
    }
  }

  updatePage(id) {
    fetch(`/api/static_page/${id}`, {
      method: 'GET',
    }).then( res => {
      return res.json()
    }).then( myJson => {
      this.setState({staticPage: myJson.static_page,
                     images: myJson.static_page.images,
                     texts: myJson.static_page.texts,
                     imageIds: myJson.static_page.images.map((image) => { return image.id }),
                     textIds: myJson.static_page.texts.map((text) => { return text.id })})
      this.getTexts();
      this.getImages();
    })
  }

  getTexts() {
    for (const text of this.state.texts) {
      let updatedState = {}
      updatedState[text.label] = text.body
      this.setState(updatedState)
    }
  }

  getImages() {
    for (const image of this.state.images) {
      let updatedState = {};
      for (const key of Object.keys(image)){
        const newKey = `${image.label}-${key}`
        updatedState[newKey] = image[key];
      }
      this.setState(updatedState);
      this.displayImage(image.label);
    }
  }

  handleTextChange(e) {
    e.preventDefault()
    let updatedState = {}
    updatedState[e.target.name] = e.target.value
    this.setState(updatedState);
  }

  handleImageChange(e) {
      e.preventDefault();

      let reader = new FileReader();
      let file = e.target.files[0];
      let name = e.target.name

      reader.onloadend = () => {
        let updatedState = {}
        updatedState[`${name}-image`] = file
        updatedState[`${name}-path`] = reader.result
        this.setState(updatedState);
        this.displayImage(name);
      }

      reader.readAsDataURL(file)
  }


  displayImage(name) {
    let displayImage = this.state[`${name}-path`] ? <img src={this.state[`${name}-path`]} /> : <div className="previewText">Please select an Image for Preview</div>
    let updatedState = {};
    updatedState[`${name}-displayImage`] = displayImage;
    this.setState(updatedState);
  }

  handleSubmit(e) {
    e.preventDefault()
    // TURN STATE INTO FORM DATA
    let data = new FormData()
    for (var key in this.state){
      data.append(key, this.state[key])
    }

    fetch(`/api/static_page/${this.props.params.static_id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
      },
      body: data
    }).then(res => { 
      browserHistory.push('/admin')
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    return(
     <form className="static-page-form" formEncType="multipart/form-data" onSubmit={this.handleSubmit}> 
        <div className="static-page-texts">
          {this.state.texts.map( (text) => {
            return (<label className="static-form-text-label" key={text.label}>
              {text.label}
              <textarea className="static-page-textarea"
                name={text.label} 
                value={this.state[text.label]} 
                onChange={this.handleTextChange} />
              </label>)
          })}
        </div>
        <div className="static-page-images" >
          {this.state.images.map((image) => {
          return (<label className="static-form-image-label" key={image.label}>
            {image.label}<br />
            <input className="static-page-input" 
                   type="text" 
                   placeholder="Image Title" 
                   name={`${image.label}-title`} 
                   value={this.state[`${image.label}-title`]} 
                   onChange={this.handleTextChange} /><br />
            <textarea className="static-page-textarea" 
                      placeholder="Image Alt Text" 
                      name={`${image.label}-alt`}  
                      value={this.state[`${image.label}-alt`]} 
                      onChange={this.handleTextChange}/><br />
            <input type="file" 
                   name={`${image.label}`}
                   onChange={this.handleImageChange} />
            <div className="imgPreview">
              { this.state[`${image.label}-displayImage`] }
            </div>
          </label>)
          })}
        </div>
        <div className="static-page-submit">
          <button type="submit">Submit</button>
        </div>
     </form>
    )
  }

}

export default EditStatic




//           
//           
          
