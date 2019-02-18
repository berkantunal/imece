import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ProductList } from '$/components/ui/';
import { getProductList, getCount } from '$/store/actions/product';
import { jsonDecode } from '$/helpers/';

const LIMIT = 9;

class CategoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePageNumber: 0,
      filter: this.getFilter()
    };
  }

  componentDidMount() {
    this.init(this.state);
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      const filter = this.getFilter();

      const state = {
        ...this.state,
        filter
      };

      this.init(state);
    }
  }

  getFilter() {
    let { filter } = this.props;
    filter = jsonDecode(filter);

    return filter;
  }

  handleChangePage = pageNumber => {
    const state = {
      ...this.state,
      activePageNumber: pageNumber
    };

    this.init(state);
  };

  handleChangeOrderBy = orderType => {
    const state = {
      ...this.state,
      orderType
    };

    this.init(state);
  };

  init(state) {
    const { activePageNumber: pageNumber, orderType, filter } = state;

    this.setState(state);
    this.props.getProductList(LIMIT, LIMIT * pageNumber, orderType, filter);
    this.props.getCount(filter);
  }

  render() {
    const { product } = this.props;
    const { activePageNumber } = this.state;

    return (
      <div className="category-list">
        <ProductList
          toolbar
          activePageNumber={activePageNumber}
          onChangePage={this.handleChangePage}
          onChangeOrderBy={this.handleChangeOrderBy}
          count={product.count}
          products={product.list}
          productItemClassName="col-4 mt-3"
          limit={LIMIT}
        />
      </div>
    );
  }
}

CategoryList.propTypes = {
  filter: PropTypes.object,
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
)(CategoryList);
