import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

const Textarea = props => {
  const {
    className,
    extraClassName,
    placeholder,
    readOnly,
    required,
    onChange,
    name,
    title,
    value
  } = props;

  return (
    <div className={cls(className, extraClassName)}>
      {title && (
        <label htmlFor={name}>
          {title}
          {required && <em>*</em>}
        </label>
      )}
      <textarea
        className="form-control"
        id={name}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
};

Textarea.defaultProps = {
  className: 'form-group'
};

Textarea.propTypes = {
  className: PropTypes.string,
  extraClassName: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.string
};

export default Textarea;
