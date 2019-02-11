import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

const UILink = props => {
  const { activeClassName, className, children, to } = props;
  return (
    <NavLink className={className} activeClassName={activeClassName} to={to}>
      {children}
    </NavLink>
  );
};

UILink.defaultProps = {
  activeClassName: 'active',
  className: ''
};

UILink.propTypes = {
  activeClassName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  to: PropTypes.string.isRequired
};

export default withRouter(UILink);
