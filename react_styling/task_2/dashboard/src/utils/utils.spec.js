import {
  getCurrentYear,
  getFooterCopy,
  getLatestNotification,
} from './utils';

describe('utils.js', () => {
  describe('getCurrentYear', () => {
    test('returns the current year', () => {
      expect(getCurrentYear()).toBe(new Date().getFullYear());
    });
  });

  describe('getFooterCopy', () => {
    test('returns the correct string when isIndex is true', () => {
      expect(getFooterCopy(true)).toBe('Holberton School');
    });

    test('returns the correct string when isIndex is false', () => {
      expect(getFooterCopy(false)).toBe(
        'Holberton School main dashboard'
      );
    });
  });

  describe('getLatestNotification', () => {
    test('returns the correct notification string', () => {
      expect(getLatestNotification()).toBe(
        '<strong>Urgent requirement</strong> - complete by EOD'
      );
    });
  });
});