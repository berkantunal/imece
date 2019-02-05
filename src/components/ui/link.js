import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

const UILink = props => {
  const { className, children, to } = props;
  return (
    <NavLink className={className} to={to}>
      {children}
    </NavLink>
  );
};

UILink.defaultProps = {
  className: ''
};

UILink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  to: PropTypes.string.isRequired
};

export default withRouter(UILink);
