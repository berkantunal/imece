import React from 'react';
import PropTypes from 'prop-types';
import Search from './sidebar/search';
import { Title } from '$/components/ui/';

import '$/assets/css/category-sidebar.css';

const CategorySideBar = props => (
  <div className="category-sidebar p-2">
    <div>
      <Title type="h3">Arama</Title>
    </div>
    <Search url={props.url} handleChangeFilter={props.handleChangeFilter} />
  </div>
);

CategorySideBar.propTypes = {
  handleChangeFilter: PropTypes.func,
  url: PropTypes.string
};

export default CategorySideBar;
