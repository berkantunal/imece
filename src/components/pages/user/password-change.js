import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert, Breadcrumbs, Title, Input, Button } from '$/components/ui';
import { updateUserInformation, setUpdateStatus } from '$/store/actions/user';

class PasswordChange extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const {
      user: { user }
    } = props;

    this.state = {
      form: {
        profilePicture: user.profilePicture ? user.profilePicture : null
      },
      showError: false
    };
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;

    if (prevProps.user.updated !== user.updated && user.updated) {
      setTimeout(() => {
        this.props.setUpdateStatus(false);
      }, 5000);
    }
  }

  handleChange = event => {
    const { form } = this.state;
    const { value, name } = event.target;

    form[name] = value;
    if (!value) {
      delete form[name];
    }

    this.setState({
      ...this.state,
      form
    });
  };

  handleSubmit() {
    const { form } = this.state;
    const {
      user: { user }
    } = this.props;

    if (!form.password || !form.passwordRepeat || form.password !== form.passwordRepeat) {
      this.setState({
        ...this.state,
        showError: true
      });

      return false;
    }

    this.setState({
      ...this.state,
      showError: false
    });

    this.props.updateUserInformation(user.userId, form);

    return true;
  }

  render() {
    const {
      user: { updated, updating }
    } = this.props;
    const { form, showError } = this.state;

    return (
      <div className="user-information">
        <div className="page-header pb-2 mb-3">
          <Title extraClassName="pt-3 bold" type="h2">
            Hesap Bilgileri
          </Title>
          <div className="d-flex justify-content-between align-items-end">
            <div className="w-100">
              <Breadcrumbs
                links={[{ title: 'Anasayfa', to: '/' }, { title: 'Hesap Bilgileri', to: '' }]}
              />
            </div>
          </div>
        </div>
        <div className="form">
          <form>
            {updated && <Alert type="success">Bilgileriniz güncellendi.</Alert>}
            {showError && !form.password && <Alert>Lütfen şifre alanını doldurunuz.</Alert>}
            {showError && !form.passwordRepeat ? (
              <Alert>Lütfen şifre tekrar alanını doldurunuz.</Alert>
            ) : (
              showError &&
              form.password !== form.passwordRepeat && <Alert>Şifre alanları eşleşmiyor.</Alert>
            )}
            <div className="row">
              <Input
                extraClassName="col-12 col-sm-6"
                type="password"
                title="Şifre"
                name="password"
                value={form.password}
                onChange={this.handleChange}
              />
              <Input
                extraClassName="col-12 col-sm-6"
                type="password"
                title="Şifre Tekrar"
                name="passwordRepeat"
                value={form.passwordRepeat}
                onChange={this.handleChange}
              />
            </div>
            <hr />
            <div className="buttons d-flex justify-content-end pb-4">
              <Button
                loading={updating}
                extraClassName="btn-orange btn-lg"
                onClick={this.handleSubmit}
              >
                Bilgilerimi Güncelle
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

PasswordChange.propTypes = {
  setUpdateStatus: PropTypes.func,
  updateUserInformation: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  setUpdateStatus,
  updateUserInformation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordChange);
