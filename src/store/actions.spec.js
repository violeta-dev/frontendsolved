import {
  UI_RESET_ERROR,
  ADVERT_LOAD_REQUEST,
  ADVERT_LOAD_SUCCESS,
  ADVERT_LOAD_FAILURE,
} from './types';
import { loadAdvert, resetError } from './actions';

describe('resetError', () => {
  test('should create an "UI_RESET_ERROR" action', () => {
    const expectedAction = { type: UI_RESET_ERROR };
    const action = resetError();
    expect(action).toEqual(expectedAction);
  });
});

describe('loadAdvert', () => {
  const id = '60020b1b0a14d0234008bce3';
  const advert = 'advert';
  const error = 'error';
  const action = loadAdvert(id);
  describe('when advert with same id is cached in store', () => {
    const dispatch = jest.fn();
    const state = {
      advert: {
        [id]: advert,
      },
    };
    const getState = () => state;
    test('should do nothing', async () => {
      await action(dispatch, getState, {});
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('when api call is resolved', () => {
    const dispatch = jest.fn();
    const state = {
      advert: {},
    };
    const getState = () => state;
    test('should dispatch success action', async () => {
      const api = {
        adverts: {
          getAdvert: jest.fn().mockResolvedValue(advert),
        },
      };
      await action(dispatch, getState, { api });
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ADVERT_LOAD_REQUEST,
      });
      expect(api.adverts.getAdvert).toHaveBeenCalledWith(id);
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ADVERT_LOAD_SUCCESS,
        payload: advert,
      });
    });
  });

  describe('when api call is rejected', () => {
    const dispatch = jest.fn();
    const state = {
      advert: {},
    };
    const getState = () => state;
    test('should dispatch error action', async () => {
      const api = {
        adverts: {
          getAdvert: jest.fn().mockRejectedValue(error),
        },
      };
      await action(dispatch, getState, { api });
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ADVERT_LOAD_REQUEST,
      });
      expect(api.adverts.getAdvert).toHaveBeenCalledWith(id);
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ADVERT_LOAD_FAILURE,
        payload: error,
        error: true,
      });
    });
  });
});
