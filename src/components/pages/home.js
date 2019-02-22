import Header from '$/components/common/header';
import Footer from '$/components/common/footer';
import CategorySlider from './home/category-slider';
import ProductSlider from '$/components/common/product-slider';
import List from './home/list';
import Slider from './home/slider';
import Social from '$/components/common/social';
import React from 'react';

import '$/assets/css/home.css';

const Home = () => (
  <div className="main-container">
    <Header />
    <Slider />
    <div className="gray-bg">
      <div className="container">
        <CategorySlider />
        <List />
      </div>
    </div>
    <div className="container">
      <ProductSlider title="YENİ BAŞLAYAN ÜRÜNLER" />
    </div>
    <div className="orange-bg">
      <div className="container">
        <Social />
      </div>
    </div>
    <Footer />
  </div>
);

export default Home;
