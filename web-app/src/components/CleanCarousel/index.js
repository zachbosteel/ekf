import React from "react";

const Carousel = require('react-responsive-carousel').Carousel;

// deleted props from Carousel: onChange={onChange} onClickItem={onClickItem}

class CleanCarousel extends React.Component {
    render() {
        return (
            <Carousel showThumbs={false} showArrows={false} showStatus={false}>
                <div>
                    <img src="images/1.jpg" />
                    <p className="legend">Sanshou</p>
                </div>
                <div>
                    <img src="images/2.jpg" />
                    <p className="legend">Muay Thai</p>
                </div>
                <div>
                    <img src="images/3.jpg" />
                    <p className="legend">Jiu-Jitsu</p>
                </div>
                <div>
                    <img src="images/4.jpg" />
                    <p className="legend">Boxing</p>
                </div>
                <div>
                    <img src="images/5.jpg" />
                    <p className="legend">Wushu</p>
                </div>
                <div>
                    <img src="images/6.jpg" />
                    <p className="legend">MMA</p>
                </div>
            </Carousel>
        );
    }
};

export default CleanCarousel
