
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
//             console.log(slide);
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
import { useState } from "react";

export default function Slider({ sliders }) {
  const [slides, setSlides] = useState(sliders);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="container">
      <Slide
        easing="ease"
        autoplay={false}
        defaultIndex={currentSlide}
        onChange={(oldIndex, newIndex) => setCurrentSlide(newIndex)}
      >
        {slides.map((slide, index) => {
          return (
            <div className="slide" key={index}>
              <img
                className="imageSlider"
                src={`data:image/png;base64,${slide.img}`}
                alt={`Slide ${index}`}
              />
            </div>
          );
        })}
      </Slide>
      <div className="controls">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
