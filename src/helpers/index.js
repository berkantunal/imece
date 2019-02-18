import _ from 'lodash';

export const getDateDiff = (first, second) => {
  let firstDate = first;
  let secondDate = second;

  if (secondDate === undefined) {
    secondDate = new Date();
  }

  if (typeof firstDate === 'string') {
    firstDate = new Date(firstDate);
  }

  const date = {};
  const diff = firstDate - secondDate;

  date.days = Math.round(diff / (1000 * 60 * 60 * 24));

  return date;
};

export const optionList = (array = [], valueCol, titleCol) => {
  const optionListArr = _.map(array, row => {
    const value = _.get(row, valueCol);
    const title = _.get(row, titleCol);

    return {
      title,
      value
    };
  });

  return optionListArr;
};

export const jsonDecode = encodedStr => {
  let decodedStr = {};

  try {
    if (typeof encodedStr === 'string') {
      decodedStr = JSON.parse(encodedStr);
    } else if (typeof encodedStr === 'object') {
      decodedStr = encodedStr;
    }
  } catch (err) {
    // Ignore Errors
  }

  return decodedStr;
};
