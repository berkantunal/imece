import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import { Button } from '$/components/ui/';
import { upload } from '$/store/actions/image';
import { getImageLink } from '$/helpers/image';

class ImageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropzoneClose: false,
      images: this.props.images,
      isProgressShow: false,
      progressPercent: 0
    };
    this.onImageDrop = this.onImageDrop.bind(this);
    this.onDestroyImage = this.onDestroyImage.bind(this);
  }

  componentDidMount() {
    this.handleChange();
  }

  onProgress = progressEvent => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

    setTimeout(() => {
      this.setState({
        ...this.state,
        progressPercent: percentCompleted
      });
    }, 250);
  };

  onImageDrop = files => {
    const { images } = this.state;
    const { limit } = this.props;
    const remainLimit = limit - images.length;
    const remainingFiles = _.slice(files, 0, remainLimit);

    remainingFiles.map(async image => {
      this.changeProgressStatus(true);

      const response = await upload(image, this.onProgress);
      if (response.success) {
        setTimeout(() => {
          this.changeProgressStatus(false);
          images.push(response.filename);

          this.setState({
            dropzoneClose: images.length === limit,
            images
          });
          this.handleChange();
        }, 500);
      }

      return true;
    });
  };

  onDestroyImage = async (event, imageKey) => {
    const { images } = this.state;
    const { limit } = this.props;
    const newImages = await _.remove(images, (image, key) => key !== imageKey);

    this.setState({
      dropzoneClose: newImages.length === limit,
      images: newImages
    });

    this.handleChange();
  };

  changeProgressStatus(status) {
    this.setState({
      ...this.state,
      isProgressShow: status,
      progressPercent: 0
    });
  }

  handleChange() {
    this.props.onChange({
      name: this.props.name,
      value: this.state.images
    });
  }

  render() {
    const { dropzoneClose, images, progressPercent, isProgressShow } = this.state;

    return (
      <div className="media-content">
        {!dropzoneClose && (
          <Dropzone onDrop={this.onImageDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={classNames('dropzone', { 'dropzone--isActive': isDragActive })}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Dosyaları buraya bırakabilirsin...</p>
                ) : (
                  <p>
                    <i className="fas fa-cloud-upload-alt mr-2" />
                    Dosyaları buraya sürüklemeyi dene veya tıklayıp seç
                  </p>
                )}
              </div>
            )}
          </Dropzone>
        )}
        <div className="media-item-list row">
          {_.map(images, (image, key) => (
            <div className="col-sm-3 my-3" key={key} data-key={key}>
              <div className="media-item">
                <Button
                  extraClassName="destroy-button"
                  onClick={event => this.onDestroyImage(event, key)}
                >
                  <i className="fa fa-trash" />
                </Button>
                <img src={getImageLink(image)} alt="" />
              </div>
            </div>
          ))}
          {isProgressShow && (
            <div className="col-sm-3 my-3">
              <div className="media-item media-loading-item">
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${progressPercent}%` }}
                    role="progressbar"
                    aria-valuenow={progressPercent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                <img src="https://via.placeholder.com/250x250/FFFFFF/FFFFFF" alt="" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

ImageForm.defaultProps = {
  images: []
};

ImageForm.propTypes = {
  images: PropTypes.array,
  limit: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ImageForm;
