import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { SubscriberIcons, Link } from '.';

import '$/assets/css/ui/product-list-item.css';

const ListItem = props => {
  const { className, extraClassName, data } = props;
  return (
    <div className={cls(className, extraClassName)}>
      <div className="list-item px-2 py-3">
        <div className="owner">{data.owner}</div>
        <div className="title">{data.title}</div>
        <div className="image my-3">
          <img src={data.image} alt={data.title} />
        </div>
        <div className="detail">
          <div className="location">
            <i className="fa fa-map-marker-alt" />
            {data.location}
          </div>
          <div className="price d-flex justify-content-between">
            <div className="old-price">
              <i className="fa fa-tag" />
              <span className="line-through">{data.price} TL</span>
            </div>
            <div className="discounted-price">
              imece fiyatı
              <big>{data.discountedPrice} TL</big>
            </div>
          </div>
          <div className="comments">
            <i className="fa fa-comment" />
            Yorumlar
          </div>
          <div className="subscribers text-center">
            <SubscriberIcons
              requiredUserCount={data.requiredUserCount}
              subscriberCount={data.subscriberCount}
            />
            <p className="mb-0">
              <strong>İmece Fiyatına</strong> <br />
              Sahip Olmak İçin <br />
              sadece <big>{data.requiredUserCount - data.subscriberCount} Kişi</big> Kaldı!
            </p>
          </div>
          <Link className="btn more" to="/product">
            AYRINTILARA BAKIN
          </Link>
        </div>
      </div>
    </div>
  );
};

ListItem.defaultProps = {
  data: {
    discountedPrice: 28000,
    image: 'https://via.placeholder.com/250x150.png?text=250x150',
    location: 'Ankara',
    owner: 'TOYOTA PLAZA',
    price: 40000,
    requiredUserCount: 8,
    subscriberCount: 4,
    title: 'COROLLA 2019'
  }
};

ListItem.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  extraClassName: PropTypes.string
};

export default ListItem;
