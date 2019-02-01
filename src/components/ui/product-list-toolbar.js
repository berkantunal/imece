import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { Select, Button } from './index';

import '$/assets/css/ui/product-list-toolbar.css';

const ListToolbar = props => {
  const { className, extraClassName, options } = props;
  return (
    <div className={cls(className, extraClassName)}>
      <div className="row justify-content-between">
        <div className="col-4">
          <Select options={options} extraClassName="mb-0" inputExtraClassName="py-0 pl-5" />
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center">
          <label htmlFor="list-style" className="mb-0 mr-3">
            Gösterim Şekli
          </label>
          <Button extraClassName="btn-default px-2">
            <i className="fa fa-th" />
          </Button>
          <Button extraClassName="btn-default px-2">
            <i className="fa fa-bars" />
          </Button>
        </div>
      </div>
    </div>
  );
};

ListToolbar.defaultProps = {
  className: 'list-toolbar pr-2',
  options: {
    timestampHigh: 'Yeni eklenen imceler',
    timestampLow: 'Sona yakın imeceler',
  },
};

ListToolbar.propTypes = {
  className: PropTypes.string,
  extraClassName: PropTypes.string,
  options: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
};

export default ListToolbar;
