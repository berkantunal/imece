import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Title, ProductList } from '$/components/ui/';
import { getProductList, getCount } from '$/store/actions/product';

const LIMIT = 8;

class HomeList extends React.Component {
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

  handleChangeOrderBy = orderType => {
    const state = {
      ...this.state,
      orderType
    };

    this.setState(state);
    this.init(state);
  };

  init(state) {
    const { activePageNumber: pageNumber, orderType } = state;

    this.props.getProductList(LIMIT, LIMIT * pageNumber, orderType);
    this.props.getCount();
  }

  render() {
    const { product } = this.props;
    const { activePageNumber } = this.state;

    return (
      <div className="category-list">
        <div className="header py-3 pl-5">
          <Title type="h2" extraClassName="bold">
            TÜM ÜRÜNLER
          </Title>
          <Title type="h6" extraClassName="sub">
            UcuzMax sepetinde toplam {product.count} adet kayıt bulundu.
          </Title>
        </div>
        <ProductList
          toolbar
          activePageNumber={activePageNumber}
          onChangePage={this.handleChangePage}
          onChangeOrderBy={this.handleChangeOrderBy}
          loading={product.loading}
          count={product.count}
          products={product.list}
        />
      </div>
    );
  }
}

HomeList.propTypes = {
  getCount: PropTypes.func,
  getProductList: PropTypes.func,
  product: PropTypes.object
};

const mapStateToProps = state => {
  return {
    product: state.product
  };
};

const mapDispatchToProps = {
  getCount,
  getProductList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeList);
