import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FooterList, Link } from '$/components/ui/';
import { getMenus } from '$/store/actions/menu';

import '$/assets/css/footer.css';

const footerLinks1 = [
  {
    title: 'Güvenli Ürünün İpuçları',
    to: '/m/guvenli-urunun-ipuclari'
  },
  {
    title: 'Kullanım Koşulları',
    to: '/m/kullanim-kosullari'
  },
  {
    title: 'Üyelik Sözleşmesi',
    to: '/m/uyelik-sozlesmesi'
  },
  {
    title: 'Yardım',
    to: '/m/yardim'
  }
];

const footerLinks2 = [
  {
    title: 'Reklam',
    to: '/m/reklam'
  },
  {
    title: 'Doping',
    to: '/m/doping'
  },
  {
    title: 'Mobil',
    to: '/m/mobil'
  },
  {
    title: 'Ödeme Seçenekleri',
    to: '/m/odeme-secenekleri'
  }
];

class Footer extends React.Component {
  componentDidMount() {
    const {
      menu: { fetched }
    } = this.props;

    if (!fetched) {
      this.props.getMenus();
    }
  }

  render() {
    const {
      menu: { fetched }
    } = this.props;

    return (
      <footer>
        <div className="dark-gray-bg">
          <div className="container">
            <div className="pt-5 pb-4">
              <div className="row">
                <div className="col-12 col-md-4">
                  {fetched && <FooterList title="Gizlilik ve Kullanım" links={footerLinks1} />}
                </div>
                <div className="col-12 col-md-4">
                  {fetched && <FooterList title="Hizmetlerimiz" links={footerLinks2} />}
                </div>
                <div className="col-12 col-md-4">
                  <div className="footer-contact pt-3 white">
                    <p>
                      Destek Merkezi <br />
                      <Link to="/yardim">ucuzmax.com/yardim</Link>
                    </p>
                    <p>
                      7/24 Müşteri Hizmetleri <br />
                      <Link to="phone:+908502222222">0 850 222 22 22</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright py-3 white">Copyright &copy; 2015 UcuzMax.com</div>
      </footer>
    );
  }
}

Footer.propTypes = {
  getMenus: PropTypes.func,
  menu: PropTypes.object
};

const mapStateToProps = state => {
  return {
    menu: state.menu
  };
};

const mapDispatchToProps = {
  getMenus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
