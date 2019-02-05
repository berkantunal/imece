import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { ProductListToolbar, ProductListItem, ProductListPagination } from '.';

const List = props => {
  const { className, extraClassName, productItemClassName, toolbar } = props;
  return (
    <div className={cls(className, extraClassName)}>
      {toolbar && <ProductListToolbar extraClassName="mb-2" />}
      <div className="list row">
        <ProductListItem extraClassName={productItemClassName} />
        <ProductListItem extraClassName={productItemClassName} />
        <ProductListItem extraClassName={productItemClassName} />
        <ProductListItem extraClassName={productItemClassName} />
        <ProductListItem extraClassName={productItemClassName} />
        <ProductListItem extraClassName={productItemClassName} />
        <ProductListItem extraClassName={productItemClassName} />
        <ProductListItem extraClassName={productItemClassName} />
      </div>
      <ProductListPagination extraClassName="mt-4" />
    </div>
  );
};

List.defaultProps = {
  className: 'list-content',
  productItemClassName: 'col-3 mt-3',
  toolbar: false
};

List.propTypes = {
  className: PropTypes.string,
  extraClassName: PropTypes.string,
  productItemClassName: PropTypes.string,
  toolbar: PropTypes.bool
};

export default List;
