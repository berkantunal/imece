import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import '$/assets/css/ui/subscriber-icons.css';

const SubscriberIcons = props => {
  const { requiredUserCount, subscriberCount, iconClassName } = props;
  return (
    <div className="subscriber-icons">
      {_.times(requiredUserCount, userIndex => {
        const extraClassName = userIndex < subscriberCount ? 'active' : 'passive';
        return <i key={userIndex} className={`${iconClassName} ${extraClassName}`} />;
      })}
    </div>
  );
};

SubscriberIcons.defaultProps = {
  iconClassName: 'fa fa-user',
};

SubscriberIcons.propTypes = {
  iconClassName: PropTypes.string,
  requiredUserCount: PropTypes.number.isRequired,
  subscriberCount: PropTypes.number.isRequired,
};

export default SubscriberIcons;
