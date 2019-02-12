import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '$/components/common/header';
import Footer from '$/components/common/footer';
import ProductSlider from '$/components/common/product-slider';
import Social from '$/components/common/social';
import _ from 'lodash';
import ProductImages from './product/images';
import { Button, Breadcrumbs, Title, SubscriberIcons } from '$/components/ui';
import { getDateDiff } from '$/helpers/';
import { getProductBySlug } from '$/store/actions/product';
import { setFavorites } from '$/store/actions/user';

import '$/assets/css/product.css';

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.handleFavorite = this.handleFavorite.bind(this);
    this.state = {
      favorite: this.isFavorited()
    };
  }

  componentDidMount() {
    const { product, match } = this.props;
    const slug = _.get(match, 'params.slug');

    if (!product.current.loading && !product.current.fetched) {
      this.props.getProductBySlug(slug);
    }
  }

  getCurrentProduct() {
    const { product, match } = this.props;
    const { list } = product;
    const slug = _.get(match, 'params.slug');
    const stateProduct = _.find(list, { slug });
    let response;

    if (response) {
      response = stateProduct;
    }

    if (product.current.fetched) {
      response = product.current.data;
    }

    return response;
  }

  handleFavorite = () => {
    let userFavorites;
    let isFavorited;
    const {
      user: { user }
    } = this.props;
    const product = this.getCurrentProduct();
    const { favorite } = this.state;

    try {
      userFavorites = product.favorites;
      userFavorites = JSON.parse(userFavorites);
    } catch (err) {
      // Ignore Errors
      userFavorites = [];
    }

    if (favorite) {
      userFavorites = _.remove(userFavorites, favoritedSlug => product.slug === favoritedSlug);
      isFavorited = 0;
    }

    if (!favorite) {
      userFavorites.push(product.slug);
      isFavorited = 1;
    }

    this.props.setFavorites(user.userId, userFavorites);

    this.setState({
      ...this.state,
      favorite: isFavorited
    });
  };

  isFavorited() {
    const slug = _.get(this.props, 'match.params.slug');
    const {
      user: { user }
    } = this.props;
    const isFavorited = _.find(user.favorites, favoritedSlug => favoritedSlug === slug);

    return isFavorited;
  }

  render() {
    const product = this.getCurrentProduct();

    if (!product) {
      return null;
    }

    const finishDate = getDateDiff(product.finishDate);
    const { favorite } = this.state;

    return (
      <div className="main-container">
        <Header />
        <div className="gray-bg">
          <div className="container">
            <div className="page-header pb-2 mb-3">
              <Title extraClassName="pt-3 bold" type="h2">
                {product.title}
              </Title>
              <div className="d-flex justify-content-between align-items-end">
                <div className="w-100">
                  <Breadcrumbs
                    links={[
                      { title: 'Anasayfa', to: '/' },
                      { title: product.title, to: 'product' }
                    ]}
                  />
                </div>
                <div className="d-flex">
                  <Button
                    extraClassName={`btn-default btn-sm btn-favorite ${favorite ? 'active' : ''}`}
                    onClick={this.handleFavorite}
                  >
                    <i className="fa fa-star" />{' '}
                    {favorite ? 'Favorilerimden Çıkar' : 'Favorilerime Ekle'}
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
                    <span className="line-through ml-1">{product.oldPrice} TL</span>
                    <big>{product.price} TL</big>
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

Product.propTypes = {
  getProductBySlug: PropTypes.func,
  match: PropTypes.object,
  product: PropTypes.object,
  setFavorites: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => {
  return {
    product: state.product,
    user: state.user
  };
};

const mapDispatchToProps = {
  getProductBySlug,
  setFavorites
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
