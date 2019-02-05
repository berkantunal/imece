import React from 'react';
import { Slider, Title } from '$/components/ui/';

const CategorySlider = () => (
  <div className="category-slider pb-4">
    <Title type="h1" extraClassName="underline text-center bold py-5">
      <span>KATEGORİLER</span>
    </Title>
    <Slider
      settings={{
        arrows: true,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 3,
        speed: 500
      }}
    >
      <div className="category-slider-item">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="icon">
            <i className="fa fa-car" />
          </div>
          <Title type="h3" extraClassName="bold mt-3">
            OTOMOBİL
          </Title>
        </div>
      </div>
      <div className="category-slider-item">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="icon">
            <i className="fa fa-shopping-cart" />
          </div>
          <Title type="h3" extraClassName="bold mt-3">
            OTOMOBİL
          </Title>
        </div>
      </div>
      <div className="category-slider-item">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="icon">
            <i className="fa fa-swimmer" />
          </div>
          <Title type="h3" extraClassName="bold mt-3">
            OTOMOBİL
          </Title>
        </div>
      </div>
      <div className="category-slider-item">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="icon">
            <i className="fa fa-car" />
          </div>
          <Title type="h3" extraClassName="bold mt-3">
            OTOMOBİL
          </Title>
        </div>
      </div>
      <div className="category-slider-item">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="icon">
            <i className="fa fa-shopping-cart" />
          </div>
          <Title type="h3" extraClassName="bold mt-3">
            OTOMOBİL
          </Title>
        </div>
      </div>
      <div className="category-slider-item">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="icon">
            <i className="fa fa-swimmer" />
          </div>
          <Title type="h3" extraClassName="bold mt-3">
            OTOMOBİL
          </Title>
        </div>
      </div>
    </Slider>
  </div>
);

export default CategorySlider;
