import _ from 'lodash';
import { API_IMAGE_BASE } from '$/config/api';

const DEFAULT_IMAGE = 'https://via.placeholder.com/250x150.png?text=250x150';

export const jsonDecode = jsonObj => {
  let response;

  try {
    response = JSON.parse(jsonObj);
  } catch (err) {
    response = [];
  }

  return response;
};

export const getImageLink = image => `${API_IMAGE_BASE}${image}`;

export const getImages = images => {
  let decodedImages = images;

  try {
    if (images != null && typeof decodedImages === 'string') {
      decodedImages = jsonDecode(images);
    }
  } catch (err) {
    // Ignore Errors
  }

  if (images && decodedImages) {
    decodedImages = _.map(decodedImages, image => getImageLink(image));

    return decodedImages;
  }

  return false;
};

export const getPreviewImage = images => {
  try {
    const decodedImages = getImages(images);

    if (decodedImages) {
      const previewImage = _.first(decodedImages);
      return previewImage;
    }
  } catch (err) {
    // Ignore errors
  }

  return DEFAULT_IMAGE;
};
