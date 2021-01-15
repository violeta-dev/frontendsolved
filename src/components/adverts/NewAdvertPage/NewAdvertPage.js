import React from 'react';
import T from 'prop-types';
import { Alert, Divider } from 'antd';

import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';
import { ui } from '../../../propTypes';

const NewAdvertPage = ({ error, onErrorClose, onCreate }) => (
  <Layout title="New advert">
    <Divider>Create an advert</Divider>
    <NewAdvertForm onSubmit={onCreate} />
    {error && (
      <Alert
        afterClose={onErrorClose}
        closable
        message={error}
        showIcon
        type="error"
      />
    )}
  </Layout>
);

NewAdvertPage.propTypes = {
  ...ui,
  onCreate: T.func.isRequired,
  onErrorClose: T.func.isRequired,
};

export default NewAdvertPage;
