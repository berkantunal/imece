import React from 'react';
import { Slider } from '$/components/ui/';
import Search from './slider/search';
import { getImageLink } from '$/helpers/image';

const HomeSlider = () => (
  <div className="main-slider">
    <Slider
      settings={{
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        speed: 500
      }}
    >
      <div className="slider-item">
        <picture>
          <source media="(min-width: 650px)" srcSet={getImageLink('slider-1.jpg')} />
          <source media="(max-width: 650px)" srcSet={getImageLink('slider-1-mobile.jpg')} />
          <img src={getImageLink('slider-1.jpg')} alt="Slider 1" />
        </picture>
      </div>
      <div className="slider-item">
        <picture>
          <source media="(min-width: 650px)" srcSet={getImageLink('slider-2.jpg')} />
          <source media="(max-width: 650px)" srcSet={getImageLink('slider-2-mobile.jpg')} />
          <img src={getImageLink('slider-2.jpg')} alt="Slider 2" />
        </picture>
      </div>
      <div className="slider-item">
        <picture>
          <source media="(min-width: 650px)" srcSet={getImageLink('slider-3.jpg')} />
          <source media="(max-width: 650px)" srcSet={getImageLink('slider-3-mobile.jpg')} />
          <img src={getImageLink('slider-3.jpg')} alt="Slider 3" />
        </picture>
      </div>
    </Slider>
    <Search />
  </div>
);

export default HomeSlider;
