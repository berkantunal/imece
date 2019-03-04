import React from 'react';
import PropTypes from 'prop-types';
import scrollToElement from 'scroll-to-element';
import _ from 'lodash';
import ProductImages from './images';
import { Link, Title, SubscriberDegree } from '$/components/ui';
import { getDateDiff, jsonDecode } from '$/helpers/';
import { getCurrentPrice, getPrice } from '$/helpers/product';

import '$/assets/css/product.css';

const ProductView = props => {
  scrollToElement('.main-container', {
    duration: 100
  });

  const { product, subscribedProducts } = props;
  const finishDate = getDateDiff(product.finishDate);
  const tierPrice = jsonDecode(product.tierPrice);
  const total = getCurrentPrice(product.tierPrice, product.subscriberCount);
  const payRateTotal = getPrice(total, product.payRate);

  const isSubscribed = _.find(subscribedProducts, {
    Order: {
      productId: product.productId
    }
  });

  return (
    <div className="product-view">
      <div className="product-content pb-5">
        <div className="row">
          <div className="col-12 col-sm-5">
            {product.images && <ProductImages images={product.images} />}
          </div>
          <div className="col-12 col-sm-7">
            <div className="w-100 pb-4 d-flex flex-column flex-sm-row justify-content-between align-items-center">
              <div className="price">
                <span className="line-through mr-1">{product.oldPrice} TL</span>
                UcuzMax fiyatı
              </div>
              <div className="tier-price-content">
                {tierPrice.map(priceOpt => (
                  <div className="tier-price">
                    {priceOpt.requiredUserCount} kişiye kadar
                    <big className="ml-1">
                      <strong>{priceOpt.price} TL</strong>
                    </big>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex flex-wrap flex-sm-nowrap justify-centent-between align-items-center">
              <div className="w-100 pr-0 pr-md-5 pr-lg-0 pb-5 pb-sm-0">
                <SubscriberDegree tierPrice={tierPrice} subscriberCount={product.subscriberCount} />
              </div>
              <div>
                {finishDate.days <= 0 && <p>Katılım süresi bitti</p>}
                {isSubscribed ? (
                  <p className="orange">Katıldığınız için teşekkür Ederiz</p>
                ) : (
                  finishDate.days > 0 && (
                    <Link
                      className="btn-cart btn-lg"
                      to={`/checkout/${product.slug}/${product.productId}`}
                    >
                      Ürüne Katıl
                    </Link>
                  )
                )}
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="py-3 mb-0 user-subscribtion-info">
                Şu ana kadar ürüne {product.subscriberCount} kişi katıldı
              </p>
              <p className="py-3 mb-0 user-subscribtion-info bold orange">
                Bu ürüne katılmak için sadece {payRateTotal} TL ödeceksiniz.
              </p>
            </div>
            <ul className="detail-list list-unstyled">
              <li className="d-flex">
                <div className="title">İmece Firma:</div>
                <div className="value">{product.owner}</div>
              </li>
              <li className="d-flex">
                <div className="title">İmece Şehir:</div>
                <div className="value">{product.location}</div>
              </li>
              <li className="d-flex">
                <div className="title">Katılan:</div>
                <div className="value">{product.subscriberCount}</div>
              </li>
              <li className="d-flex">
                <div className="title">UcuzMax Bitişine Kalan Zaman:</div>
                <div className="value">
                  <big>
                    <strong className="orange">{finishDate.days} Gün</strong>
                  </big>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="product-detail-context p-3 mb-5">
        <p>{product.shortDescription}</p>
        <Title type="h3" extraClassName="bold mb-2 pb-2">
          Nasıl Çalışır ?
        </Title>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object.isRequired,
  subscribedProducts: PropTypes.object
};

export default ProductView;
