export const compact = (object = {}) => {
  Object.keys(object).forEach(key => {
    if (object[key] === undefined || object[key] === null || object[key] === '') {
      delete object[key];
    }
  });
  return object;
};
