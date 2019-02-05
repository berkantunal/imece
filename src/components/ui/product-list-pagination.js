import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { Button } from './index';

import '$/assets/css/ui/product-list-pagination.css';

const ListPagination = props => {
  const { className, extraClassName } = props;
  return (
    <div className={cls(className, extraClassName)}>
      <nav>
        <ul className="pagination">
          <li className="page-item disabled">
            <Button extraClassName="page-link">BAŞLANGIÇ</Button>
          </li>
          <li className="page-item disabled">
            <Button extraClassName="page-link">ÖNCEKİ</Button>
          </li>
          <li className="page-item">
            <Button extraClassName="page-link">1</Button>
          </li>
          <li className="page-item active" aria-current="page">
            <Button extraClassName="page-link">
              2 <span className="sr-only">(current)</span>
            </Button>
          </li>
          <li className="page-item">
            <Button extraClassName="page-link">3</Button>
          </li>
          <li className="page-item">
            <Button extraClassName="page-link">SONRAKİ</Button>
          </li>
          <li className="page-item">
            <Button extraClassName="page-link">SON</Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

ListPagination.defaultProps = {
  className: 'list-pagination d-flex justify-content-center'
};

ListPagination.propTypes = {
  className: PropTypes.string,
  extraClassName: PropTypes.string
};

export default ListPagination;
