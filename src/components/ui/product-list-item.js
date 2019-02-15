import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { SubscriberIcons, Link, Button } from '.';
import { getPreviewImage } from '$/helpers/image';

import '$/assets/css/ui/product-list-item.css';

const ListItem = props => {
  const { actions, className, extraClassName, handleRemove, handleUpdate, product } = props;
  const {
    title,
    owner,
    location,
    images,
    oldPrice,
    price,
    requiredUserCount,
    slug,
    subscriberCount
  } = product;

  const previewImage = getPreviewImage(images);

  return (
    <div className={cls(className, extraClassName)}>
      <div className="list-item-content">
        <div className="list-item px-2 py-3">
          <div className="owner">{owner}</div>
          <div className="title">{title}</div>
          <div className="image my-3">
            <img src={previewImage} alt={title} />
          </div>
          <div className="detail">
            <div className="location">
              <i className="fa fa-map-marker-alt" />
              {location}
            </div>
            <div className="price d-flex justify-content-between">
              <div className="old-price">
                <i className="fa fa-tag" />
                <span className="line-through">{oldPrice} TL</span>
              </div>
              <div className="discounted-price">
                imece fiyatı
                <big>{price} TL</big>
              </div>
            </div>
            <div className="comments">
              <i className="fa fa-comment" />
              Yorumlar
            </div>
            <div className="subscribers text-center">
              <SubscriberIcons
                requiredUserCount={requiredUserCount}
                subscriberCount={subscriberCount}
              />
              <p className="mb-0">
                <strong>İmece Fiyatına</strong> <br />
                Sahip Olmak İçin <br />
                sadece <big>{requiredUserCount - subscriberCount} Kişi</big> Kaldı!
              </p>
            </div>
            <Link className="btn more" to={`/p/${slug}`}>
              AYRINTILARA BAKIN
            </Link>
          </div>
        </div>
        {actions && (
          <div className="actions d-flex">
            <Button extraClassName="btn-danger w-50" onClick={() => handleRemove(product)}>
              <i className="fa fa-times mr-2" />
              Sil
            </Button>
            <Button extraClassName="btn-orange w-50" onClick={() => handleUpdate(product)}>
              <i className="fa fa-pen mr-2" />
              Düzenle
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

ListItem.propTypes = {
  actions: PropTypes.bool,
  className: PropTypes.string,
  extraClassName: PropTypes.string,
  handleRemove: PropTypes.func,
  handleUpdate: PropTypes.func,
  product: PropTypes.object
};

export default ListItem;
