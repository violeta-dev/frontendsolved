import { Link } from 'react-router-dom';
import { Layout as DesignLayout, Button, Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import { logout } from '../../api/auth';
import styles from './Header.module.css';

const { Header: DesignHeader } = DesignLayout;

const Header = () => (
  <DesignHeader className={styles.header}>
    <Space size="large" className={styles.nav}>
      <Link to="/">Adverts</Link>
      <Link to="/adverts/new">New advert</Link>
    </Space>
    <Button
      className={styles.button}
      danger
      icon={<LogoutOutlined />}
      shape="round"
      type="dashed"
      // onClick={() => {
      //   logout().then(() => {
      //     setIsLogged(false);
      //     onLogout();
      //   });
      // }}
    >
      Logout
    </Button>
  </DesignHeader>
);

export default Header;
