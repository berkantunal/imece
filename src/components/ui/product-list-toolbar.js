import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { Select, Button } from './index';

import '$/assets/css/ui/product-list-toolbar.css';

class ListToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { onChangeOrderBy } = this.props;
    // eslint-disable-next-line
    const { value } = event.target;
    onChangeOrderBy(value);
  }

  render() {
    const { className, extraClassName, gridType, onChangeGridType } = this.props;

    return (
      <div className={cls(className, extraClassName)}>
        <form>
          <div className="row justify-content-between">
            <div className="col-9 col-sm-4">
              <Select
                options={[
                  {
                    title: 'Yeni eklenen imceler',
                    value: 'timestampHigh'
                  },
                  {
                    title: 'Sona yakın imeceler',
                    value: 'timestampLow'
                  }
                ]}
                name="orderBy"
                onChange={this.handleChange}
                placeholder="Sıralama"
                extraClassName="mb-0"
                inputExtraClassName="py-0 pl-5"
              />
            </div>
            <div className="col-3 col-sm-4 d-flex justify-content-end align-items-center">
              <label htmlFor="list-style" className="mb-0 mr-3 d-none d-sm-block">
                Gösterim Şekli
              </label>
              <Button
                extraClassName={`btn-default px-2 ${gridType === 'grid' ? 'active' : ''}`}
                onClick={() => onChangeGridType('grid')}
              >
                <i className="fa fa-th" />
              </Button>
              <Button
                extraClassName={`btn-default px-2 ${gridType === 'list' ? 'active' : ''}`}
                onClick={() => onChangeGridType('list')}
              >
                <i className="fa fa-bars" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ListToolbar.defaultProps = {
  className: 'list-toolbar pr-2'
};

ListToolbar.propTypes = {
  className: PropTypes.string,
  extraClassName: PropTypes.string,
  gridType: PropTypes.string,
  onChangeGridType: PropTypes.func,
  onChangeOrderBy: PropTypes.func
};

export default ListToolbar;
