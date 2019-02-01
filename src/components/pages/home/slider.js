import React from 'react';
import { Slider, Search } from '$/components/ui/';

const HomeSlider = () => (
  <div className="main-slider">
    <Slider
      settings={{
        arrows: false,
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        speed: 500,
      }}
    >
      <div className="slider-item">
        <picture>
          <source
            media="(min-width: 650px)"
            srcSet="https://via.placeholder.com/1920x500.png?text=1920x500"
          />
          <source
            media="(max-width: 650px)"
            srcSet="https://via.placeholder.com/500x500.png?text=500x500"
          />
          <img src="https://via.placeholder.com/1920x500.png?text=1920x500" alt="Slider 1" />
        </picture>
      </div>
      <div className="slider-item">
        <picture>
          <source
            media="(min-width: 650px)"
            srcSet="https://via.placeholder.com/1920x500.png?text=1920x500"
          />
          <source
            media="(max-width: 650px)"
            srcSet="https://via.placeholder.com/500x500.png?text=500x500"
          />
          <img src="https://via.placeholder.com/1920x500.png?text=1920x500" alt="Slider 1" />
        </picture>
      </div>
    </Slider>
    <Search />
  </div>
);

export default HomeSlider;
