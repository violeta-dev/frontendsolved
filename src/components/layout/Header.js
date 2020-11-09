import React from 'react';
import { Link } from 'react-router-dom';
import { Layout as DesignLayout, Space } from 'antd';

import styles from './Header.module.css';
import { LogoutButton } from '../auth';

const { Header: DesignHeader } = DesignLayout;

const Header = () => (
  <DesignHeader className={styles.header}>
    <Space size="large" className={styles.nav}>
      <Link to="/">Adverts</Link>
      <Link to="/adverts/new">New advert</Link>
    </Space>
    <LogoutButton className={styles.button}>Logout</LogoutButton>
  </DesignHeader>
);

export default Header;
