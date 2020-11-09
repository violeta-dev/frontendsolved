import React from 'react';
import { Select } from 'antd';

import { getTags } from '../../api/adverts';

const { Option } = Select;

class TagsSelect extends React.Component {
  state = {
    tags: null,
  };

  componentDidMount() {
    getTags().then(({ result: tags }) => this.setState({ tags }));
  }

  render() {
    const { tags } = this.state;
    return (
      <Select
        allowClear
        disabled={!tags}
        mode="multiple"
        placeholder="Select tags"
        style={{ width: '100%' }}
        {...this.props}
      >
        {tags && tags.map(tag => <Option key={tag}>{tag}</Option>)}
      </Select>
    );
  }
}

export default TagsSelect;
