
//  import { Slide } from "react-slideshow-image";
//  import "react-slideshow-image/dist/styles.css";
// import '../../css/slide.css';
// import { useState } from "react";
// export default function Slider({ sliders }) {
//   const [slides, setSlides] = useState(sliders);
//   // const [slidersTypes, setSliderTypes] = useState(type);
//   return (
//     <div className="container">
//       <Slide easing="ease">
//         {slides.map((slide, index) => {
//           return (
//             <div className="slide" key={index}>
//               <img className="imageSlider"  src={`data:image/png;base64,${slide.img}`}></img>
//             </div>
//           );
//         })}
//       </Slide>
//     </div>
//   );
// }
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import '../../css/slide.css';
import { useState, useRef, useEffect } from "react";

export default function Slider({currentSlide,sliders }) {
  const slideRef = useRef();
  const [slides] = useState(sliders);

  useEffect(()=>{
    slideRef.current.goTo(currentSlide);

  },[currentSlide])

  const handleNext = () => {
    const nextSlide = (currentSlide + 1) % slides.length;
    slideRef.current.goTo(nextSlide);
    // setCurrentSlide(nextSlide);
  };

  const handlePrev = () => {
    const prevSlide = (currentSlide - 1 + slides.length) % slides.length;
    slideRef.current.goTo(prevSlide);
    // setCurrentSlide(prevSlide);
  };

  return (
    <div className="container">
      <Slide ref={slideRef} easing="ease" autoplay={false}>
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            <img
              className="imageSlider"
              src={`data:image/png;base64,${slide.img}`}
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </Slide>
      <div className="controls">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
