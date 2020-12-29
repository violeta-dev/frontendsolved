import React from 'react';
import T from 'prop-types';
import { Alert, Col, Row, Typography } from 'antd';

import LoginForm from './LoginForm';

const { Title } = Typography;

const LoginPage = ({ error, onErrorClose, onLogin }) => (
  <Row>
    <Col span={8} offset={8} style={{ marginTop: 64 }}>
      <Title style={{ textAlign: 'center' }}>Log In</Title>
      <LoginForm onSubmit={onLogin} />
      {error && (
        <Alert
          afterClose={onErrorClose}
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

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
  onErrorClose: T.func.isRequired,
  error: T.string,
};

export default LoginPage;
