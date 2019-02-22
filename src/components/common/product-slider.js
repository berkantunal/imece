import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Slider, Title, SliderProductItem } from '$/components/ui/';
import { getNewStartedProducts } from '$/store/actions/product';
import _ from 'lodash';

class ProductSlider extends React.Component {
  componentDidMount() {
    const { product } = this.props;

    if (!product.fetched) {
      this.props.getNewStartedProducts();
    }
  }

  render() {
    const { product, title } = this.props;

    if (!product.newStartedProducts.fetched) {
      return false;
    }

    return (
      <div className="product-slider mb-5">
        <Title type="h2" extraClassName="text-center regular gray-top-border py-4">
          {title}
        </Title>
        <Slider
          settings={{
            arrows: true,
            dots: true,
            infinite: true,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToScroll: 2,
                  slidesToShow: 2
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToScroll: 1,
                  slidesToShow: 1
                }
              }
            ],
            slidesToScroll: 1,
            slidesToShow: 3,
            speed: 500
          }}
        >
          {_.map(product.newStartedProducts.list, productData => (
            <div key={productData.productId} className="product-slider-item d-flex flex-column">
              <SliderProductItem extraClassName="m-4" product={productData} />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

ProductSlider.propTypes = {
  getNewStartedProducts: PropTypes.func,
  product: PropTypes.object,
  title: PropTypes.string
};

const mapStateToProps = state => {
  return {
    product: state.product
  };
};

const mapDispatchToProps = {
  getNewStartedProducts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSlider);
