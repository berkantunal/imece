import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { ProductListToolbar, ProductListItem, ProductListPagination } from '.';

const List = props => {
  const { className, extraClassName } = props;
  return (
    <div className={cls(className, extraClassName)}>
      <ProductListToolbar extraClassName="mb-2" />
      <div className="list row">
        <ProductListItem extraClassName="col-3 mt-3" />
        <ProductListItem extraClassName="col-3 mt-3" />
        <ProductListItem extraClassName="col-3 mt-3" />
        <ProductListItem extraClassName="col-3 mt-3" />
        <ProductListItem extraClassName="col-3 mt-3" />
        <ProductListItem extraClassName="col-3 mt-3" />
        <ProductListItem extraClassName="col-3 mt-3" />
        <ProductListItem extraClassName="col-3 mt-3" />
      </div>
      <ProductListPagination extraClassName="mt-4" />
    </div>
  );
};

List.defaultProps = {
  className: 'list-content',
};

List.propTypes = {
  className: PropTypes.string,
  extraClassName: PropTypes.string,
};

export default List;
