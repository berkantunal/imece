import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Lightbox from 'react-image-lightbox';
import { Button } from '$/components/ui/';

import 'react-image-lightbox/style.css';

class Images extends Component {
  constructor(props) {
    super(props);

    const firstImage = _.first(props.images);

    this.state = {
      currentImage: firstImage,
      isLightboxOpen: false,
    };
  }

  handleChangeImage(index) {
    const { images } = this.props;
    const { state } = this;

    this.setState({
      ...state,
      currentImage: images[index],
    });
  }

  handleLightboxState(lightboxState) {
    const { state } = this;

    this.setState({
      ...state,
      isLightboxOpen: lightboxState,
    });
  }

  render() {
    const { images } = this.props;
    const { currentImage, isLightboxOpen } = this.state;

    return (
      <div className="product-images">
        <div className="image">
          <img src={currentImage} alt="" />
          {isLightboxOpen && (
            <Lightbox
              mainSrc={currentImage}
              onCloseRequest={() => this.handleLightboxState(false)}
            />
          )}
          <Button
            extraClassName="btn-lightbox mt-3 pl-0"
            onClick={() => this.handleLightboxState(true)}
          >
            Fotoğrafı Büyüt <i className="fa fa-search" />
          </Button>
        </div>
        <div className="thumbnails">
          <div className="row">
            {_.map(images, (image, key) => (
              <div key={key} className="col-4">
                <Button
                  extraClassName={`btn-thumbnail ${currentImage === image ? 'active' : ''}`}
                  onClick={() => {
                    this.handleChangeImage(key);
                  }}
                >
                  <img src={image} alt="" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Images.propTypes = {
  images: PropTypes.array,
};

export default Images;
