import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Input, Button, Modal } from '$/components/ui/';
import {
  login,
  setLoginModalVisibility,
  setSignupModalVisibility,
  setForgotPasswordModalVisibility
} from '$/store/actions/user';

import '$/assets/css/header.css';

class UILogin extends React.Component {
  constructor(props) {
    super(props);

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleShowSignup = this.handleShowSignup.bind(this);
    this.handleShowForgotPassword = this.handleShowForgotPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      form: {},
      showError: false
    };
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
    this.props.setLoginModalVisibility(false);
  }

  handleShowSignup() {
    this.handleModalClose();
    this.props.setSignupModalVisibility(true);
  }

  handleShowForgotPassword() {
    this.handleModalClose();
    this.props.setForgotPasswordModalVisibility(true);
  }

  handleSubmit() {
    const { form } = this.state;
    const { user } = this.props;

    if (user.loadingLoading) {
      return false;
    }

    if (!form.email || !form.password) {
      this.setState({
        ...this.state,
        showError: true
      });

      return false;
    }

    this.props.login(form);
    return true;
  }

  render() {
    const { user } = this.props;
    const { form, showError } = this.state;

    const footerButtons = (
      <div className="d-flex w-100">
        <Button
          loading={user.loginLoading}
          extraClassName="btn-orange btn-lg"
          onClick={this.handleSubmit}
        >
          Giriş Yap
        </Button>
      </div>
    );

    return (
      <Modal
        show={user.loginModalVisibility}
        handleClose={this.handleModalClose}
        title="Kullanıcı Girişi"
        footer={footerButtons}
      >
        {user.isLoggedIn && <Redirect to="/user/information" />}
        <form>
          {showError && user.loginError && <Alert>E-mail adresi veya şifre yanlış.</Alert>}
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
          <p className="mb-0 d-flex justify-content-between">
            <a className="link underline" onClick={this.handleShowSignup}>
              Kayıt Ol
            </a>
            <a className="link underline" onClick={this.handleShowForgotPassword}>
              Şifremi Unuttum
            </a>
          </p>
        </form>
      </Modal>
    );
  }
}

UILogin.propTypes = {
  login: PropTypes.func,
  setForgotPasswordModalVisibility: PropTypes.func,
  setLoginModalVisibility: PropTypes.func,
  setSignupModalVisibility: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  login,
  setForgotPasswordModalVisibility,
  setLoginModalVisibility,
  setSignupModalVisibility
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UILogin);
