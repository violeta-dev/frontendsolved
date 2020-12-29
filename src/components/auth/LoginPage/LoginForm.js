import React from 'react';
import T from 'prop-types';
import { Button, Checkbox, Input as DesignInput } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import { Form, Input } from '../../shared/Form';
import styles from './LoginForm.module.css';

const LoginForm = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    initialValues={{
      email: '',
      password: '',
      remember: false,
    }}
  >
    {({ values: { email, password } }) => (
      <React.Fragment>
        <Input
          name="email"
          className={styles.input}
          prefix={<MailOutlined />}
          placeholder="Email"
          component={DesignInput}
        />
        <Input
          name="password"
          className={styles.input}
          prefix={<LockOutlined />}
          placeholder="Password"
          component={DesignInput.Password}
        />
        <Input
          type="checkbox"
          name="remember"
          className={styles.input}
          component={Checkbox}
        >
          Remember me
        </Input>
        <Button
          type="primary"
          htmlType="submit"
          disabled={!email || !password}
          block
        >
          Log In
        </Button>
      </React.Fragment>
    )}
  </Form>
);

LoginForm.propTypes = {
  onSubmit: T.func.isRequired,
};

export default LoginForm;
