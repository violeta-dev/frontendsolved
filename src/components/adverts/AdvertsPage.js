import React from 'react';
import { Link } from 'react-router-dom';
import { Empty, Button, Spin, List, Card, Tag, Space } from 'antd';

import { getAdverts } from '../../api/adverts';
import { formatter } from '../../utils/numbers';
import Layout from '../layout';

class AdvertsPage extends React.Component {
  state = {
    adverts: null,
    loading: false,
    error: null,
  };

  getAdverts = () => {
    this.setState({ loading: true, error: null });
    getAdverts()
      .then(({ result }) =>
        this.setState({ loading: false, adverts: result.rows }),
      )
      .catch(error => this.setState({ loading: false, error }));
  };

  renderLoading = () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin size="large" />
    </div>
  );

  renderError = () => {
    const { error } = this.state;
    return (
      <Empty
        description={
          <span style={{ color: '#ff4d4f' }}>{`Error: ${error}`}</span>
        }
      >
        <Button type="primary" danger onClick={this.getAdverts}>
          Reload
        </Button>
      </Empty>
    );
  };

  renderEmpty = () => (
    <Empty description={<span>No adverts here!</span>}>
      <Link to="/adverts/new">
        <Button type="primary">Create now</Button>
      </Link>
    </Empty>
  );

  renderContent = () => {
    const { adverts, loading, error } = this.state;

    if (loading) {
      return this.renderLoading();
    }

    if (error) {
      return this.renderError();
    }

    if (!adverts) {
      return null;
    }

    if (!adverts.length) {
      return this.renderEmpty();
    }

    return (
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={adverts}
        renderItem={advert => (
          <List.Item>
            <Link to={`/adverts/${advert._id}`}>
              <Card title={advert.name} hoverable>
                <Space
                  direction="vertical"
                  size="large"
                  split={<hr style={{ color: '#f0f0f0' }} />}
                  style={{ width: '100%' }}
                >
                  <div>
                    <span style={{ marginRight: 8 }}>Price:</span>
                    {formatter(advert.price)}
                  </div>
                  <div>
                    <span style={{ marginRight: 8 }}>Buy / Sell:</span>
                    {advert.sale ? 'Sell' : 'Buy'}
                  </div>
                  <div>
                    <span style={{ marginRight: 8 }}>Tags:</span>
                    {advert.tags.map(tag => (
                      <Tag>{tag}</Tag>
                    ))}
                  </div>
                </Space>
              </Card>
            </Link>
          </List.Item>
        )}
      />
    );
  };

  componentDidMount() {
    this.getAdverts();
  }

  render() {
    return <Layout title="Adverts list">{this.renderContent()}</Layout>;
  }
}

AdvertsPage.propTypes = {};

export default AdvertsPage;
