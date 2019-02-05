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
