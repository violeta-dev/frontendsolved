import React from 'react';
import T from 'prop-types';
import { Button, Input, Slider, Radio } from 'antd';

import TagsSelect from '../TagsSelect';

const saleOptions = {
  sell: { label: 'Sell', value: 'sell' },
  buy: { label: 'Buy', value: 'buy' },
  all: { label: 'All', value: 'all' },
};

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

  sliderRef = React.createRef(null);

  handleNameChange = ev => this.setState({ name: ev.target.value });
  handlePriceChange = price => {
    const { current: slider } = this.sliderRef;
    const [min, max] = price;
    if (min === slider.props.min && max === slider.props.max) {
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
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          placeholder="Name"
          onChange={this.handleNameChange}
          value={name}
        />
        <Slider
          range
          defaultValue={price}
          min={0}
          max={10000}
          onChange={this.handlePriceChange}
          ref={this.sliderRef}
        />
        <TagsSelect onChange={this.handleTagsChange} value={tags} />
        <Radio.Group
          options={Object.values(saleOptions)}
          onChange={this.handleSaleChange}
          value={sale}
        />
        <Button type="primary" htmlType="submit">
          Search
        </Button>
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
