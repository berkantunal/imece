import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Input, Select, Button } from '$/components/ui/';
import { getCities } from '$/store/actions/city';
import { getCategories } from '$/store/actions/product-category';

import '$/assets/css/slider-search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      form: {},
      redirect: false
    };
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getCities();
  }

  handleChange = event => {
    const { form } = this.state;
    const {
      target: { value, name }
    } = event;

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
    this.setState({
      ...this.state,
      redirect: true
    });
  }

  render() {
    const { category, city } = this.props;
    const { form, redirect } = this.state;
    const encodedForm = JSON.stringify(form);

    return (
      <div className="search mx-auto">
        {redirect && encodedForm && (
          <Redirect to={`/category?filter=${encodeURIComponent(encodedForm)}`} />
        )}
        <div className="d-flex justify-content-stretch">
          <div className="col-4">
            <Input
              name="search"
              placeholder="Arama Kelimeleri"
              value={form.search}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-3">
            <Select
              name="location"
              placeholder="Şehir"
              value={form.location}
              onChange={this.handleChange}
              options={city.optionList}
            />
          </div>
          <div className="col-3">
            <Select
              name="productCategoryId"
              placeholder="Kategori"
              value={form.productCategoryId}
              onChange={this.handleChange}
              options={category.optionList}
            />
          </div>
          <div className="col-2">
            <Button extraClassName="btn-default w-100" onClick={this.handleSubmit}>
              <i className="fa fa-search" />
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
  getCities: PropTypes.func
};

const mapStateToProps = state => {
  return {
    category: state.category,
    city: state.city
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
