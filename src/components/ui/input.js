import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

const Input = props => {
  const { className, extraClassName, placeholder, title, type } = props;
  return (
    <div className={cls(className, extraClassName)}>
      {title && <label htmlFor="exampleInputEmail1">{title}</label>}
      <input
        type={type}
        className="form-control"
        id="exampleInputEmail1"
        placeholder={placeholder}
      />
    </div>
  );
};

Input.defaultProps = {
  className: 'form-group',
  type: 'text',
};

Input.propTypes = {
  className: PropTypes.string,
  extraClassName: PropTypes.string,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
