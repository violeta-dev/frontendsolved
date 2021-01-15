import { getAdvert } from './selectors';

describe('getAdvert', () => {
  test('should return the advert with the same id', () => {
    const id = '60020b1b0a14d0234008bce3';
    const advert = 'advert';
    const state = {
      advert: {
        [id]: advert,
      },
    };
    expect(getAdvert(id)(state)).toBe(advert);
  });
});
