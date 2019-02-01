import React from 'react';
import { Input, Select, Button } from '$/components/ui/';

import '$/assets/css/ui/search.css';

const Search = () => {
  return (
    <div className="search mx-auto">
      <div className="d-flex justify-content-stretch">
        <div className="col-4">
          <Input placeholder="Arama Kelimeleri" />
        </div>
        <div className="col-3">
          <Select placeholder="Şehir" />
        </div>
        <div className="col-3">
          <Select placeholder="Kategori" />
        </div>
        <div className="col-2">
          <Button extraClassName="btn-default w-100">
            <i className="fa fa-search" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Search;
