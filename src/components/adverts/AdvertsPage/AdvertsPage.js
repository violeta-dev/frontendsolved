import React from 'react';
import { Divider } from 'antd';

import storage from '../../../utils/storage';
import Layout from '../../layout';
import FiltersForm, { defaultFilters } from './FiltersForm';
import AdvertsList from './AdvertsList';

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

  handleSubmit = filters => {
    storage.set('filters', filters);
    this.setState({ filters }, this.getAdverts);
  };

  render() {
    const { filters } = this.state;
    return (
      <Layout title="Adverts list">
        <Divider>Filter your adverts</Divider>
        <FiltersForm initialFilters={filters} onSubmit={this.handleSubmit} />
        <Divider>Adverts</Divider>
        <AdvertsList />
      </Layout>
    );
  }
}

export default AdvertsPage;
