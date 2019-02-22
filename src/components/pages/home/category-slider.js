import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Slider, Title, Link } from '$/components/ui/';
import { getCategories } from '$/store/actions/product-category';
import _ from 'lodash';

class CategorySlider extends React.Component {
  componentDidMount() {
    this.props.getCategories();
  }

  getUrl(categoryRow) {
    const encodedForm = JSON.stringify({ productCategoryId: categoryRow.productCategoryId });

    return `/category?filter=${encodeURIComponent(encodedForm)}`;
  }

  render() {
    const { category } = this.props;

    return (
      <div className="category-slider pb-4">
        <Title type="h1" extraClassName="underline text-center bold py-5">
          <span>KATEGORİLER</span>
        </Title>
        <Slider
          settings={{
            arrows: true,
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
          {_.map(category.list, categoryRow => (
            <div key={categoryRow} className="category-slider-item">
              <Link to={this.getUrl(categoryRow)}>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="icon">
                    <i className={categoryRow.icon ? categoryRow.icon : 'fa fa-car'} />
                  </div>
                  <Title type="h3" extraClassName="bold mt-3">
                    {categoryRow.title}
                  </Title>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

CategorySlider.propTypes = {
  category: PropTypes.object,
  getCategories: PropTypes.func
};

const mapStateToProps = state => {
  return {
    category: state.category
  };
};

const mapDispatchToProps = {
  getCategories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySlider);
