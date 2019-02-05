import React from 'react';
import { Title } from '$/components/ui/';

const Social = () => (
  <div className="social-content pb-4">
    <Title type="h1" extraClassName="py-4 text-center dashed white">
      <span>BİZİ TAKİP EDİN</span>
    </Title>
    <div className="d-flex justify-content-center align-items-center">
      <a
        className="social-link twitter"
        href="https://www.twitter.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-twitter" />
      </a>
      <a
        className="social-link facebook"
        href="https://www.facebook.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-facebook-f" />
      </a>
      <a
        className="social-link pinterest"
        href="https://www.pinterest.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-pinterest-p" />
      </a>
    </div>
  </div>
);

export default Social;
