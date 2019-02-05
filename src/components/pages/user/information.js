import React from 'react';
import { Breadcrumbs, Title, Input, Button } from '$/components/ui';

const UserInformation = () => {
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
          <Input title="E-mail Adresi" />
          <div className="row">
            <Input extraClassName="col-6" title="Şifre" />
            <Input extraClassName="col-6" title="Şifre Tekrar" />
          </div>
          <hr />
          <div className="buttons d-flex justify-content-end">
            <Button extraClassName="btn-orange">Bilgilerimi Güncelle</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInformation;
