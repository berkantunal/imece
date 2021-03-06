import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { SubscriberDegree, Link } from '.';
import { getPreviewImage } from '$/helpers/image';
import { getMinPrice } from '$/helpers/product';

import '$/assets/css/ui/product-grid-item.css';

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
    const { className, extraClassName, product } = this.props;
    const { title, owner, location, images, oldPrice, tierPrice, slug, subscriberCount } = product;
    const { price } = this.state;

    const previewImage = getPreviewImage(images);
    const link = `/p/${slug}`;

    return (
      <div className={cls(className, extraClassName)}>
        <div className="grid-item-content">
          <div className="grid-item px-2 py-3">
            <div className="row align-items-center">
              <div className="col-4 col-sm-3">
                <div className="image">
                  <Link to={link}>
                    <img src={previewImage} alt={title} />
                  </Link>
                </div>
              </div>
              <div className="col-8 col-sm-6">
                <div className="title-content d-sm-flex">
                  <div className="title">
                    <Link to={link}>{title}</Link>
                  </div>
                  <div className="owner ml-3">
                    <strong>{owner}</strong>
                  </div>
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
                </div>
              </div>
              <div className="col-12 col-sm-3 pt-5 pt-sm-0 align-self-end">
                <div className="subscribers text-center d-flex flex-column justify-content-between align-items-center">
                  <SubscriberDegree tierPrice={tierPrice} subscriberCount={subscriberCount} />
                  <p className="mb-0 mt-4 mb-4">
                    Toplam Katılımcı <big>{subscriberCount} Kişi</big>!
                  </p>
                </div>
                <Link className="btn more" to={link}>
                  AYRINTILARA BAKIN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GridItem.propTypes = {
  className: PropTypes.string,
  extraClassName: PropTypes.string,
  product: PropTypes.object
};

export default GridItem;
