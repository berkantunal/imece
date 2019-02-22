import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import slugify from 'slugify';
import _ from 'lodash';
import TierPrice from './form/tier-price';
import ProductView from '$/components/pages/product/view';
import Image from './form/image';
import { Alert, Input, Button, Select, Title, Textarea } from '$/components/ui';
import { getCategories } from '$/store/actions/product-category';
import { getUsersProductList, createProduct, updateProduct } from '$/store/actions/product';

import '$/assets/css/user-product-form.css';

class UserProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeTierPrice = this.handleChangeTierPrice.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const {
      user: { user }
    } = this.props;

    this.state = {
      activeTab: 0,
      form: props.formData || {
        tierPrice: [
          {
            price: 1349.99,
            requiredUserCount: 15
          },
          {
            price: 1249.99,
            requiredUserCount: 25
          }
        ],
        userId: user.userId
      },
      loading: false,
      showError: false
    };
  }

  componentDidMount() {
    const { category } = this.props;

    if (!category.fetched) {
      this.props.getCategories();
    }
  }

  handleChangeTierPrice = tierPrice => {
    const { form } = this.state;

    form.tierPrice = tierPrice;

    this.setState({
      ...this.state,
      form
    });
  };

  handleChangeDate = date => {
    const { form } = this.state;

    form.finishDate = date;

    this.setState({
      ...this.state,
      form
    });
  };

  handleChangeImage = data => {
    const { form } = this.state;
    const { name, value } = data;

    form[name] = value;

    this.setState({
      ...this.state,
      form
    });
  };

  handleChange = event => {
    const { form } = this.state;
    const { value, name } = event.target;

    form[name] = value;
    if (!value) {
      delete form[name];
    }

    if (name === 'title') {
      form.slug = slugify(value);
    }

    this.setState({
      ...this.state,
      form
    });
    // eslint-disable-next-line
    console.log(form);
  };

  nextTab = () => {
    const { activeTab, form } = this.state;
    let newActiveTab = false;

    if (activeTab === 0) {
      if (form.productCategoryId) {
        newActiveTab = 1;
      } else {
        this.setState({
          ...this.state,
          showError: true
        });
      }
    }

    if (activeTab === 1) {
      if (
        form.title &&
        form.owner &&
        form.location &&
        form.oldPrice &&
        form.finishDate &&
        form.shortDescription &&
        form.description &&
        form.tierPrice.length
      ) {
        newActiveTab = 2;
      } else {
        this.setState({
          ...this.state,
          showError: true
        });
      }
    }

    if (activeTab === 2) {
      if (form.images.length) {
        newActiveTab = 3;
      } else {
        this.setState({
          ...this.state,
          showError: true
        });
      }
    }

    if (newActiveTab) {
      this.setState({
        ...this.state,
        activeTab: newActiveTab,
        showError: false
      });
    }
  };

  prevTab = () => {
    const { activeTab } = this.state;
    let newActiveTab = false;
    newActiveTab = activeTab - 1;

    if (!newActiveTab) {
      newActiveTab = 0;
    }

    this.setState({
      ...this.state,
      activeTab: newActiveTab
    });
  };

  submitComplete = () => {
    const {
      handleClose,
      user: { user }
    } = this.props;

    this.setState({
      ...this.state,
      loading: false
    });

    this.props.getUsersProductList(user.userId);
    handleClose(false);
  };

  handleSubmit() {
    const { form } = this.state;

    this.setState({
      ...this.state,
      loading: true
    });

    if (form.productId) {
      updateProduct(form.productId, form).then(this.submitComplete);
    } else {
      createProduct(form).then(this.submitComplete);
    }

    return true;
  }

  render() {
    const { category, city } = this.props;
    const { activeTab, form, showError, loading } = this.state;

    return (
      <div className="form">
        <div className="tabs d-flex justify-content-between align-items-center">
          <div
            className={`tab tab-1 ${activeTab === 0 ? 'active' : ''} ${
              activeTab > 0 ? 'completed' : ''
            }`}
          >
            Kategori Seçimi
          </div>
          <div
            className={`tab tab-2 ${activeTab === 1 ? 'active' : ''} ${
              activeTab > 1 ? 'completed' : ''
            }`}
          >
            Ürün İçeriği
          </div>
          <div
            className={`tab tab-3 ${activeTab === 2 ? 'active' : ''} ${
              activeTab > 2 ? 'completed' : ''
            }`}
          >
            Resimler
          </div>
        </div>
        <form className="mt-3 tab-contents">
          <div className={`tab-content tab-content-1 ${activeTab === 0 ? 'active' : ''}`}>
            {showError && <Alert closable>Lütfen kategori seçiniz.</Alert>}
            <div className="row category-list">
              {_.map(category.list, categoryRow => (
                <div key={categoryRow.productCategoryId} className="col-sm-6 col-lg-4 my-3">
                  <div
                    className={`category-list-item p-3 ${
                      form.productCategoryId &&
                      form.productCategoryId.toString() === categoryRow.productCategoryId.toString()
                        ? 'active'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="productCategoryId"
                      value={categoryRow.productCategoryId}
                      onChange={this.handleChange}
                    />
                    <i className="fa fa-check-circle check-icon" />
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <div className="icon">
                        <i className="fa fa-car" />
                      </div>
                      <Title type="h5" extraClassName="bold mt-3">
                        {categoryRow.title}
                      </Title>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`tab-content tab-content-2 ${activeTab === 1 ? 'active' : ''}`}>
            {showError && <Alert closable>Lütfen yıldızla işaretli alanları doldurunuz.</Alert>}
            <div className="row">
              <Input
                extraClassName="col-6"
                name="title"
                title="Başlık"
                value={form.title}
                onChange={this.handleChange}
                required
              />
              <Input
                extraClassName="col-6"
                name="owner"
                title="Ürün Sahibi"
                value={form.owner}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="row">
              <Select
                extraClassName="col-12 col-lg-6"
                name="location"
                title="Şehir"
                value={form.location}
                onChange={this.handleChange}
                options={city.optionList}
              />
              <Input
                extraClassName="col-12 col-lg-3"
                name="oldPrice"
                title="İndirimsiz Fiyat"
                value={form.oldPrice}
                onChange={this.handleChange}
                required
              />
              <div className="form-group col-12 col-lg-3">
                <label htmlFor="finishDate">
                  Son Katılım Tarihi
                  <em>*</em>
                </label>
                <DatePicker
                  selected={form.finishDate}
                  onChange={this.handleChangeDate}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <Input
                extraClassName="col-12"
                name="shortDescription"
                title="Kısa Açıklama"
                value={form.shortDescription}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="row">
              <Textarea
                extraClassName="col-12"
                name="description"
                title="Nasıl Çalışır ?"
                value={form.description}
                onChange={this.handleChange}
                required
              />
            </div>
            <TierPrice handleChange={this.handleChangeTierPrice} value={form.tierPrice} />
          </div>
          <div className={`tab-content tab-content-3 ${activeTab === 2 ? 'active' : ''}`}>
            {showError && <Alert closable>En az bir resim seçmelisiniz.</Alert>}
            <Image limit={4} images={form.images} onChange={this.handleChangeImage} name="images" />
          </div>
          <div className={`tab-content tab-content-4 ${activeTab === 3 ? 'active' : ''}`}>
            <div className="buttons d-flex flex-wrap flex-lg-nowrap mb-3 justify-content-between align-items-center">
              <Button extraClassName="btn-lg col-6 col-lg-auto" onClick={this.prevTab}>
                <i className="fa fa-angle-left mr-2" />
                Geri
              </Button>
              <Title
                type="h5"
                extraClassName="bold order-3 order-lg-auto col-12 col-lg-auto pt-4 pt-lg-0"
              >
                Ürününüz bu şekilde gözükecek.
              </Title>
              <Button
                loading={loading}
                extraClassName="btn-orange btn-lg col-6 col-lg-auto"
                onClick={this.handleSubmit}
              >
                Onayla
                <i className="fa fa-check ml-2" />
              </Button>
            </div>
            <div className="product-view-content">
              {activeTab === 3 && <ProductView product={form} />}
            </div>
          </div>
          <hr />
          {activeTab !== 3 && (
            <div
              className={`buttons d-flex mb-3 justify-content-${activeTab > 0 ? 'between' : 'end'}`}
            >
              {activeTab > 0 && (
                <Button extraClassName="btn-orange btn-lg" onClick={this.prevTab}>
                  <i className="fa fa-angle-left  mr-2" />
                  Geri
                </Button>
              )}
              <Button loading={loading} extraClassName="btn-orange btn-lg" onClick={this.nextTab}>
                {activeTab === 2 ? 'Kaydet' : 'Devam'}
                <i className="fa fa-angle-right ml-2" />
              </Button>
            </div>
          )}
        </form>
      </div>
    );
  }
}

UserProductForm.propTypes = {
  category: PropTypes.object,
  city: PropTypes.object,
  formData: PropTypes.object,
  getCategories: PropTypes.func,
  getUsersProductList: PropTypes.func,
  handleClose: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => {
  return {
    category: state.category,
    city: state.city,
    user: state.user
  };
};

const mapDispatchToProps = {
  getCategories,
  getUsersProductList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProductForm);
