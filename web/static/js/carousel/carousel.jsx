import React from "react";

const Carousel = require('react-responsive-carousel').Carousel;

// deleted props from Carousel: onChange={onChange} onClickItem={onClickItem}

class CleanCarousel extends React.Component {


    render() {
        console.log(this.props)
        let renderableImages = []
        if (this.props.images) {
            renderableImages = this.props.images
        } else {
            renderableImages = []
        }
        return (
            <Carousel showThumbs={false} 
                      infiniteLoop={true}
                      showArrows={false} 
                      showStatus={false}
                      autoPlay={true}
                      interval={5000}
                      className='my-carousel'> 
                {renderableImages.map((image, i) => {
                    return(
                        <div key={image.title}>
                            <img src={image.path} />
                            <p className="legend">{image.title}</p>
                        </div>
                    );   
                })} 
            </Carousel>
        );
    }
};




export default CleanCarousel
