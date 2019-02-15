import axios from '$/lib/axios';

export const upload = async (data, onProgress) => {
  const formData = new FormData();
  formData.append('file', data);

  const config = {};

  if (typeof onProgress === 'function') {
    config.onUploadProgress = onProgress;
  }

  const response = await axios()
    .post(`images`, formData, config)
    .then(res => res.data);

  return response;
};
