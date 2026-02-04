import React, { useState, Fragment } from 'react';
import HeroSection from './HeroSection';
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';

const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  function CarouselImage(image) {
    return (
    <div className = 'slide active'>
      <img src = {image} alt = '' className = 'image' />
    </div>
    )
  }

  return (
    <section className = 'slider'>
      <FaAngleDoubleLeft className = 'arrow' id = 'left' onClick = {prevSlide} />
      <FaAngleDoubleRight className = 'arrow' id = 'right' onClick = {nextSlide} />
      {slides.map((slide, index)  =>  {
        return (
          <Fragment key = {index}>
            {index  ===  current && (
              slide.type  ===  'image' ? CarouselImage(slide.data) : <HeroSection/>
            )}
          </Fragment>
        );
      })}
    </section>
  );
};

export default Carousel;
