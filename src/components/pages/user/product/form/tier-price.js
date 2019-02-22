import React from 'react';
import PropTypes from 'prop-types';
import { Title } from '$/components/ui';
import _ from 'lodash';

class UserProductFormTierPrice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  handleChange = event => {
    const { value: values } = this.state;
    const { value } = event.target;
    const name = event.target.getAttribute('data-name');
    const key = event.target.getAttribute('data-key');

    values[key][name] = value;

    this.setState({
      ...this.state,
      values
    });

    this.props.handleChange(values);
  };

  handleAdd = () => {
    const { value } = this.state;

    value.push({
      price: 1349.99,
      requiredUserCount: 15
    });

    this.setState({
      ...this.state,
      value
    });
  };

  handleRemove = key => {
    const { value } = this.state;
    const values = _.remove(value, (priceValue, _key) => _key !== key);

    this.setState({
      ...this.state,
      value: values
    });
    // eslint-disable-next-line
    console.log(values);
  };

  render() {
    const { value } = this.state;

    return (
      <div className="tier-price-content">
        <div className="row my-3 align-items-center">
          <div className="col-sm-6">
            <Title type="h5" extraClassName="mb-0">
              Fiyatlar
            </Title>
          </div>
          <div className="col-sm-6 justify-content-end d-flex">
            <button type="button" className="btn" onClick={() => this.handleAdd()}>
              <i className="fa fa-plus-circle mr-1" />
              Fiyat Ekle
            </button>
          </div>
        </div>
        <div className="price-list row">
          {_.map(value, (tierPrice, key) => (
            <div key={key} className="col-lg-6">
              <div className="price-list-item d-flex align-items-center mb-3">
                <input
                  type="text"
                  onChange={this.handleChange}
                  className="form-control"
                  value={tierPrice.requiredUserCount}
                  data-name="requiredUserCount"
                  data-key={key}
                />
                <span>kişiye kadar fiyat</span>
                <input
                  type="text"
                  onChange={this.handleChange}
                  className="form-control"
                  value={tierPrice.price}
                  data-name="price"
                  data-key={key}
                />
                <i className="fa fa-lira-sign" />
                <button
                  type="button"
                  onClick={() => this.handleRemove(key)}
                  className="btn btn-danger"
                >
                  <i className="fa fa-times" />
                </button>
              </div>
            </div>
          ))}
          <div className="col-sm-12">
            <small className="form-text text-muted">
              Fiyatlar örnek olarak girilmiştir lütfen kendi ürününüze göre düzenleyin.
            </small>
          </div>
        </div>
      </div>
    );
  }
}

UserProductFormTierPrice.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.object
};

export default UserProductFormTierPrice;
