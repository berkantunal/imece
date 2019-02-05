import React from 'react';
import { Breadcrumbs, Title, ProductList } from '$/components/ui/';

const UserFavorites = () => {
  return (
    <div className="user-favorites">
      <div className="page-header pb-2 mb-3">
        <Title extraClassName="pt-3 bold" type="h2">
          Favorilerim
        </Title>
        <div className="d-flex justify-content-between align-items-end">
          <div className="w-100">
            <Breadcrumbs
              links={[{ title: 'Anasayfa', to: '/' }, { title: 'Favorilerim', to: '' }]}
            />
          </div>
        </div>
      </div>
      <div className="product-list">
        <ProductList productItemClassName="col-4 mt-3" />
      </div>
    </div>
  );
};

export default UserFavorites;
