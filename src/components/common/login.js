import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button, Modal } from '$/components/ui/';
import { setModalVisibility } from '$/store/actions/login';

import '$/assets/css/header.css';

class UILogin extends React.Component {
  constructor(props) {
    super(props);

    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.props.setModalVisibility(false);
  }

  render() {
    const footerButtons = (
      <div className="d-flex w-100">
        <Button extraClassName="btn-orange">Giriş Yap</Button>
        <Button extraClassName="btn-dark">Kayıt Ol</Button>
      </div>
    );

    const { login } = this.props;

    return (
      <Modal
        show={login.loginModalVisibility}
        handleClose={this.handleModalClose}
        title="Kullanıcı Girişi"
        footer={footerButtons}
      >
        <form>
          <Input title="E-mail Adresi" />
          <Input title="Şifre" />
        </form>
      </Modal>
    );
  }
}

UILogin.propTypes = {
  login: PropTypes.object,
  setModalVisibility: PropTypes.func
};

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

const mapDispatchToProps = {
  setModalVisibility
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UILogin);
