/* eslint-disable */

import Header from '$/components/common/header';
import Footer from '$/components/common/footer';
import Social from '$/components/common/social';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert, Button, Title, Textarea, Input, Select } from '$/components/ui/';
import { getProductBySlug, setIncreaseProductSubscriber } from '$/store/actions/product';
import { setOrder } from '$/store/actions/order';
import { setProductSubscriber } from '$/store/actions/product-subscriber';
import { getCurrentPrice } from '$/helpers/product';
import Swal from 'sweetalert2';
import _ from 'lodash';
import Cards from 'react-credit-cards';

import '$/assets/css/checkout.css';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCC = this.handleChangeCC.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      creditCard: {
        name: "test",
        number: "1234567891111213",
        expiry: "12/22",
        cvc: "333"
      },
      form: {
        firstName: "test",
        lastName: "test",
        phone: "123123",
        location: "Ankara",
        address: "Ankara",
        agreement: true
      },
      focused: null,
      loading: null,
      redirect: false,
      showError: false
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const slug = _.get(match, 'params.slug');

    this.props.getProductBySlug(slug);
  }

  getCurrentProduct() {
    const {
      product: { list, current },
      match: { params }
    } = this.props;
    const { product_id: productId, slug } = params;
    const stateProduct = _.find(list, { productId, slug });
    let response = stateProduct;

    if (current.fetched) {
      response = current.data;
    }

    if (!response) {
      response = {};
    }

    return response;
  }

  handleChange = event => {
    const { form } = this.state;
    const { checked, value, name, type } = event.target;

    if (type == 'checkbox') {
      form[name] = checked;
    } else {
      form[name] = value;
      if (!value) {
        delete form[name];
      }
    }

    this.setState({
      ...this.state,
      form
    });
    console.log(form);
  };

  handleChangeCC = event => {
    const { creditCard } = this.state;
    const { value, name } = event.target;

    creditCard[name] = value;
    if (!value) {
      delete creditCard[name];
    }

    this.setState({
      ...this.state,
      creditCard
    });
  }

  handleFocus = event => {
    const { name } = event.target;

    this.setState({
      ...this.state,
      focused: name
    });
  };

  handleBlur = event => {
    this.setState({
      ...this.state,
      focused: null
    });
  };

  handleSubmit = async () => {
    const { creditCard, form } = this.state;
    const product = this.getCurrentProduct();
    const total = getCurrentPrice(product.tierPrice, product.subscriberCount);
    const {
      user: { user }
    } = this.props;

    if (
      !form.firstName ||
      !form.lastName ||
      !form.phone ||
      !form.location ||
      !form.address || 
      !form.agreement ||
      !creditCard.name ||
      !creditCard.number ||
      !creditCard.expiry ||
      !creditCard.cvc
    ) {
      this.setState({
        ...this.state,
        showError: true
      });

      return false;
    }
    this.setState({
      ...this.state,
      loading: true
    });

    setOrder(user.userId, {
      addressInformation: {
        ...form
      },
      productId: product.productId,
      total
    }).then(response => {
      if (response.success) {
        setProductSubscriber(user.userId, {
          orderId: response.orderId,
          paid: true
        });
        setIncreaseProductSubscriber(product.productId);

        Swal.fire({
          confirmButtonText: 'Teşekkürler!',
          title: 'Ödemeniz gerçekleştirildi! Teşekkürler'
        });

        this.setState({
          ...this.state,
          loading: false,
          redirect: true
        });
      }
    });

    return true;
  }

  render() {
    const { creditCard, form, focused, loading, redirect, showError } = this.state;
    const { city } = this.props;
    const product = this.getCurrentProduct();

    return (
      <div className="main-container">
        {redirect && <Redirect to={`/p/${product.slug}`} />}
        <Header />
        <div className="gray-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 pb-3">
                <div className="header py-3">
                  <Title type="h2" extraClassName="bold">
                    Ödeme
                  </Title>
                  <Title type="h6" extraClassName="sub">
                    <strong className="orange">
                      {product.title}
                    </strong>{' '}
                    ürünü için katılım ücreti{' '}
                    <big>
                      <strong className="orange">
                        {getCurrentPrice(product.tierPrice, product.subscriberCount)}
                      </strong>
                    </big>
                    {' '}
                    TLdir.
                  </Title>
                </div>
                <form className="checkout-form">
                  <div className="row">
                    <Input
                      title="Ad"
                      extraClassName="col-6"
                      name="firstName"
                      value={form.firstName}
                      onChange={this.handleChange}
                    />
                    <Input
                      title="Soyad"
                      extraClassName="col-6"
                      name="lastName"
                      value={form.lastName}
                      onChange={this.handleChange}
                    />
                    <div class="col-12">
                      {showError && (!form.firstName || !form.lastName) && (
                        <Alert>Ad Soyad alanlarını doldurunuz.</Alert>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div class="col-6">
                      <Input
                        title="Telefon"
                        name="phone"
                        value={form.phone}
                        onChange={this.handleChange}
                      />
                      {showError && !form.phone && <Alert>Lütfen telefon numaranızı girin.</Alert>}
                    </div>
                    <div class="col-6">
                      <Select
                        title="Şehir"
                        name="location"
                        value={form.location}
                        onChange={this.handleChange}
                        options={city.optionList}
                      />
                      {showError && !form.location && <Alert>Lütfen bulunduğunuz şehri seçin.</Alert>}
                    </div>
                  </div>
                  <Textarea
                    title="Adres"
                    name="address"
                    value={form.address}
                    onChange={this.handleChange}
                  />
                  {showError && !form.address && <Alert>Lütfen bulunduğunuz adresi girin.</Alert>}
                  <div className="row align-items-center justify-content-between">
                    <div className="col-12 col-sm-6">
                      <div className="row">
                        <div class="col-12">
                          <Input
                            title="Ad Soyad"
                            name="name"
                            value={creditCard.name}
                            onChange={this.handleChangeCC}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                          />
                          {showError && !creditCard.name && (
                            <Alert>Lütfen kartın üzerindeki ad soyadı girin.</Alert>
                          )}
                        </div>
                        <div class="col-12">
                          <Input
                            mask={[
                              /[1-9]/,
                              /[1-9]/,
                              /[1-9]/,
                              /[1-9]/,
                              ' ',
                              /[1-9]/,
                              /[1-9]/,
                              /[1-9]/,
                              /[1-9]/,
                              ' ',
                              /[1-9]/,
                              /[1-9]/,
                              /[1-9]/,
                              /[1-9]/,
                              ' ',
                              /[1-9]/,
                              /[1-9]/,
                              /[1-9]/,
                              /[1-9]/
                            ]}
                            title="Kart Numarası"
                            name="number"
                            value={creditCard.number}
                            onChange={this.handleChangeCC}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                          />
                          {showError && !creditCard.number && (
                            <Alert>Lütfen kart numarasını girin.</Alert>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <Input
                          mask={[
                            /[1-9]/,
                            /[1-9]/,
                            '/',
                            /[1-9]/,
                            /[1-9]/,
                          ]}
                          title="Ay / Yıl"
                          extraClassName="col-9"
                          name="expiry"
                          value={creditCard.expiry}
                          onChange={this.handleChangeCC}
                          onFocus={this.handleFocus}
                          onBlur={this.handleBlur}
                        />
                        <Input
                          mask={[
                            /[1-9]/,
                            /[1-9]/,
                            /[1-9]/,
                            /[1-9]/,
                          ]}
                          title="CVC"
                          extraClassName="col-3"
                          name="cvc"
                          value={creditCard.cvc}
                          onChange={this.handleChangeCC}
                          onFocus={this.handleFocus}
                          onBlur={this.handleBlur}
                        />
                        <div class="col-12">
                          {showError && (!creditCard.expiry || !creditCard.cvc) && (
                            <Alert>Lütfen son kullanma tarihini ve cvc numarasını girin.</Alert>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="cc-input">
                         <Cards
                           number={creditCard.number || ''}
                           name={creditCard.name || ''}
                           expiry={creditCard.expiry || ''}
                           cvc={creditCard.cvc || ''}
                           focused={focused}
                           placeholders={{ name: 'ADINIZ SOYADINIZ' }}
                           locale={{ valid: 'AY / YIL' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div  className="row justify-content-between align-items-center">
                    <div className="col-12 col-sm-8">
                      <div className="form-group form-check py-3 pl-0 mb-0">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="agreement"
                          name="agreement"
                          value="1"
                          checked={form.agreement}
                          onChange={this.handleChange}
                        />
                        <label
                          className="form-check-label"
                          for="agreement"
                        >
                          Gizlilik sözleşmesini okudum. Kabul ediyorum.
                        </label>
                      </div>
                      {showError && !form.agreement && (
                        <Alert>Lütfen gizlilik sözleşmesini onaylayın.</Alert>
                      )}
                    </div>
                    <div className="col-12 col-sm-4">
                      <Button
                        loading={loading}
                        extraClassName="btn-orange w-100"
                        onClick={this.handleSubmit}
                      >
                        Öde
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
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

Checkout.propTypes = {
  city: PropTypes.object,
  getProductBySlug: PropTypes.func,
  match: PropTypes.object,
  product: PropTypes.object
};

const mapStateToProps = state => {
  return {
    city: state.city,
    product: state.product,
    user: state.user
  };
};

const mapDispatchToProps = {
  getProductBySlug
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
