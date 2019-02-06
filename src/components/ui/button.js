import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import '$/assets/css/ui/button.css';

const UIButton = props => {
  const { className, extraClassName, children, loading, onClick } = props;
  return (
    <button
      type="button"
      className={cls(className, extraClassName, loading ? 'btn-loading' : '')}
      onClick={onClick}
    >
      {loading && (
        <span className="loading">
          <span />
        </span>
      )}
      <span>{children}</span>
    </button>
  );
};

UIButton.defaultProps = {
  className: 'btn',
  extraClassName: 'btn-primary',
  loading: false
};

UIButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  extraClassName: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func
};

export default UIButton;
