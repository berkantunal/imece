import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import Form from './product/form';
import { Breadcrumbs, Title, Button, ProductList } from '$/components/ui';
import { getUsersProductList, destroyProduct } from '$/store/actions/product';

class UserProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: false,
      formData: {}
    };
    this.handleChangeForm = this.handleChangeForm.bind(this);
  }

  componentDidMount() {
    const {
      user: { user }
    } = this.props;

    this.props.getUsersProductList(user.userId);
  }

  handleChangeForm = (status, data) => {
    this.setState({
      ...this.state,
      form: status,
      formData: data
    });
  };

  handleRemove = async product => {
    const {
      user: { user }
    } = this.props;

    await Swal.fire({
      cancelButtonColor: '#d33',
      cancelButtonText: 'Vazgeç',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Evet, Lütfen!',
      showCancelButton: true,
      text: 'Ürününü siliyorsun geri gelmeyebilir!',
      title: 'Emin misin ?',
      type: 'warning'
    }).then(result => {
      if (result.value) {
        destroyProduct(product.productId, user.userId).then(response => {
          if (response.success) {
            Swal.fire({
              confirmButtonText: 'Tamam',
              title: 'Silindi!'
            });
          }

          this.props.getUsersProductList(user.userId);
        });
      }
    });
  };

  handleUpdate = product => {
    const productObj = product;

    try {
      productObj.images = JSON.parse(productObj.images);
      productObj.tierPrice = JSON.parse(productObj.tierPrice);
    } catch (err) {
      // Ignore Error
    }

    this.handleChangeForm(true, productObj);
  };

  handleCreate() {
    this.handleChangeForm(true);
  }

  render() {
    const { product } = this.props;
    const { form, formData } = this.state;

    return (
      <div className="user-products">
        <div className="page-header pb-2 mb-3">
          <Title extraClassName="pt-3 bold" type="h2">
            Ürünlerim
          </Title>
          <div className="d-flex justify-content-between align-items-end">
            <div className="w-100">
              <Breadcrumbs
                links={[{ title: 'Anasayfa', to: '/' }, { title: 'Ürünlerim', to: '' }]}
              />
            </div>
            <div className="d-flex">
              {form ? (
                <Button extraClassName="btn-orange" onClick={() => this.handleChangeForm(false)}>
                  Vazgeç
                </Button>
              ) : (
                <Button extraClassName="btn-orange" onClick={() => this.handleChangeForm(true)}>
                  Ürün Ekle
                </Button>
              )}
            </div>
          </div>
        </div>
        {product.user.list.length === 0 && <p>Hesabınıza bağlı ürün bulunamadı.</p>}
        {!form && (
          <div className="product-list">
            <ProductList
              actions
              count={product.user.list.length}
              limit={product.user.list.length}
              products={product.user.list}
              productGridItemClassName="col-12 col-sm-6 col-lg-4 mt-3"
              handleRemove={this.handleRemove}
              handleUpdate={this.handleUpdate}
              grid
            />
          </div>
        )}
        {form && <Form formData={formData} handleClose={this.handleChangeForm} />}
      </div>
    );
  }
}

UserProducts.propTypes = {
  getUsersProductList: PropTypes.func,
  product: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => {
  return {
    product: state.product,
    user: state.user
  };
};

const mapDispatchToProps = {
  getUsersProductList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProducts);
