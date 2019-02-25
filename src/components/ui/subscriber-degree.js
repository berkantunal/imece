import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { jsonDecode } from '$/helpers/';
import { getMaxRequiredUserCount } from '$/helpers/product';

import '$/assets/css/ui/subscriber-degree.css';

class SubscriberDegree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      maxRequiredUserCount: 0
    };
  }

  componentDidMount() {
    this.setMaxRequiredUserCount();
  }

  async setMaxRequiredUserCount() {
    const { tierPrice } = this.props;

    const maxRequiredUserCount = await getMaxRequiredUserCount(tierPrice);

    this.setState({
      ...this.state,
      maxRequiredUserCount
    });
  }

  render() {
    const { tierPrice, subscriberCount } = this.props;
    const { maxRequiredUserCount } = this.state;
    const rate = 100 / maxRequiredUserCount;
    const decodedTierPrice = jsonDecode(tierPrice);

    return (
      <div className="subscriber-degree">
        <div className="point">
          <span>0</span>
        </div>
        {_.map(decodedTierPrice, (priceOpt, key) => (
          <div
            className="point"
            style={{ width: `${rate * parseFloat(priceOpt.requiredUserCount)}%` }}
            key={key}
          >
            <span>{priceOpt.requiredUserCount}</span>
          </div>
        ))}
        <div
          className="count"
          style={{ width: `${rate * subscriberCount}%` }}
          data-count={subscriberCount}
        />
        <div className="count-mask" style={{ width: `${100 - rate * subscriberCount}%` }} />
      </div>
    );
  }
}

SubscriberDegree.propTypes = {
  subscriberCount: PropTypes.number.isRequired,
  tierPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

export default SubscriberDegree;
