import React, { useEffect } from 'react';
import T from 'prop-types';
import { Select } from 'antd';

import { tags } from '../../../propTypes';

const tagOption = tag => ({ label: tag, value: tag });

const TagsSelect = ({ onLoad, tags, ...props }) => {
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <Select
      allowClear
      disabled={!tags}
      mode="multiple"
      placeholder="Select tags"
      style={{ width: '100%' }}
      options={tags.map(tagOption)}
      {...props}
    />
  );
};

TagsSelect.propTypes = {
  onLoad: T.func.isRequired,
  tags: tags.isRequired,
};

export default TagsSelect;
