
//  import { Slide } from "react-slideshow-image";
//  import "react-slideshow-image/dist/styles.css";
import '../../css/slide.css';
import { useState } from "react";
export default function Slider({ sliders }) {
  const [slides, setSlides] = useState(sliders);
//   const [slidersTypes, setSliderTypes] = useState(type);
  return (
    <div className="container">
      <Slide easing="ease">
        {slides.map((slide, index) => {
            console.log(slide);
          return (
            <div className="slide" key={index}>
              <img className="imageSlider"  src={`data:image/png;base64,${slide.img}`}></img>
            </div>
          );
        })}
      </Slide>
    </div>
  );
}