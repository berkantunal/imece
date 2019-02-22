import React from 'react';
import { FooterList, Link } from '$/components/ui/';

import '$/assets/css/footer.css';

const footerLinks1 = [
  {
    title: 'Güvenli İmecenin İpuçları',
    to: '/guvenli-imecenin-ipuclari'
  },
  {
    title: 'Kullanım Koşulları',
    to: '/kullanim-kosullari'
  },
  {
    title: 'Üyelik Sözleşmesi',
    to: '/uyelik-sozlesmesi'
  },
  {
    title: 'Yardım',
    to: '/yardim'
  }
];

const footerLinks2 = [
  {
    title: 'Reklam',
    to: '/reklam'
  },
  {
    title: 'Doping',
    to: '/doping'
  },
  {
    title: 'Mobil',
    to: '/mobil'
  },
  {
    title: 'Ödeme Seçenekleri',
    to: '/odeme-secenekleri'
  }
];

const Footer = () => {
  return (
    <footer>
      <div className="dark-gray-bg">
        <div className="container">
          <div className="pt-5 pb-4">
            <div className="row">
              <div className="col-12 col-md-4">
                <FooterList title="Gizlilik ve Kullanım" links={footerLinks1} />
              </div>
              <div className="col-12 col-md-4">
                <FooterList title="Hizmetlerimiz" links={footerLinks2} />
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
};

export default Footer;
