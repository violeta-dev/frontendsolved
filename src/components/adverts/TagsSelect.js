import React from 'react';
import { Select } from 'antd';

import { getTags } from '../../api/adverts';

const { Option } = Select;

class TagsSelect extends React.Component {
  state = {
    tags: null,
  };

  ref = React.createRef(null);

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
        placeholder="Please select a tag"
        style={{ width: '100%' }}
        ref={this.ref}
        {...this.props}
      >
        {tags && tags.map(tag => <Option key={tag}>{tag}</Option>)}
      </Select>
    );
  }
}

export default TagsSelect;
