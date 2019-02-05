import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link, Title } from '.';

const FooterList = props => {
  const { className, links, title } = props;
  return (
    <div className={className}>
      <Title type="h5" extraClassName="white bold">
        {title}
      </Title>
      <ul className="list-unstyled">
        {_.map(links, ({ to, title: linkTitle }, key) => (
          <li key={key}>
            <Link to={to}>{linkTitle}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

FooterList.defaultProps = {
  className: 'footer-list'
};

FooterList.propTypes = {
  className: PropTypes.string,
  links: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

export default FooterList;
