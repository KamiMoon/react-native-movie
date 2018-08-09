export const vRequired = value => (value ? undefined : "Required");

export const vMaxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const vNumber = value =>
  isNaN(Number(value)) ? "Must be a number" : undefined;

export const vInt = value =>
  isNaN(parseInt(value, 10)) ? "Must be an integer" : undefined;

export const vFloat = value =>
  isNaN(parseFloat(value)) ? "Must be an number." : undefined;

export const vMinValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;

export const vEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
