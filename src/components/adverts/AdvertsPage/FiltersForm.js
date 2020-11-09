import React from 'react';
import T from 'prop-types';
import { Button, Input, Slider, Radio, Row, Col } from 'antd';

import TagsSelect from '../TagsSelect';
import FormField from '../../shared/FormField';
import { saleOptions, MIN_PRICE, MAX_PRICE } from '../definitions';
import styles from './FiltersForm.module.css';

export const defaultFilters = {
  name: '',
  sale: saleOptions.all.value,
  price: [],
  tags: [],
};

class FiltersForm extends React.Component {
  state = {
    ...this.props.initialFilters,
  };

  handleNameChange = ev => this.setState({ name: ev.target.value });
  handlePriceChange = price => {
    const [min, max] = price;
    if (min === MIN_PRICE && max === MAX_PRICE) {
      return this.setState({ price: [] });
    }
    this.setState({ price });
  };
  handleSaleChange = ev => this.setState({ sale: ev.target.value });
  handleTagsChange = tags => this.setState({ tags });

  handleSubmit = ev => {
    const { onSubmit } = this.props;
    ev.preventDefault();
    onSubmit(this.state);
  };

  render() {
    const { name, price, tags, sale } = this.state;
    const priceValue = price.length === 0 ? [MIN_PRICE, MAX_PRICE] : price;

    return (
      <form onSubmit={this.handleSubmit}>
        <Row className={styles.form}>
          <Col span={11}>
            <FormField label="By name">
              <Input
                placeholder="Name"
                onChange={this.handleNameChange}
                value={name}
              />
            </FormField>
            <FormField
              label={
                <>
                  By price
                  <strong style={{ margin: '0 5px' }}>
                    {priceValue.join(' - ')}
                  </strong>
                </>
              }
            >
              <Slider
                range
                defaultValue={priceValue}
                min={MIN_PRICE}
                max={MAX_PRICE}
                onChange={this.handlePriceChange}
              />
            </FormField>
          </Col>
          <Col span={11} offset={2}>
            <FormField label="By tags">
              <TagsSelect onChange={this.handleTagsChange} value={tags} />
            </FormField>
            <FormField label="By type">
              <Radio.Group
                options={Object.values(saleOptions)}
                onChange={this.handleSaleChange}
                value={sale}
              />
            </FormField>
          </Col>
          <Col span={24}>
            <Button
              className={styles.button}
              type="primary"
              htmlType="submit"
              block
            >
              Search
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

FiltersForm.propTypes = {
  initialFilters: T.shape({
    name: T.string,
    sale: T.oneOf(Object.keys(saleOptions)),
    price: T.arrayOf(T.number),
    tags: T.arrayOf(T.string),
  }),
  onSubmit: T.func.isRequired,
};

FiltersForm.defaultProps = {
  initialFilters: defaultFilters,
};

export default FiltersForm;
