import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import '$/assets/css/ui/alert.css';

const Alert = props => {
  const { extraClassName, children, type } = props;

  return <div className={cls(`ui-alert alert alert-${type}`, extraClassName)}>{children}</div>;
};

Alert.defaultProps = {
  extraClassName: '',
  type: 'danger'
};

Alert.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  extraClassName: PropTypes.string,
  type: PropTypes.string
};

export default Alert;
