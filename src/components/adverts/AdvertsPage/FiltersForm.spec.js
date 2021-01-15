import React from 'react';
import { shallow } from 'enzyme';

import { FiltersForm } from './FiltersForm';

describe('FiltersForm', () => {
  const props = {
    onSubmit: jest.fn(),
    initialFilters: { name: 'Car', sale: 'all', price: [0, 1000], tags: [] },
  };
  const render = () => shallow(<FiltersForm {...props} />);
  test('snapshot', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

  test('should submit form with filters', () => {
    const wrapper = render();

    expect(
      wrapper.find('FormField').at(0).children().first().props().value,
    ).toBe(props.initialFilters.name);
    expect(
      wrapper.find('FormField').at(1).children().first().props().defaultValue,
    ).toBe(props.initialFilters.price);
    expect(
      wrapper.find('FormField').at(2).children().first().props().value,
    ).toBe(props.initialFilters.tags);
    expect(
      wrapper.find('FormField').at(3).children().first().props().value,
    ).toBe(props.initialFilters.sale);

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(props.onSubmit).toHaveBeenCalledWith(props.initialFilters);
  });
});
