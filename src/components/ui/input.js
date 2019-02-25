import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import MaskedInput from 'react-text-mask';
import { getImageLink } from '$/helpers/image';

import '$/assets/css/ui/input.css';

const Input = props => {
  const {
    className,
    extraClassName,
    placeholder,
    readOnly,
    required,
    onBlur,
    onChange,
    onFocus,
    mask,
    name,
    title,
    type,
    value
  } = props;

  const inputOptions = {
    className: 'form-control',
    id: name,
    mask,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    readOnly,
    type,
    value
  };

  if (inputOptions.type === 'file') {
    delete inputOptions.value;
  }

  return (
    <div className={cls(className, extraClassName)}>
      {title && (
        <label htmlFor={name}>
          {title}
          {required && <em>*</em>}
        </label>
      )}
      <div className={`input input-${type} ${type === 'file' && value ? 'd-flex' : ''}`}>
        {type === 'file' && value && (
          <div className="preview mr-3">
            <img src={getImageLink(value)} alt="Profile" />
          </div>
        )}
        {mask.length ? <MaskedInput {...inputOptions} /> : <input {...inputOptions} />}
      </div>
    </div>
  );
};

Input.defaultProps = {
  className: 'form-group',
  mask: [],
  type: 'text'
};

Input.propTypes = {
  className: PropTypes.string,
  extraClassName: PropTypes.string,
  mask: PropTypes.array,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
};

export default Input;
