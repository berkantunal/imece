import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Input, Select, Button, Modal } from '$/components/ui/';
import { getCities } from '$/store/actions/city';
import { signup, setLoginModalVisibility, setSignupModalVisibility } from '$/store/actions/user';
import { optionList } from '$/helpers';

import '$/assets/css/header.css';

class UISignup extends React.Component {
  constructor(props) {
    super(props);

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleShowLogin = this.handleShowLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      form: {},
      showError: false
    };
  }

  componentDidMount() {
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

  handleModalClose() {
    this.props.setSignupModalVisibility(false);
  }

  handleShowLogin() {
    this.handleModalClose();
    this.props.setLoginModalVisibility(true);
  }

  handleSubmit() {
    const { form } = this.state;
    const { user } = this.props;

    if (user.signupLoading) {
      return false;
    }

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.passwordRepeat ||
      form.password !== form.passwordRepeat ||
      !form.city
    ) {
      this.setState({
        ...this.state,
        showError: true
      });

      return false;
    }

    this.props.signup(form);
    return true;
  }

  render() {
    const { user, city } = this.props;
    const { form, showError } = this.state;

    const footerButtons = (
      <div className="d-flex w-100">
        <Button
          loading={user.signupLoading}
          extraClassName="btn-orange btn-lg"
          onClick={this.handleSubmit}
        >
          Kayıt Ol
        </Button>
      </div>
    );

    return (
      <Modal
        show={user.signupModalVisibility}
        handleClose={this.handleModalClose}
        title="Kayıt Ol"
        footer={footerButtons}
      >
        {user.signedUp && <Redirect to="/user/information" />}
        <form>
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
          </div>
          {showError && (!form.firstName || !form.lastName) && (
            <Alert>Ad Soyad alanlarını doldurunuz.</Alert>
          )}
          <Input
            title="E-mail Adresi"
            name="email"
            value={form.email}
            onChange={this.handleChange}
          />
          {showError && !form.email && <Alert>Lütfen bir e-mail adresi girin.</Alert>}
          <Input
            type="password"
            title="Şifre"
            name="password"
            value={form.password}
            onChange={this.handleChange}
          />
          {showError && !form.password && <Alert>Lütfen şifre alanını doldurunuz.</Alert>}
          <Input
            type="password"
            title="Şifre Tekrar"
            name="passwordRepeat"
            value={form.passwordRepeat}
            onChange={this.handleChange}
          />
          {showError && !form.passwordRepeat ? (
            <Alert>Lütfen şifre tekrar alanını doldurunuz.</Alert>
          ) : (
            showError &&
            form.password !== form.passwordRepeat && <Alert>Şifre alanları eşleşmiyor.</Alert>
          )}
          <Select
            title="Şehir"
            name="city"
            value={form.city}
            onChange={this.handleChange}
            options={optionList(city.list, 'name', 'name')}
          />
          {showError && !form.city && <Alert>Lütfen şehir seçiniz.</Alert>}
          <p className="mb-0">
            Zaten üye misin ?{' '}
            <a className="link underline" onClick={this.handleShowLogin}>
              Giriş Yap
            </a>
          </p>
        </form>
      </Modal>
    );
  }
}

UISignup.propTypes = {
  city: PropTypes.object,
  getCities: PropTypes.func,
  setLoginModalVisibility: PropTypes.func,
  setSignupModalVisibility: PropTypes.func,
  signup: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => {
  return {
    city: state.city,
    user: state.user
  };
};

const mapDispatchToProps = {
  getCities,
  setLoginModalVisibility,
  setSignupModalVisibility,
  signup
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UISignup);
