import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '$/assets/css/ui/slider.css';

const UISlider = props => {
  const { settings, children } = props;
  return (
    <Slider className="slider" {...settings}>
      {children}
    </Slider>
  );
};

UISlider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  settings: PropTypes.object.isRequired,
};

export default UISlider;
