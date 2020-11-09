import React from 'react';
import T from 'prop-types';
import { Button, Radio, Input, InputNumber, Row, Col } from 'antd';

import TagsSelect from '../TagsSelect';
import { FormField, InputImage } from '../../shared';
import * as numbers from '../../../utils/numbers';

import { saleOptions, MIN_PRICE, MAX_PRICE } from '../definitions';

import styles from './NewAdvertForm.module.css';

class NewAdvertForm extends React.Component {
  state = {
    name: '',
    price: 0,
    tags: [],
    photo: null,
    sale: saleOptions.sell.value,
  };

  canSubmit = () => {
    const { name, price, tags } = this.state;

    return [
      // valid name
      !!name,
      // valid price
      !Number.isNaN(price) && Number.isFinite(price) && price >= 0,
      // valid tags
      !!tags.length,
    ].every(validation => validation); // all validations pass
  };

  getFormData = () => {
    const { name, price, tags, sale, photo } = this.state;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sale', sale === saleOptions.sell.value);
    formData.append('price', price);
    tags.forEach((tag, index) => formData.append(`tags[${index}]`, tag));
    if (photo) formData.append('photo', photo);
    return formData;
  };

  handleNameChange = ev => this.setState({ name: ev.target.value });
  handlePriceChange = price => this.setState({ price });
  handleTagsChange = tags => this.setState({ tags });
  handlePhotoChange = photo => this.setState({ photo });
  handleSaleChange = ev => this.setState({ sale: ev.target.value });

  handleSubmit = ev => {
    const { onSubmit } = this.props;
    ev.preventDefault();
    onSubmit(this.getFormData());
  };

  render() {
    const { name, price, tags, sale } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Row className={styles.form}>
          <Col span={11}>
            <FormField label="Name">
              <Input
                placeholder="Name"
                onChange={this.handleNameChange}
                value={name}
              />
            </FormField>
            <FormField label="Price">
              <InputNumber
                {...numbers}
                className={styles.price}
                min={MIN_PRICE}
                max={MAX_PRICE}
                onChange={this.handlePriceChange}
                value={price}
              />
            </FormField>
          </Col>
          <Col span={11} offset={2}>
            <FormField label="Tags">
              <TagsSelect onChange={this.handleTagsChange} value={tags} />
            </FormField>
            <FormField label="Type">
              <Radio.Group
                options={[saleOptions.sell, saleOptions.buy]}
                onChange={this.handleSaleChange}
                value={sale}
              />
            </FormField>
          </Col>
          <Col span={24}>
            <FormField label="Photo">
              <InputImage type="file" onChange={this.handlePhotoChange} />
            </FormField>
            <Button
              className={styles.button}
              type="primary"
              htmlType="submit"
              disabled={!this.canSubmit()}
              block
            >
              Up!
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

NewAdvertForm.propTypes = {
  onSubmit: T.func.isRequired,
};

export default NewAdvertForm;
