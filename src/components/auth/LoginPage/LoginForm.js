import React from 'react';
import T from 'prop-types';
import { Button, Checkbox, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import styles from './LoginForm.module.css';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    remember: false,
  };

  canSubmit = () => {
    const { email, password } = this.state;
    return !!(email && password);
  };

  handleEmailChange = ev => this.setState({ email: ev.target.value });
  handlePaswordChange = ev => this.setState({ password: ev.target.value });
  handleRememberChange = ev => this.setState({ remember: ev.target.checked });

  handleSubmit = ev => {
    const { onSubmit } = this.props;
    ev.preventDefault();
    onSubmit(this.state);
  };

  render() {
    const { email, password, remember } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          className={styles.input}
          prefix={<MailOutlined />}
          placeholder="Email"
          onChange={this.handleEmailChange}
          value={email}
        />
        <Input.Password
          className={styles.input}
          prefix={<LockOutlined />}
          placeholder="Password"
          onChange={this.handlePaswordChange}
          value={password}
        />
        <Checkbox
          className={styles.input}
          onChange={this.handleRememberChange}
          checked={remember}
        >
          Remember me
        </Checkbox>
        <Button
          type="primary"
          htmlType="submit"
          disabled={!this.canSubmit()}
          block
        >
          Log In
        </Button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: T.func.isRequired,
};

export default LoginForm;
