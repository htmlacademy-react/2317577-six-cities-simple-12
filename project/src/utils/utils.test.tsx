import { countCurrrentRating, parseDate } from './utils';

describe('countCurrrentRating function', () => {
  it('should return width of the active rating stars', () => {
    expect(countCurrrentRating(5)).toBe('100%');
  });
});

describe('parseDate function', () => {
  it('parse date string to "month year" string', () => {
    expect(parseDate('Sat Apr 22 2023 12:55:24 GMT+0300')).toBe('April 2023');
  });
});
