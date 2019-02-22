import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import scrollToElement from 'scroll-to-element';
import Header from '$/components/common/header';
import Footer from '$/components/common/footer';
import ProductSlider from '$/components/common/product-slider';
import Social from '$/components/common/social';
import _ from 'lodash';
import { Title } from '$/components/ui';

import '$/assets/css/menu.css';

class Menu extends React.Component {
  getMenu() {
    const {
      menu: { list }
    } = this.props;
    const { match } = this.props;
    const slug = _.get(match, 'params.slug');

    const menu = _.find(list, { slug });

    return menu;
  }

  render() {
    const {
      menu: { fetched }
    } = this.props;
    const menu = this.getMenu();

    if (fetched) {
      scrollToElement('.menu-content', {
        duration: 100
      });
    }

    return (
      <div className="main-container" key={menu ? menu.menuId : 0}>
        <Header />
        {menu && (
          <div className="menu-content">
            <div className="container my-5">
              <Title type="h2" extraClassName="mb-4">
                <span>{menu.title}</span>
              </Title>
              <div dangerouslySetInnerHTML={{ __html: menu.context }} />
            </div>
          </div>
        )}
        <div className="container">
          <ProductSlider title="TAVSİYE EDİLEN ÜRÜNLER" />
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

Menu.propTypes = {
  match: PropTypes.object,
  menu: PropTypes.object
};

const mapStateToProps = state => {
  return {
    menu: state.menu
  };
};

export default connect(mapStateToProps)(Menu);
