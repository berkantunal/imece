import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Breadcrumbs, Title, ProductList } from '$/components/ui';
import { getOrderProduct } from '$/store/actions/order';
import _ from 'lodash';

class UserOrder extends React.Component {
  componentDidMount() {
    const {
      user: { user }
    } = this.props;

    this.props.getOrderProduct(user.userId);
  }

  getProducts() {
    const {
      order: { product }
    } = this.props;
    let products = [];

    if (product.list) {
      products = _.map(product.list, order => {
        return order.Product;
      });
    }

    return products;
  }

  render() {
    const {
      order: { product }
    } = this.props;
    const products = this.getProducts();

    return (
      <div className="user-order-products">
        <div className="page-header pb-2 mb-3">
          <Title extraClassName="pt-3 bold" type="h2">
            Satın Alımlarım
          </Title>
          <div className="d-flex justify-content-between align-items-end">
            <div className="w-100">
              <Breadcrumbs
                links={[{ title: 'Anasayfa', to: '/' }, { title: 'Satın Alımlarım', to: '' }]}
              />
            </div>
          </div>
        </div>
        {product.fetched && products.length === 0 && <p>Satın alınmış ürün bulunamadı.</p>}
        <div className="product-list">
          {product.fetched && (
            <ProductList
              count={products.length}
              limit={products.length}
              products={products}
              productGridItemClassName="col-12 col-sm-6 col-lg-4 mt-3"
              grid
            />
          )}
        </div>
      </div>
    );
  }
}

UserOrder.propTypes = {
  getOrderProduct: PropTypes.func,
  order: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => {
  return {
    order: state.order,
    user: state.user
  };
};

const mapDispatchToProps = {
  getOrderProduct
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserOrder);
