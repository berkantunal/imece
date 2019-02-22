import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { Link } from '.';
import { getPreviewImage } from '$/helpers/image';

import '$/assets/css/ui/slider-product-item.css';

const SliderProductItem = props => {
  const { className, extraClassName, product } = props;
  const { title, owner, images, slug } = product;
  const link = `/p/${slug}`;

  return (
    <div className={cls(className, extraClassName)}>
      <div className="image">
        <Link to={link}>
          <img src={getPreviewImage(images)} alt={title} />
        </Link>
      </div>
      <div className="detail px-3 py-2">
        <div className="owner">{owner}</div>
        <div className="title">
          <Link to={link}>{title}</Link>
        </div>
        <Link className="more" to={link}>
          <i className="fa fa-angle-right" />
        </Link>
      </div>
    </div>
  );
};

SliderProductItem.defaultProps = {
  className: 'slider-product-item'
};

SliderProductItem.propTypes = {
  className: PropTypes.string,
  extraClassName: PropTypes.string,
  product: PropTypes.object
};

export default SliderProductItem;
