import React from 'react';
import T from 'prop-types';
import { LogoutOutlined } from '@ant-design/icons';

import ConfirmationButton from '../../shared/ConfirmationButton';

const LogoutButton = ({ onLogout, ...props }) => (
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
    onConfirm={onLogout}
    {...props}
  />
);

LogoutButton.propTypes = {
  onLogout: T.func.isRequired,
};

export default LogoutButton;
