import React from 'react';
import T from 'prop-types';

import styles from './FormField.module.css';

const FormField = ({ children, label, ...props }) => (
  <div className={styles.field} {...props}>
    <span className={styles.label}>{label}</span>
    {children}
  </div>
);

FormField.propTypes = {
  children: T.node,
  label: T.node,
};

export default FormField;
