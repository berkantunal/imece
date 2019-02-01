import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { SubscriberIcons, Link } from '.';

import '$/assets/css/ui/slider-product-item.css';

const SliderProductItem = props => {
  const { className, extraClassName, data } = props;
  return (
    <div className={cls(className, extraClassName)}>
      <div className="image">
        <img src={data.image} alt={data.title} />
      </div>
      <div className="detail px-3 py-2">
        <div className="owner">{data.owner}</div>
        <div className="title">{data.title}</div>
        <div className="subscribers">
          <SubscriberIcons
            requiredUserCount={data.requiredUserCount}
            subscriberCount={data.subscriberCount}
          />
        </div>
        <Link className="more" to="/">
          <i className="fa fa-angle-right" />
        </Link>
      </div>
    </div>
  );
};

SliderProductItem.defaultProps = {
  className: 'slider-product-item',
  data: {
    discountedPrice: 28000,
    image: 'https://via.placeholder.com/250x200.png?text=250x200',
    location: 'Ankara',
    owner: 'TOYOTA PLAZA',
    price: 40000,
    requiredUserCount: 8,
    subscriberCount: 4,
    title: 'COROLLA 2019',
  },
};

SliderProductItem.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  extraClassName: PropTypes.string,
};

export default SliderProductItem;
