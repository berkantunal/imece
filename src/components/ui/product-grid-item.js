import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { SubscriberDegree, Link, Button } from '.';
import { getPreviewImage } from '$/helpers/image';
import { getMinPrice } from '$/helpers/product';

import '$/assets/css/ui/product-list-item.css';

class GridItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0
    };
  }

  componentDidMount() {
    this.setPrice();
  }

  async setPrice() {
    const { product } = this.props;
    const { tierPrice } = product;

    const minPrice = await getMinPrice(tierPrice);

    this.setState({
      ...this.state,
      price: minPrice
    });
  }

  render() {
    const { actions, className, extraClassName, handleRemove, handleUpdate, product } = this.props;
    const { title, owner, location, images, oldPrice, tierPrice, slug, subscriberCount } = product;
    const { price } = this.state;

    const previewImage = getPreviewImage(images);
    const link = `/p/${slug}`;

    return (
      <div className={cls(className, extraClassName)}>
        <div className="list-item-content">
          <div className="list-item px-2 pt-2 pb-3">
            <div className="owner">{owner}</div>
            <div className="title">
              <Link to={link}>{title}</Link>
            </div>
            <div className="image my-3">
              <Link to={link}>
                <img src={previewImage} alt={title} />
              </Link>
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
                  UcuzMax&lsquo;ta
                  <big>{price} TL</big>
                </div>
              </div>
              <div className="comments">
                <i className="fa fa-comment" />
                Yorumlar
              </div>
              <div className="subscribers text-center">
                <SubscriberDegree tierPrice={tierPrice} subscriberCount={subscriberCount} />
                <p className="mb-0 mt-4">
                  Toplam Katılımcı <big>{subscriberCount} Kişi</big>!
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
  }
}

GridItem.propTypes = {
  actions: PropTypes.bool,
  className: PropTypes.string,
  extraClassName: PropTypes.string,
  handleRemove: PropTypes.func,
  handleUpdate: PropTypes.func,
  product: PropTypes.object
};

export default GridItem;
