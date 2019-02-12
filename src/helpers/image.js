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

export const getPreviewImage = images => {
  try {
    const decodedImages = jsonDecode(images);

    if (decodedImages) {
      const previewImage = _.first(decodedImages);
      return getImageLink(previewImage);
    }
  } catch (err) {
    // Ignore errors
  }

  return DEFAULT_IMAGE;
};

export const getImages = images => {
  try {
    let decodedImages = jsonDecode(images);

    if (decodedImages) {
      decodedImages = _.map(decodedImages, image => getImageLink(image));

      return decodedImages;
    }
  } catch (err) {
    // Ignore errors
  }

  return DEFAULT_IMAGE;
};
