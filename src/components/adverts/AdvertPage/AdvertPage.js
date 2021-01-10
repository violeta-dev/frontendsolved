import React from 'react';
import { Divider } from 'antd';

import Layout from '../../layout';
import { match } from '../../../propTypes';
import AdvertDetail from './AdvertDetail';

const AdvertPage = ({ match }) => {
  return (
    <Layout title="Advert detail">
      <Divider>Detail of your advert</Divider>
      <AdvertDetail advertId={match.params.id} />
    </Layout>
  );
};

AdvertPage.propTypes = {
  match: match.isRequired,
};

export default AdvertPage;
