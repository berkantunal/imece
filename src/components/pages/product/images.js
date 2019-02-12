import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Lightbox from 'react-image-lightbox';
import { Button } from '$/components/ui/';
import { getPreviewImage, getImages } from '$/helpers/image';

import 'react-image-lightbox/style.css';

class Images extends Component {
  constructor(props) {
    super(props);

    const firstImage = getPreviewImage(props.images);

    this.state = {
      currentImage: firstImage,
      images: [],
      isLightboxOpen: false
    };
  }

  componentDidMount() {
    let { images } = this.props;
    images = getImages(images);

    this.setState({
      ...this.state,
      images
    });
  }

  handleChangeImage(index) {
    const { images } = this.state;

    this.setState({
      ...this.state,
      currentImage: images[index]
    });
  }

  handleLightboxState(lightboxState) {
    const { state } = this;

    this.setState({
      ...state,
      isLightboxOpen: lightboxState
    });
  }

  render() {
    const { currentImage, images, isLightboxOpen } = this.state;

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
              <div key={key} className="col-4 mb-3">
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
  images: PropTypes.array
};

export default Images;
