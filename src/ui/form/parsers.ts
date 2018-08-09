export const pFloat = val => (isNaN(parseFloat(val)) ? null : parseFloat(val));

export const pInt = val =>
  isNaN(parseInt(val, 10)) ? null : parseInt(val, 10);
