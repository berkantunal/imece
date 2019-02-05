import React, { Component } from 'react';
import Header from '$/components/common/header';
import Footer from '$/components/common/footer';
import ProductSlider from '$/components/common/product-slider';
import Social from '$/components/common/social';
import ProductImages from './product/images';
import { Button, Breadcrumbs, Title, SubscriberIcons } from '$/components/ui';
import { getDateDiff } from '$/helpers/';

import '$/assets/css/product.css';

const PRODUCT = {
  discountedPrice: 28000,
  finishDate: '2019-03-18 00:00:00',
  images: [
    'https://via.placeholder.com/450x350.png?text=450x350%201',
    'https://via.placeholder.com/450x350.png?text=450x350%202',
    'https://via.placeholder.com/450x350.png?text=450x350%203',
  ],
  location: 'Ankara',
  owner: 'TOYOTA PLAZA',
  price: 40000,
  requiredUserCount: 8,
  subscriberCount: 4,
  title: 'COROLLA 2019',
};

class Product extends Component {
  getCurrentProduct() {
    return PRODUCT;
  }

  render() {
    const product = this.getCurrentProduct();
    const finishDate = getDateDiff(product.finishDate);

    return (
      <div className="main-container">
        <Header />
        <div className="gray-bg">
          <div className="container">
            <div className="product-header pb-2 mb-3">
              <Title extraClassName="pt-3 bold" type="h2">
                {product.title}
              </Title>
              <div className="d-flex justify-content-between align-items-end">
                <div className="w-100">
                  <Breadcrumbs
                    links={[
                      { title: 'Anasayfa', to: 'home' },
                      { title: product.title, to: 'product' },
                    ]}
                  />
                </div>
                <div className="d-flex">
                  <Button extraClassName="btn-default btn-sm">
                    <i className="fa fa-star" /> Favorilerime Ekle
                  </Button>
                  <Button extraClassName="btn-default btn-sm">
                    <i className="fa fa-share-alt" /> Paylaş
                  </Button>
                </div>
              </div>
            </div>
            <div className="product-content pb-5">
              <div className="row">
                <div className="col-5">
                  <ProductImages images={product.images} />
                </div>
                <div className="col-7">
                  <div className="price">
                    imece fiyatı
                    <big>{product.discountedPrice} TL</big>
                  </div>
                  <div className="d-flex justify-centent-between align-items-end">
                    <div className="w-100">
                      <SubscriberIcons
                        requiredUserCount={product.requiredUserCount}
                        subscriberCount={product.subscriberCount}
                        iconClassName="fas fa-male"
                      />
                    </div>
                    <Button extraClassName="btn-cart btn-lg">İmeceye Katıl</Button>
                  </div>
                  <p className="py-3 mb-0 user-subscribtion-info">
                    Bu pakete sahip olmak için {product.requiredUserCount} kişinin katılımı
                    gerekiyor.
                    <br />
                    Şu ana kadar imeceye
                    {product.subscriberCount}
                    kişi katıldı ve imecenin kapanmasına{' '}
                    {product.requiredUserCount - product.subscriberCount} kişi kaldı.
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
                      <div className="title">Gerekli Kişi:</div>
                      <div className="value">{product.requiredUserCount}</div>
                    </li>
                    <li className="d-flex">
                      <div className="title">Katılan:</div>
                      <div className="value">{product.subscriberCount}</div>
                    </li>
                    <li className="d-flex">
                      <div className="title">Kalan:</div>
                      <div className="value">
                        {product.requiredUserCount - product.subscriberCount}
                      </div>
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
        </div>
        <div className="container">
          <ProductSlider title="TAVSİYE EDİLEN İMECELER" />
        </div>
        <div className="orange-bg">
          <div className="container">
            <Social />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Product;
