import React from 'react';
import { shallow } from 'enzyme';

import LogoutButton from './LogoutButton';

describe('LogoutButton', () => {
  const props = { onLogout: jest.fn() };
  const render = () => shallow(<LogoutButton {...props} />);
  test('snapshot', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

  test('should have round shape', () => {
    const wrapper = render();
    expect(wrapper.props().shape).toBe('round');
  });

  test('should have type dashed', () => {
    const wrapper = render();
    expect(wrapper.props().type).toBe('dashed');
  });

  test('should call onLogout', () => {
    const wrapper = render();
    wrapper.props().onConfirm();
    expect(props.onLogout).toHaveBeenCalled();
  });
});
