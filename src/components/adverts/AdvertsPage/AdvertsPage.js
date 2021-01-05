import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import { Empty, Button, Spin, List, Divider } from 'antd';

import storage from '../../../utils/storage';
import Layout from '../../layout';
import FiltersForm, { defaultFilters } from './FiltersForm';
import AdvertCard from './AdvertCard';
import { advert, ui } from '../../../propTypes';

class AdvertsPage extends React.Component {
  state = {
    filters: storage.get('filters') || defaultFilters,
  };

  formatFilters = () => {
    const {
      filters: { name, sale, price, tags },
    } = this.state;

    const filters = {};
    if (name) {
      filters.name = name;
    }
    if (['sell', 'buy'].includes(sale)) {
      filters.sale = sale === 'sell';
    }
    if (price.length) {
      filters.price = price.join('-');
    }
    if (tags.length) {
      filters.tags = tags.join(',');
    }

    return filters;
  };

  getAdverts = () => {
    const { onFetchAdverts } = this.props;
    onFetchAdverts(this.formatFilters());
  };
  handleSubmit = filters => {
    storage.set('filters', filters);
    this.setState({ filters }, this.getAdverts);
  };

  renderLoading = () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin size="large" />
    </div>
  );

  renderError = () => {
    const { error } = this.props;
    return (
      <Empty
        description={<span style={{ color: '#ff4d4f' }}>{`${error}`}</span>}
      >
        <Button type="primary" danger onClick={this.getAdverts}>
          Reload
        </Button>
      </Empty>
    );
  };

  renderEmpty = () => {
    const { filters } = this.state;
    const isFiltered =
      JSON.stringify(filters) !== JSON.stringify(defaultFilters);
    return (
      <Empty description={<span>No adverts here!</span>}>
        {isFiltered ? (
          <span>Refine your search</span>
        ) : (
          <Link to="/adverts/new">
            <Button type="primary">Create the first one</Button>
          </Link>
        )}
      </Empty>
    );
  };

  renderAdvert = advert => {
    return (
      <List.Item>
        <Link to={`/adverts/${advert.id}`}>
          <AdvertCard {...advert} />
        </Link>
      </List.Item>
    );
  };

  renderAdverts = () => {
    const { adverts, loading, error } = this.props;
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
        grid={{ gutter: 16, column: 3 }}
        dataSource={adverts}
        renderItem={this.renderAdvert}
      />
    );
  };

  componentDidMount() {
    this.getAdverts();
  }

  render() {
    const { filters } = this.state;
    return (
      <Layout title="Adverts list">
        <Divider>Filter your adverts</Divider>
        <FiltersForm initialFilters={filters} onSubmit={this.handleSubmit} />
        <Divider>Adverts</Divider>
        {this.renderAdverts()}
      </Layout>
    );
  }
}

AdvertsPage.propTypes = {
  ...ui,
  adverts: T.arrayOf(T.shape(advert).isRequired),
  onFetchAdverts: T.func.isRequired,
};

export default AdvertsPage;
