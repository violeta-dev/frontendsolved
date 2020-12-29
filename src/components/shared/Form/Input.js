import React from 'react';
import T from 'prop-types';

import { useFormContext } from './Form';

const Input = ({ component: Component, ...props }) => {
  const { name, type } = props;
  const { values, handleChange } = useFormContext();

  const inputProps = {
    [type === 'checkbox' ? 'checked' : 'value']: values[name],
    onChange: handleChange,
  };

  return <Component {...inputProps} {...props} />;
};

Input.propTypes = {
  name: T.string.isRequired,
  type: T.string,
  component: T.oneOfType([T.string, T.elementType]),
};

Input.defaultProps = {
  type: 'text',
  component: 'input',
};

export default Input;
