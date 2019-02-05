import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from '.';

import '$/assets/css/ui/breadcrumbs.css';

const Breadcrumbs = props => {
  const { className, links } = props;
  return (
    <div className={className}>
      <ul className="list-unstyled mb-0">
        {_.map(links, ({ to, title }, key) => (
          <li key={key}>
            <Link to={to}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Breadcrumbs.defaultProps = {
  className: 'breadcrumbs',
  links: [],
};

Breadcrumbs.propTypes = {
  className: PropTypes.string,
  links: PropTypes.array,
};

export default Breadcrumbs;
