import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

const UIButton = props => {
  const { className, extraClassName, children, onClick } = props;
  return (
    <button type="button" className={cls(className, extraClassName)} onClick={onClick}>
      {children}
    </button>
  );
};

UIButton.defaultProps = {
  className: 'btn',
  extraClassName: 'btn-primary',
};

UIButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  extraClassName: PropTypes.string,
  onClick: PropTypes.func,
};

export default UIButton;
