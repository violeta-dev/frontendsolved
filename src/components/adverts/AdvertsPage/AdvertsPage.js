import React from 'react';
import { Divider } from 'antd';

import Layout from '../../layout';
import FiltersForm from './FiltersForm';
import AdvertsList from './AdvertsList';

const AdvertsPage = () => (
  <Layout title="Adverts list">
    <Divider>Filter your adverts</Divider>
    <FiltersForm />
    <Divider>Adverts</Divider>
    <AdvertsList />
  </Layout>
);

export default AdvertsPage;
