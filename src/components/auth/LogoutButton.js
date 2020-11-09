import React from 'react';
import T from 'prop-types';
import { LogoutOutlined } from '@ant-design/icons';

import { logout } from '../../api/auth';
import ConfirmationButton from '../shared/ConfirmationButton';
import { AuthContextConsumer } from '../../contexts/auth';

class LogoutButton extends React.Component {
  handleLogout = () => {
    const { onLogout } = this.props;
    logout().then(onLogout);
  };

  render() {
    const { onLogout, ...props } = this.props;
    return (
      <ConfirmationButton
        danger
        icon={<LogoutOutlined />}
        shape="round"
        type="dashed"
        confirmationProps={{
          title: 'Close session?',
          content: 'Are you sure you want to disconnect?',
          okText: 'Yes',
          cancelText: 'No',
          okButtonProps: {
            danger: true,
          },
        }}
        onConfirm={this.handleLogout}
        {...props}
      />
    );
  }
}

LogoutButton.propTypes = {
  onLogout: T.func.isRequired,
};

const ConnectedToAuthLogoutButton = props => (
  <AuthContextConsumer>
    {({ onLogout }) => <LogoutButton onLogout={onLogout} {...props} />}
  </AuthContextConsumer>
);

export default ConnectedToAuthLogoutButton;
