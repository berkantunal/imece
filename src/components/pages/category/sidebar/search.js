import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Input, Select, Button } from '$/components/ui/';
import { getCities } from '$/store/actions/city';
import { getCategories } from '$/store/actions/product-category';
import _ from 'lodash';
import Url from 'url';

import '$/assets/css/category-sidebar-search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      form: this.getFilter(),
      redirect: false
    };
  }

  componentDidMount() {
    const { form } = this.state;
    const { handleChangeFilter } = this.props;

    this.props.getCategories();
    this.props.getCities();

    handleChangeFilter(form);
  }

  getUrl() {
    const { url: urlPath } = this.props;
    const url = Url.parse(urlPath, true);

    return url;
  }

  getFilter() {
    const url = this.getUrl();
    const filter = _.get(url, 'query.filter');
    let decodedFilter = {};

    if (typeof filter === 'string') {
      try {
        decodedFilter = JSON.parse(filter);
      } catch (err) {
        // Ignore
      }
    }

    return decodedFilter;
  }

  getEncodedFilterParam() {
    const { form, redirect } = this.state;
    const url = this.getUrl();
    const filter = _.get(url, 'query.filter');
    let encodedForm = JSON.stringify(form);

    if (filter === encodedForm) {
      encodedForm = false;

      if (redirect) {
        this.setState({
          ...this.state,
          redirect: false
        });
      }
    }

    return encodedForm;
  }

  handleChange = event => {
    const { form } = this.state;
    const { value, name } = event.target;

    form[name] = value;
    if (!value) {
      delete form[name];
    }

    this.setState({
      ...this.state,
      form
    });
  };

  handleSubmit() {
    const { form } = this.state;
    const { handleChangeFilter } = this.props;

    handleChangeFilter(form);

    this.setState({
      ...this.state,
      redirect: true
    });
  }

  render() {
    const { category, city, product } = this.props;
    const { form, redirect } = this.state;
    const encodedForm = this.getEncodedFilterParam();

    return (
      <div className="category-sidebar-search">
        {redirect && encodedForm && <Redirect to={`?filter=${encodeURIComponent(encodedForm)}`} />}
        <div className="d-flex flex-column justify-content-stretch">
          <div>
            <Input
              name="search"
              placeholder="Arama Kelimeleri"
              value={form.search}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <Select
              name="location"
              placeholder="Şehir"
              value={form.location}
              onChange={this.handleChange}
              options={city.optionList}
            />
          </div>
          <div>
            <Select
              name="productCategoryId"
              placeholder="Kategori"
              value={form.productCategoryId}
              onChange={this.handleChange}
              options={category.optionList}
            />
          </div>
          <div>
            <Button
              loading={product.loading}
              extraClassName="btn-orange w-100"
              onClick={this.handleSubmit}
            >
              Ara
              <i className="ml-2 fa fa-search" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  category: PropTypes.object,
  city: PropTypes.object,
  getCategories: PropTypes.func,
  getCities: PropTypes.func,
  handleChangeFilter: PropTypes.func,
  product: PropTypes.object,
  url: PropTypes.string
};

const mapStateToProps = state => {
  return {
    category: state.category,
    city: state.city,
    product: state.product
  };
};

const mapDispatchToProps = {
  getCategories,
  getCities
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
