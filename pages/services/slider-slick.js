import React, { useRef } from "react";
import Slider from "react-slick";

function SlickSlider({array}) {

    // https://react-slick.neostack.com/docs/example/dynamic-slides - здесь разные варианты слайдера

    let sliderRef = useRef(null);
    const play = () => {
      sliderRef.slickPlay();
    };
    const pause = () => {
      sliderRef.slickPause();
    };
  
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000
    };

    
    return (
        <div className="slider-container">
        {array&&array.length>4 &&
            <>
                <Slider ref={slider => (sliderRef = slider)} {...settings}>
                {
                array.map ((x,i) => 
                    <>
                        <div>
                            {x.img!=="undefined" &&
                                <a href={`${x.page}`}>
                                    <img src={`${x.img}`} />
                                </a>
                            }                           
                        </div>
                    </>)
                }
                </Slider>
                <div style={{ textAlign: "center" }}>
                <button className="buttonSlider" onClick={play}>
                    <img src="/icons/icon_slider_start.png" />
                </button>
                <button className="buttonSlider" onClick={pause}>
                <img src="/icons/icon_slider_stop.png" />
                </button>
                </div>
            </>
        }
      </div>
    );
    }

export default SlickSlider;