import React from 'react';

import { Tag } from 'antd';
import { tags } from '../../propTypes';

const tagsColors = {
  motor: 'green',
  mobile: 'orange',
  lifestyle: 'pink',
  work: 'blue',
};

const renderTag = tag => (
  <Tag key={tag} color={tagsColors[tag]}>
    {tag}
  </Tag>
);

const Tags = ({ tags }) => tags.map(renderTag);

Tags.propTypes = {
  tags: tags.isRequired,
};

export default Tags;
