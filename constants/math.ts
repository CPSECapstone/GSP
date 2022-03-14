/* eslint-disable import/prefer-default-export */
const average = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

export { average };
