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
    title,
    options,
  } = props;
  return (
    <div className={cls(className, extraClassName)}>
      {title && <label htmlFor="exampleInputEmail1">{title}</label>}
      <select className={cls(inputClassName, inputExtraClassName)} id="exampleFormControlSelect1">
        {placeholder && <option>{placeholder}</option>}
        {_.map(options, (optionTitle, optionValue) => (
          <option key={optionValue} value={optionValue}>
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
  options: [],
};

Select.propTypes = {
  className: PropTypes.string,
  extraClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  inputExtraClassName: PropTypes.string,
  options: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
  placeholder: PropTypes.string,
  title: PropTypes.string,
};

export default Select;
