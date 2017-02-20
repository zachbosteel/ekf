import React from "react";
import axios from "axios";

import CleanCarousel from "../../carousel/carousel"

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      properties: {},
      texts: {},
      images: {},
      galleryImages: [],
      galleryLoaded: false
    }
  }

  getTexts(static_page) {
    const initial_texts = static_page.texts;
    const texts = {};
    for (let text of initial_texts) {
      texts[text.label] = text.body;
    }
    this.setState({ texts });
  }

  componentDidMount() {
    axios.get(`/api/static_page/1`)
      .then(res => {
        const properties = res.data.static_page;
        this.getTexts(properties);
        this.setState({ properties });
      });
    axios.get('/api/images/gallery')
      .then(res => {
        console.log(res)
        const galleryImages = res.data.images;
        this.setState({galleryImages: galleryImages})
        this.setState({galleryLoaded: true})
      })
  }

  render() {
    return(
      <div>
        {this.state.galleryLoaded ?  <CleanCarousel images={this.state.galleryImages} /> : <div className="carouselHolder" />}
        <div className="home-text-1">
          <h1 className="home-header">{this.state.texts['home-header-1']}</h1>
          <p className="home-paragraph">{this.state.texts['home-paragraph-1']}</p>
        </div>
        <div className="parallax"> 
        </div>
        <div className="home-text-2">
          <h1 className="home-header">{this.state.texts['home-header-2']}</h1>
          <p className="home-paragraph">{this.state.texts['home-paragraph-2']}</p>
        </div>
      </div>
    )
  } 
}

export default Home;
