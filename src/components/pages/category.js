import Header from '$/components/common/header';
import Footer from '$/components/common/footer';
import ProductSlider from '$/components/common/product-slider';
import List from './category/list';
import SideBar from './category/sidebar';
import Social from '$/components/common/social';
import React from 'react';

import '$/assets/css/category.css';

const Category = () => (
  <div className="main-container">
    <Header />
    <div className="gray-bg">
      <div className="container">
        <SideBar />
        <List />
      </div>
    </div>
    <div className="container">
      <ProductSlider title="YENİ BAŞLAYAN İMECELER" />
    </div>
    <div className="orange-bg">
      <div className="container">
        <Social />
      </div>
    </div>
    <Footer />
  </div>
);

export default Category;
