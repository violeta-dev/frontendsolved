import { useState } from 'react';

const useForm = config => {
  const initialValue = Object.entries(config).reduce((acc, [key, config]) => {
    const value = typeof config === 'object' ? config.value : config;
    return { ...acc, [key]: value };
  }, {});

  const [form, setForm] = useState(initialValue);

  const handleChange = ev => {
    const name = ev.target.name;
    const inputConfig = config[name];
    const valuePropName = inputConfig.valuePropName || 'value';
    setForm({ ...form, [name]: ev.target[valuePropName] });
  };

  return [form, handleChange];
};

export default useForm;
