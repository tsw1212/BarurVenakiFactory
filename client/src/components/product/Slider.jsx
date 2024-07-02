import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import '../../css/slide.css';
import {  useRef, useEffect } from "react";

export default function Slider({ currentSlide, sliders }) {
  const slideRef = useRef();

  useEffect(() => {
    slideRef.current.goTo(currentSlide);
  }, [currentSlide]);

  return (
    <div className="containerSlise">
      <Slide ref={slideRef} easing="ease" autoplay={false}>
        {sliders.map((slide, index) => (
          <div className="slide" key={index}>
            <img
              className="imageSlider"
              src={`data:image/png;base64,${slide.img}`}
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </Slide>

    </div>
  );
}
