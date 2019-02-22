import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import _ from 'lodash';
import { ProductListToolbar, ProductListItem, ProductGridItem, ProductListPagination } from '.';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const localGridType = localStorage.getItem('gridType');

    this.setState({
      gridType: localGridType !== undefined ? localGridType : 'grid'
    });
  }

  handleChangeGridType = (gridType = 'list') => {
    this.setState({
      ...this.state,
      gridType
    });

    localStorage.setItem('gridType', gridType);
  };

  render() {
    let { gridType } = this.state;
    const {
      actions,
      activePageNumber,
      className,
      count,
      extraClassName,
      grid,
      handleRemove,
      handleUpdate,
      limit,
      onChangeOrderBy,
      onChangePage,
      products,
      productListItemClassName,
      productGridItemClassName,
      toolbar
    } = this.props;

    if (grid) {
      gridType = 'grid';
    }

    return (
      <div className={cls(className, extraClassName)}>
        {toolbar && (
          <ProductListToolbar
            onChangeOrderBy={onChangeOrderBy}
            onChangeGridType={this.handleChangeGridType}
            gridType={gridType}
            extraClassName="mb-2"
          />
        )}
        <div className="list row">
          {_.map(products, product =>
            gridType === 'list' ? (
              <ProductListItem
                key={product.productId}
                product={product}
                extraClassName={productListItemClassName}
                actions={actions}
                handleRemove={handleRemove}
                handleUpdate={handleUpdate}
              />
            ) : (
              <ProductGridItem
                key={product.productId}
                product={product}
                extraClassName={productGridItemClassName}
                actions={actions}
                handleRemove={handleRemove}
                handleUpdate={handleUpdate}
              />
            )
          )}
        </div>
        <ProductListPagination
          activePageNumber={activePageNumber}
          onChangePage={onChangePage}
          limit={limit}
          count={count}
          extraClassName="mt-4"
        />
      </div>
    );
  }
}

List.defaultProps = {
  activePageNumber: 0,
  className: 'list-content',
  limit: 8,
  productGridItemClassName: 'col-12 col-sm-6 col-lg-3 mt-3',
  productListItemClassName: 'col-12 mt-3',
  products: [],
  toolbar: false
};

List.propTypes = {
  actions: PropTypes.bool,
  activePageNumber: PropTypes.number,
  className: PropTypes.string,
  count: PropTypes.number,
  extraClassName: PropTypes.string,
  grid: PropTypes.bool,
  handleRemove: PropTypes.func,
  handleUpdate: PropTypes.func,
  limit: PropTypes.number,
  onChangeOrderBy: PropTypes.func,
  onChangePage: PropTypes.func,
  productGridItemClassName: PropTypes.string,
  productListItemClassName: PropTypes.string,
  products: PropTypes.array,
  toolbar: PropTypes.bool
};

export default List;
