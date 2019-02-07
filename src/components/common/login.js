import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Input, Button, Modal } from '$/components/ui/';
import { login, setLoginModalVisibility, setSignupModalVisibility } from '$/store/actions/user';

import '$/assets/css/header.css';

class UILogin extends React.Component {
  constructor(props) {
    super(props);

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleShowSignup = this.handleShowSignup.bind(this);
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
      // eslint-disable-next-line
      // console.log('showError', form.password + ' || ' + form.passwordRepeat + ' || ' + form.password + ' !== ' + form.passwordRepeat);
      // eslint-disable-next-line
      // console.log('showError', !(form.password === form.passwordRepeat));

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
          <p className="mb-0">
            Hesabın yok mu ?{' '}
            <a className="link underline" onClick={this.handleShowSignup}>
              Kayıt ol.
            </a>
          </p>
        </form>
      </Modal>
    );
  }
}

UILogin.propTypes = {
  login: PropTypes.func,
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
  setLoginModalVisibility,
  setSignupModalVisibility
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UILogin);
