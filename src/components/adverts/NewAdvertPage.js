import React from 'react';
import T from 'prop-types';
import { Alert, Button, Checkbox, Input, InputNumber } from 'antd';

import { createAdvert } from '../../api/adverts';
import Layout from '../layout';
import { InputImage } from '../shared';
import TagsSelect from './TagsSelect';
import * as numbers from '../../utils/numbers';

class NewAdvertForm extends React.Component {
  state = {
    name: '',
    price: 0,
    tags: [],
    photo: null,
    sale: true,
  };

  canSubmit = () => {
    const { name, price, tags } = this.state;

    const validName = !!name;
    const validPrice =
      !Number.isNaN(price) && Number.isFinite(price) && price >= 0;
    const validTags = !!tags.length;

    return validName && validPrice && validTags;
  };

  getFormData = () => {
    const { name, price, tags, sale, photo } = this.state;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sale', sale);
    formData.append('price', price);
    tags.forEach((tag, index) => formData.append(`tags[${index}]`, tag));
    if (photo) formData.append('photo', photo);
    return formData;
  };

  handleNameChange = ev => this.setState({ name: ev.target.value });
  handlePriceChange = price => this.setState({ price });
  handleTagsChange = tags => this.setState({ tags });
  handlePhotoChange = photo => this.setState({ photo });
  handleSaleChange = ev => this.setState({ sale: ev.target.checked });

  handleSubmit = ev => {
    const { onSubmit } = this.props;
    ev.preventDefault();
    onSubmit(this.getFormData());
  };

  render() {
    const { name, price, tags, sale } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          placeholder="Name"
          onChange={this.handleNameChange}
          value={name}
        />
        <InputNumber
          {...numbers}
          onChange={this.handlePriceChange}
          value={price}
        />
        <TagsSelect onChange={this.handleTagsChange} value={tags} />
        <Checkbox onChange={this.handleSaleChange} checked={sale}>
          Sell / Buy
        </Checkbox>
        <InputImage type="file" onChange={this.handlePhotoChange} />
        <Button type="primary" htmlType="submit" disabled={!this.canSubmit()}>
          Up!
        </Button>
      </form>
    );
  }
}

NewAdvertForm.propTypes = {
  onSubmit: T.func.isRequired,
};

class NewAdvertPage extends React.Component {
  state = {
    error: null,
  };

  fileInputRef = React.createRef(null);

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
