import T from 'prop-types';
import { Layout as DesignLayout, Row, Col, Typography } from 'antd';

import Header from './Header';
import styles from './Layout.module.css';

const { Content, Footer } = DesignLayout;
const { Title } = Typography;

const Layout = ({ children, title }) => (
  <DesignLayout className={styles.layout}>
    <Header />
    <Content className={styles.main}>
      <Row className={styles.row}>
        <Col className={styles.col} span={16} offset={4}>
          <Title level={2}>{title}</Title>
          <div>{children}</div>
        </Col>
      </Row>
    </Content>
    <Footer className={styles.footer}>© 2020 Keepcoding</Footer>
  </DesignLayout>
);

Layout.propTypes = {
  title: T.string.isRequired,
  children: T.node,
};

export default Layout;
