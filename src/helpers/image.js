import _ from 'lodash';
import { API_IMAGE_BASE } from '$/config/api';

const DEFAULT_IMAGE = 'https://via.placeholder.com/250x150.png?text=250x150';

export const getPreviewImage = images => {
  try {
    const decodedImages = JSON.parse(images);

    if (decodedImages) {
      const previewImage = _.first(decodedImages);
      return `${API_IMAGE_BASE}${previewImage}`;
    }
  } catch (err) {
    // Ignore errors
  }

  return DEFAULT_IMAGE;
};
