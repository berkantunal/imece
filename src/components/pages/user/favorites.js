import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Breadcrumbs, Title, ProductList } from '$/components/ui/';
import { getFavoriteProductList } from '$/store/actions/product';
import { jsonDecode } from '$/helpers/';

const LIMIT = 6;

class UserFavorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePageNumber: 0
    };
  }

  componentDidMount() {
    this.init(this.state);
  }

  handleChangePage = pageNumber => {
    const state = {
      ...this.state,
      activePageNumber: pageNumber
    };

    this.setState(state);
    this.init(state);
  };

  init(state) {
    const { activePageNumber: pageNumber } = state;
    const {
      user: { user }
    } = this.props;
    const userFavorites = jsonDecode(user.favorites);

    this.props.getFavoriteProductList(userFavorites, LIMIT, LIMIT * pageNumber);
  }

  render() {
    const {
      product,
      user: { user }
    } = this.props;
    const { activePageNumber } = this.state;
    const userFavorites = jsonDecode(user.favorites);
    const favoriteProductCount = userFavorites ? userFavorites.length : 0;

    return (
      <div className="user-favorites">
        <div className="page-header pb-2 mb-3">
          <Title extraClassName="pt-3 bold" type="h2">
            Favorilerim
          </Title>
          <div className="d-flex justify-content-between align-items-end">
            <div className="w-100">
              <Breadcrumbs
                links={[{ title: 'Anasayfa', to: '/' }, { title: 'Favorilerim', to: '' }]}
              />
            </div>
          </div>
        </div>
        <div className="product-list">
          <ProductList
            activePageNumber={activePageNumber}
            onChangePage={this.handleChangePage}
            count={favoriteProductCount}
            limit={LIMIT}
            loading={product.favoriteProducts.loading}
            products={product.favoriteProducts.list}
            productGridItemClassName="col-12 col-sm-6 col-lg-4 mt-3"
            grid
          />
        </div>
      </div>
    );
  }
}

UserFavorites.propTypes = {
  getFavoriteProductList: PropTypes.func,
  product: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => {
  return {
    product: state.product,
    user: state.user
  };
};

const mapDispatchToProps = {
  getFavoriteProductList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFavorites);
