import React from 'react';
import { Title, ProductList } from '$/components/ui/';

const HomeList = () => (
  <div className="category-list">
    <div className="header py-3 pl-5">
      <Title type="h2" extraClassName="bold">
        TÜM İMECELER
      </Title>
      <Title type="h6" extraClassName="sub">
        İmece sepetinde toplam 169 adet kayıt bulundu.
      </Title>
    </div>
    <ProductList toolbar />
  </div>
);

export default HomeList;
