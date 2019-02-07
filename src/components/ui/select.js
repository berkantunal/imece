import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import _ from 'lodash';

const Select = props => {
  const {
    className,
    extraClassName,
    inputClassName,
    inputExtraClassName,
    placeholder,
    onChange,
    name,
    title,
    options
  } = props;
  return (
    <div className={cls(className, extraClassName)}>
      {title && <label htmlFor={name}>{title}</label>}
      <select
        className={cls(inputClassName, inputExtraClassName)}
        id={name}
        name={name}
        onChange={onChange}
      >
        <option value="">Seçiniz</option>
        {placeholder && <option>{placeholder}</option>}
        {_.map(options, ({ title: optionTitle, value }, key) => (
          <option key={key} value={value}>
            {optionTitle}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.defaultProps = {
  className: 'form-group',
  inputClassName: 'form-control',
  options: []
};

Select.propTypes = {
  className: PropTypes.string,
  extraClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  inputExtraClassName: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
  placeholder: PropTypes.string,
  title: PropTypes.string
};

export default Select;
