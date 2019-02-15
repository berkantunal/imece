/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import _ from 'lodash';
import { Button } from './index';

import '$/assets/css/ui/product-list-pagination.css';

class ListPagination extends React.Component {
  constructor(props) {
    super(props);

    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  getPageCount() {
    const { count, limit } = this.props;
    let pageCount = count / limit;

    if (pageCount.toFixed() == 'NaN') {
      return false;
    }

    const fixedPageCount = parseFloat(pageCount.toFixed());

    if (pageCount > fixedPageCount) {
      pageCount = fixedPageCount + 1;
    }

    return pageCount;
  }

  handlePrev() {
    const { activePageNumber, onChangePage } = this.props;

    let pageNumber = activePageNumber - 1;

    if (pageNumber < 0) {
      return false;
    }

    onChangePage(pageNumber);

  }

  handleNext() {
    const { activePageNumber, count, onChangePage } = this.props;
    const pageCount = this.getPageCount();

    let pageNumber = activePageNumber + 1;

    if (pageNumber >= pageCount) {
      return false;
    }

    onChangePage(pageNumber);
  }

  render() {
    const { activePageNumber, className, extraClassName, onChangePage } = this.props;
    const pageCount = this.getPageCount();

    if (pageCount <= 1) {
      return null;
    }

    const prevShowCount = activePageNumber - 5;
    const nextShowCount = activePageNumber - 5;

    return (
      <div className={cls(className, extraClassName)}>
        <nav>
          <ul className="pagination">
            <li className={`page-item ${activePageNumber == 0 ? 'disabled' : ''}`}>
              <Button extraClassName="page-link" onClick={() => onChangePage(0)}>
                BAŞLANGIÇ
              </Button>
            </li>
            <li className={`page-item ${activePageNumber == 0 ? 'disabled' : ''}`}>
              <Button extraClassName="page-link" onClick={this.handlePrev}>
                ÖNCEKİ
              </Button>
            </li>
            {_.times(pageCount, pageNumber => {
              if (prevShowCount < pageNumber && nextShowCount > pageNumber) {
                return false;
              }

              return (
                <li
                  className={`page-item ${pageNumber === activePageNumber ? 'active' : ''}`}
                  key={pageNumber}
                >
                  <Button onClick={() => onChangePage(pageNumber)} extraClassName="page-link">
                    {pageNumber + 1}
                  </Button>
                </li>
              );
            })}
            <li className={`page-item ${activePageNumber == (pageCount - 1) ? 'disabled' : ''}`}>
              <Button extraClassName="page-link" onClick={this.handleNext}>
                SONRAKİ
              </Button>
            </li>
            <li className={`page-item ${activePageNumber == (pageCount - 1) ? 'disabled' : ''}`}>
              <Button extraClassName="page-link" onClick={() => onChangePage(pageCount - 1)}>
                SON
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

ListPagination.defaultProps = {
  activePageNumber: 0,
  className: 'list-pagination d-flex justify-content-center'
};

ListPagination.propTypes = {
  activePageNumber: PropTypes.number,
  className: PropTypes.string,
  count: PropTypes.number,
  extraClassName: PropTypes.string,
  limit: PropTypes.number,
  onChangePage: PropTypes.func
};

export default ListPagination;
