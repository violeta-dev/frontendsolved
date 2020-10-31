import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout as DesignLayout, Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import { logout } from '../../api/auth';
import styles from './Header.module.css';
import ConfirmationButton from '../shared/ConfirmationButton';

const { Header: DesignHeader } = DesignLayout;
class Header extends React.Component {
  handleLogout = () => {
    const { onLogout } = this.props;
    logout().then(onLogout);
  };

  render() {
    return (
      <DesignHeader className={styles.header}>
        <Space size="large" className={styles.nav}>
          <Link to="/">Adverts</Link>
          <Link to="/adverts/new">New advert</Link>
        </Space>
        <ConfirmationButton
          className={styles.button}
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
        >
          Logout
        </ConfirmationButton>
      </DesignHeader>
    );
  }
}

Header.propTypes = {
  onLogout: T.func.isRequired,
};

export default Header;
