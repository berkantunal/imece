import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Title, SliderProductItem } from '$/components/ui/';

const ProductSlider = props => {
  const { title } = props;

  return (
    <div className="product-slider mb-5">
      <Title type="h2" extraClassName="text-center regular gray-top-border py-4">
        {title}
      </Title>
      <Slider
        settings={{
          arrows: true,
          dots: true,
          infinite: true,
          slidesToScroll: 1,
          slidesToShow: 3,
          speed: 500
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
};

ProductSlider.propTypes = {
  title: PropTypes.string
};

export default ProductSlider;
