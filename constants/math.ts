/* eslint-disable import/prefer-default-export */
const average = (arr: number[]) =>
  arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

export { average };
