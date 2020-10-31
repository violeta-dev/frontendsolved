import React from 'react';
import T from 'prop-types';
import { Alert, Button, Checkbox, Col, Input, Row, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import { login } from '../../api/auth';

const { Title } = Typography;

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
          prefix={<MailOutlined />}
          placeholder="Email"
          onChange={this.handleEmailChange}
          value={email}
        />
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          onChange={this.handlePaswordChange}
          value={password}
        />
        <Checkbox onChange={this.handleRememberChange} checked={remember}>
          Remember me
        </Checkbox>
        <Button
          type="primary"
          htmlType="submit"
          block
          disabled={!this.canSubmit()}
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

class LoginPage extends React.Component {
  state = {
    error: null,
  };

  handleSubmit = ({ remember, ...credentials }) => {
    const { onLogin, location, history } = this.props;
    this.resetError();
    login(credentials)
      .then(auth => {
        onLogin(auth, remember).then(() => {
          const { from } = location.state || { from: { pathname: '/' } };
          history.replace(from);
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  resetError = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    return (
      <Row>
        <Col span={6} offset={9} style={{ textAlign: 'center', marginTop: 64 }}>
          <Title>Log In</Title>
          <LoginForm onSubmit={this.handleSubmit} />
          {error && (
            <Alert
              afterClose={this.resetError}
              closable
              message={error}
              showIcon
              type="error"
            />
          )}
        </Col>
      </Row>
    );
  }
}

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
  history: T.shape({ replace: T.func.isRequired }).isRequired,
  location: T.shape({
    state: T.shape({ from: T.shape({ pathname: T.string }) }),
  }).isRequired,
};

export default LoginPage;
