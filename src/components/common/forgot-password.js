import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Input, Button, Modal } from '$/components/ui/';
import { forgotPassword, setForgotPasswordModalVisibility } from '$/store/actions/user';

import '$/assets/css/header.css';

class UILogin extends React.Component {
  constructor(props) {
    super(props);

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleShowForgotPassword = this.handleShowForgotPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      form: {},
      loading: false,
      showError: false,
      success: null
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
    this.props.setForgotPasswordModalVisibility(false);
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

    if (!form.email) {
      this.setState({
        ...this.state,
        showError: true
      });

      return false;
    }

    forgotPassword(form).then(response => {
      this.setState({
        ...this.state,
        loading: false,
        success: response.success
      });

      setTimeout(() => {
        this.handleModalClose();
      }, 10000);
    });

    return true;
  }

  render() {
    const { user } = this.props;
    const { form, showError, success } = this.state;

    const footerButtons = (
      <div className="d-flex w-100">
        <Button
          loading={user.loginLoading}
          extraClassName="btn-orange btn-lg"
          onClick={this.handleSubmit}
        >
          Gönder
        </Button>
      </div>
    );

    return (
      <Modal
        show={user.forgotPasswordModalVisibility}
        handleClose={this.handleModalClose}
        title="Şifremi Gönder"
        footer={footerButtons}
      >
        <form>
          {success === true && (
            <Alert type="success">Şifreniz mail adresinize gönderilmiştir.</Alert>
          )}
          {success === false && <Alert>E-mail adresine kayıtlı hesap bulunamadı.</Alert>}
          <Input
            title="E-mail Adresi"
            name="email"
            value={form.email}
            onChange={this.handleChange}
          />
          {showError && !form.email && <Alert>Lütfen bir e-mail adresi girin.</Alert>}
        </form>
      </Modal>
    );
  }
}

UILogin.propTypes = {
  setForgotPasswordModalVisibility: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  setForgotPasswordModalVisibility
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UILogin);
