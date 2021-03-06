import Header from '$/components/common/header';
import Footer from '$/components/common/footer';
import ProductSlider from '$/components/common/product-slider';
import List from './category/list';
import SideBar from './category/sidebar';
import Social from '$/components/common/social';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Title } from '$/components/ui/';
import _ from 'lodash';

import '$/assets/css/category.css';

class Category extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.state = {
      filter: {},
      filterShow: false,
      key: 0
    };
  }

  setCategoryAndFilter(filter) {
    const { category } = this.props;
    const state = {
      ...this.state,
      currentCategory: {},
      filter
    };

    if (filter.productCategoryId) {
      state.currentCategory = _.find(
        category.list,
        categoryRow => categoryRow.productCategoryId.toString() === filter.productCategoryId
      );
    }

    this.setState(state);
  }

  handleChangeFilter = filter => {
    this.setCategoryAndFilter(filter);
  };

  handleChangeFilterShowToggle = () => {
    const { filterShow } = this.state;

    this.setState({
      ...this.state,
      filterShow: !filterShow
    });
  };

  render() {
    const { location, product } = this.props;
    const url = _.get(location, 'pathname') + _.get(location, 'search');
    const { currentCategory, filter, filterShow } = this.state;

    return (
      <div className="main-container">
        <Header />
        <div className="gray-bg">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="header py-3">
                  <Title type="h2" extraClassName="bold">
                    {currentCategory !== undefined && currentCategory.title !== undefined
                      ? currentCategory.title
                      : 'TÜM ÜRÜNLER'}
                  </Title>
                  <Title type="h6" extraClassName="sub">
                    İmece sepetinde toplam {product.count} adet kayıt bulundu.
                  </Title>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="d-block d-sm-none pb-0 pb-sm-0">
                  <Button
                    extraClassName="btn-orange w-100"
                    onClick={() => this.handleChangeFilterShowToggle()}
                  >
                    {filterShow ? 'Filtreyi Kapat' : 'Ürün Filtresi'}
                  </Button>
                </div>
                <div
                  className={`d-${filterShow ? 'block' : 'none'} sidebar d-sm-block pb-3 pb-sm-0`}
                >
                  <SideBar url={url} handleChangeFilter={this.handleChangeFilter} />
                </div>
              </div>
              <div className="col-12 col-md-9">
                <List filter={JSON.stringify(filter)} />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <ProductSlider title="YENİ BAŞLAYAN ÜRÜNLER" />
        </div>
        <div className="orange-bg">
          <div className="container">
            <Social />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Category.propTypes = {
  category: PropTypes.object,
  location: PropTypes.object,
  product: PropTypes.object
};

const mapStateToProps = state => {
  return {
    category: state.category,
    product: state.product
  };
};

export default connect(mapStateToProps)(Category);
