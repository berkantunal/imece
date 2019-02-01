import cls from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import '$/assets/css/ui/title.css';

const style = {
  h1: 'h1 title',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
};

const Title = props => {
  const { type: HeaderType, extraClassName, children } = props;
  return <HeaderType className={cls(extraClassName, style[HeaderType])}>{children}</HeaderType>;
};

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  extraClassName: PropTypes.string,
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired,
};

export default Title;
