import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Select, Button, Modal } from '$/components/ui/';
import { setLoginModalVisibility } from '$/store/actions/login';
import { setSignupModalVisibility } from '$/store/actions/signup';
import { getCities } from '$/store/actions/city';
import { optionList } from '$/helpers';

import '$/assets/css/header.css';

class UISignup extends React.Component {
  constructor(props) {
    super(props);

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleShowLogin = this.handleShowLogin.bind(this);

    this.state = { cityOptionList: [] };
  }

  componentDidMount() {
    this.getCityOptionList();
  }

  getCityOptionList() {
    const { city } = this.props;

    if (!city.list.fetched && !city.loading) {
      this.props.getCities();
    }

    if (city.fetched) {
      const cityOptionList = optionList(city.list, 'name', 'name');

      this.setState({
        ...this.state,
        cityOptionList
      });
    }
  }

  handleModalClose() {
    this.props.setSignupModalVisibility(false);
  }

  handleShowLogin() {
    this.handleModalClose();
    this.props.setLoginModalVisibility(true);
  }

  render() {
    const footerButtons = (
      <div className="d-flex w-100">
        <Button extraClassName="btn-orange btn-lg">Kayıt Ol</Button>
      </div>
    );
    const { signup } = this.props;
    const { cityOptionList } = this.state;

    return (
      <Modal
        show={signup.modalVisibility}
        handleClose={this.handleModalClose}
        title="Kayıt Ol"
        footer={footerButtons}
      >
        <form>
          <div className="row">
            <Input title="Ad" extraClassName="col-6" />
            <Input title="Soyad" extraClassName="col-6" />
          </div>
          <Input title="E-mail Adresi" />
          <Input title="Şifre" />
          <Input title="Şifre Tekrar" />
          <Select title="Şehir" options={cityOptionList} />
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
  signup: PropTypes.object
};

const mapStateToProps = state => {
  return {
    city: state.city,
    signup: state.signup
  };
};

const mapDispatchToProps = {
  getCities,
  setLoginModalVisibility,
  setSignupModalVisibility
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UISignup);
