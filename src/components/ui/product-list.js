import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import _ from 'lodash';
import { ProductListToolbar, ProductListItem, ProductListPagination } from '.';

const List = props => {
  const {
    activePageNumber,
    className,
    count,
    extraClassName,
    limit,
    onChangeOrderBy,
    onChangePage,
    productItemClassName,
    products,
    toolbar
  } = props;

  return (
    <div className={cls(className, extraClassName)}>
      {toolbar && <ProductListToolbar onChangeOrderBy={onChangeOrderBy} extraClassName="mb-2" />}
      <div className="list row">
        {_.map(products, product => (
          <ProductListItem
            key={product.productId}
            product={product}
            extraClassName={productItemClassName}
          />
        ))}
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
};

List.defaultProps = {
  activePageNumber: 0,
  className: 'list-content',
  limit: 8,
  productItemClassName: 'col-3 mt-3',
  products: [],
  toolbar: false
};

List.propTypes = {
  activePageNumber: PropTypes.number,
  className: PropTypes.string,
  count: PropTypes.number,
  extraClassName: PropTypes.string,
  limit: PropTypes.number,
  onChangeOrderBy: PropTypes.func,
  onChangePage: PropTypes.func,
  productItemClassName: PropTypes.string,
  products: PropTypes.array,
  toolbar: PropTypes.bool
};

export default List;
