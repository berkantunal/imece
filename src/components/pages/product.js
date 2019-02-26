import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '$/components/common/header';
import Footer from '$/components/common/footer';
import ProductSlider from '$/components/common/product-slider';
import Social from '$/components/common/social';
import _ from 'lodash';
import ProductView from './product/view';
import { Button, Breadcrumbs, Title } from '$/components/ui';
import { getProductBySlug } from '$/store/actions/product';
import { getSubscribedProductList } from '$/store/actions/product-subscriber';
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
    const {
      match,
      user: { user }
    } = this.props;
    const slug = _.get(match, 'params.slug');

    this.props.getProductBySlug(slug);
    // eslint-disable-next-line
    console.log('getSubscribedProductList', user.userId);
    this.props.getSubscribedProductList(user.userId);
  }

  componentDidUpdate(prevProps) {
    const { match: prevMatch } = prevProps;
    const prevSlug = _.get(prevMatch, 'params.slug');
    const { match } = this.props;
    const slug = _.get(match, 'params.slug');

    if (prevSlug !== slug) {
      this.props.getProductBySlug(slug);
    }
  }

  getCurrentProduct() {
    const { product, match } = this.props;
    const { list } = product;
    const slug = _.get(match, 'params.slug');
    const stateProduct = _.find(list, { slug });
    let response = stateProduct;

    if (product.current.fetched) {
      response = product.current.data;
    }

    return response;
  }

  handleFavorite = () => {
    let isFavorited;
    const {
      user: { user }
    } = this.props;
    let userFavorites = user.favorites;
    const product = this.getCurrentProduct();
    const { favorite } = this.state;

    if (favorite) {
      userFavorites = _.remove(userFavorites, favoritedSlug => product.slug !== favoritedSlug);
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
    const { favorite } = this.state;
    const { subscriber } = this.props;

    return (
      <div className="main-container" key={product ? product.productId : 0}>
        <Header />
        {product ? (
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
                      <span className="d-none d-sm-inline-block ml-2">
                        {favorite ? 'Favorilerimden Çıkar' : 'Favorilerime Ekle'}
                      </span>
                    </Button>
                    <Button extraClassName="btn-default btn-sm">
                      <i className="fa fa-share-alt" />
                      <span className="d-none d-sm-inline-block ml-2">Paylaş</span>
                    </Button>
                  </div>
                </div>
              </div>
              <ProductView product={product} subscribedProducts={subscriber.list} />
            </div>
          </div>
        ) : null}
        <div className="container">
          <ProductSlider title="TAVSİYE EDİLEN ÜRÜNLER" />
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
  getSubscribedProductList: PropTypes.func,
  match: PropTypes.object,
  product: PropTypes.object,
  setFavorites: PropTypes.func,
  subscriber: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => {
  return {
    product: state.product,
    subscriber: state.subscriber,
    user: state.user
  };
};

const mapDispatchToProps = {
  getProductBySlug,
  getSubscribedProductList,
  setFavorites
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
