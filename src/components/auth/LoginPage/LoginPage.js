import React from 'react';
import T from 'prop-types';
import { Alert, Col, Row, Typography } from 'antd';

import { login } from '../../../api/auth';
import LoginForm from './LoginForm';

const { Title } = Typography;

class LoginPage extends React.Component {
  state = {
    error: null,
  };

  handleSubmit = credentials => {
    const { onLogin, location, history } = this.props;
    this.resetError();
    login(credentials)
      .then(() => {
        onLogin(() => {
          // Navigate to previously required route
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
        <Col span={8} offset={8} style={{ marginTop: 64 }}>
          <Title style={{ textAlign: 'center' }}>Log In</Title>
          <LoginForm onSubmit={this.handleSubmit} />
          {error && (
            <Alert
              afterClose={this.resetError}
              closable
              message={error}
              showIcon
              type="error"
              style={{ marginTop: 24 }}
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
