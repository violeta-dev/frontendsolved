import * as types from './types';
import { adverts } from './reducers';

describe('adverts', () => {
  const id = '60020b1b0a14d0234008bce3';
  const initialState = [{ id }];
  test('should manage ANY action', () => {
    const action = {
      type: 'ANY_ACTION',
    };
    const state = adverts(initialState, action);
    expect(state).toBe(initialState);
  });

  test('should manage "ADVERTS_LOAD_SUCCESS" action', () => {
    const action = {
      type: types.ADVERTS_LOAD_SUCCESS,
      payload: [],
    };
    const state = adverts(initialState, action);
    expect(state).toEqual(action.payload);
  });

  test('should manage "ADVERTS_CREATE_SUCCESS" action', () => {
    const action = {
      type: types.ADVERTS_CREATE_SUCCESS,
      payload: { id: '60020b1b0a14d0234008bce4' },
    };
    const state = adverts(initialState, action);
    expect(state).toHaveLength(2);
  });

  test('should manage "ADVERTS_DELETE_SUCCESS" action', () => {
    const action = {
      type: types.ADVERTS_DELETE_SUCCESS,
      payload: id,
    };
    const state = adverts(initialState, action);
    expect(state).toHaveLength(0);
  });
});
