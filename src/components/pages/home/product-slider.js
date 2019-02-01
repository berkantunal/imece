import React from 'react';
import { Slider, Title, SliderProductItem } from '$/components/ui/';

const ProductSlider = () => (
  <div className="product-slider mb-5">
    <Title type="h2" extraClassName="text-center regular gray-top-border py-4">
      YENİ BAŞLAYAN İMECELER
    </Title>
    <Slider
      settings={{
        arrows: true,
        dots: true,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 3,
        speed: 500,
      }}
    >
      <div className="product-slider-item d-flex flex-column">
        <SliderProductItem extraClassName="mx-4" />
      </div>
      <div className="category-slider-item d-flex flex-column">
        <SliderProductItem extraClassName="mx-4" />
      </div>
      <div className="category-slider-item d-flex flex-column">
        <SliderProductItem extraClassName="mx-4" />
      </div>
      <div className="category-slider-item d-flex flex-column">
        <SliderProductItem extraClassName="mx-4" />
      </div>
      <div className="category-slider-item d-flex flex-column">
        <SliderProductItem extraClassName="mx-4" />
      </div>
    </Slider>
  </div>
);

export default ProductSlider;
