import _ from 'lodash';

export const objectToFormData = form => {
  const formData = new FormData();

  _.map(form, (value, name) => {
    formData.append(name, value);
  });

  return formData;
};
