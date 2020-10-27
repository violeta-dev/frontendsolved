import React from 'react';
import T from 'prop-types';

import { login } from '../../api/auth';
import {
  Alert,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Typography,
} from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const formLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const fieldlLayout = {
  wrapperCol: {
    span: 24,
  },
};

const LoginForm = ({ onFinish }) => (
  <Form
    {...formLayout}
    initialValues={{
      email: '',
      password: '',
      remember: false,
    }}
    onFinish={onFinish}
  >
    <Form.Item
      name="email"
      rules={[{ required: true, message: 'Please, enter your Email!' }]}
      {...fieldlLayout}
    >
      <Input prefix={<MailOutlined />} placeholder="Email" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[{ required: true, message: 'Please, enter your Password!' }]}
      {...fieldlLayout}
    >
      <Input.Password prefix={<LockOutlined />} placeholder="Password" />
    </Form.Item>
    <Form.Item name="remember" valuePropName="checked" {...fieldlLayout}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>
    <Form.Item {...fieldlLayout}>
      <Button type="primary" htmlType="submit" block>
        Log In
      </Button>
    </Form.Item>
  </Form>
);

LoginForm.propTypes = {
  onFinish: T.func,
};

class LoginPage extends React.Component {
  state = {
    error: null,
  };

  handleFinish = ({ remember, ...credentials }) => {
    const { onLogin } = this.props;
    this.resetError();
    login(credentials)
      .then(auth => {
        onLogin(auth, remember);
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
        <Col span={6} offset={9} style={{ textAlign: 'center' }}>
          <Title>Log In</Title>
          <LoginForm onFinish={this.handleFinish} />
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
};

export default LoginPage;
