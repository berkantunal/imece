import React from 'react';
import PropTypes from 'prop-types';
import ProductImages from './images';
import { Button, Title, SubscriberDegree } from '$/components/ui';
import { getDateDiff, jsonDecode } from '$/helpers/';

import '$/assets/css/product.css';

const ProductView = props => {
  const { product } = props;
  const finishDate = getDateDiff(product.finishDate);
  const tierPrice = jsonDecode(product.tierPrice);

  return (
    <div className="product-view">
      <div className="product-content pb-5">
        <div className="row">
          <div className="col-5">{product.images && <ProductImages images={product.images} />}</div>
          <div className="col-7">
            <div className="w-100 pb-4 d-flex justify-content-between align-items-center">
              <div className="price">
                imece fiyatı
                <span className="line-through ml-1">{product.oldPrice} TL</span>
              </div>
              <div className="tier-price-content">
                {tierPrice.map(priceOpt => (
                  <div className="tier-price">
                    {priceOpt.requiredUserCount} kişiye kadar <big>{priceOpt.price} TL</big>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex justify-centent-between align-items-center">
              <div className="w-100">
                <SubscriberDegree tierPrice={tierPrice} subscriberCount={product.subscriberCount} />
              </div>
              <Button extraClassName="btn-cart btn-lg">İmeceye Katıl</Button>
            </div>
            <p className="py-3 mb-0 user-subscribtion-info">
              Şu ana kadar imeceye {product.subscriberCount} kişi katıldı
            </p>
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
                <div className="title">Kalan:</div>
                <div className="value">{product.requiredUserCount - product.subscriberCount}</div>
              </li>
              <li className="d-flex">
                <div className="title">İmece Bitişine Kalan Zaman:</div>
                <div className="value">{finishDate.days}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="product-detail-context p-3 mb-5">
        <Title type="h3" extraClassName="bold mb-2 pb-2">
          VAMOS SPORT PAKETİ DETAYLARI
        </Title>
        <Title type="h5" extraClassName="bold">
          Kimler İçin Uygundur ?
        </Title>
        <p>
          Sport merkezini yoğun kullanacak, hergün spor yapmak ve rahatlamak isteyen kişi için
          önerilir.
        </p>
        <Title type="h5" extraClassName="bold">
          Kullanım Günleri / Saatleri
        </Title>
        <table>
          <tbody>
            <tr>
              <td>Hafta İçi</td>
              <td>06:30 - 23:30</td>
            </tr>
            <tr>
              <td>Hafta Sonu</td>
              <td>08:00 - 21:30</td>
            </tr>
          </tbody>
        </table>
        <Title type="h3" extraClassName="bold mt-2 pb-2">
          VAMOS İLETİŞİM BİLGİLERİ
        </Title>
        <p>
          <strong>Adres.</strong>
          <br /> Karakusunlar Mah. Muhsin Yazıcıoğlu Cad. No :49 100. Yıl / Ankara
        </p>
        <p>
          <strong>Telefon.</strong>
          <br /> 0 312 287 77 55
        </p>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object
};

export default ProductView;
