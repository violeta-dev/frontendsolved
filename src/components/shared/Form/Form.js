import React, { useState, useContext, useCallback } from 'react';
import T from 'prop-types';

const FormContext = React.createContext();

export const useFormContext = () => {
  return useContext(FormContext);
};

const isFunction = obj => typeof obj === 'function';

const Form = ({ children, onSubmit, initialValues }) => {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = useCallback(
    ev => {
      ev.preventDefault();
      onSubmit(values);
    },
    [values, onSubmit],
  );

  const handleChange = useCallback(ev => {
    const { name, value, type, checked } = ev.target;
    setValues(values => ({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const contextValue = {
    values,
    handleChange,
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContext.Provider value={contextValue}>
        {isFunction(children) ? children(contextValue) : children}
      </FormContext.Provider>
    </form>
  );
};

Form.propTypes = {
  children: T.oneOfType([T.node, T.func]),
  onSubmit: T.func.isRequired,
  initialValues: T.shape({}),
};

export default Form;
