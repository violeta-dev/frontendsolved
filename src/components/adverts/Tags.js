import React from 'react';
import T from 'prop-types';

import { Tag } from 'antd';

const tagsColors = {
  motor: 'green',
  mobile: 'orange',
  lifestyle: 'pink',
  work: 'blue',
};

const Tags = ({ tags }) =>
  tags.map(tag => (
    <Tag key={tag} color={tagsColors[tag]}>
      {tag}
    </Tag>
  ));

Tags.propTypes = {
  tags: T.arrayOf(T.string.isRequired).isRequired,
};

export default Tags;
