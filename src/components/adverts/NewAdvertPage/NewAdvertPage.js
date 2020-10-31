import React from 'react';
import T from 'prop-types';
import { Alert } from 'antd';

import { createAdvert } from '../../../api/adverts';
import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';

class NewAdvertPage extends React.Component {
  state = {
    error: null,
  };

  handleSubmit = advert => {
    const { history } = this.props;
    createAdvert(advert).then(({ result: advert }) =>
      history.push(`/adverts/${advert._id}`),
    );
  };

  render() {
    const { error } = this.state;
    return (
      <Layout title="New advert">
        <NewAdvertForm onSubmit={this.handleSubmit} />
        {error && (
          <Alert
            afterClose={this.resetError}
            closable
            message={error}
            showIcon
            type="error"
          />
        )}
      </Layout>
    );
  }
}

NewAdvertPage.propTypes = {
  history: T.shape({ push: T.func.isRequired }).isRequired,
};

export default NewAdvertPage;
