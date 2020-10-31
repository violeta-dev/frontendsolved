import T from 'prop-types';
import { Card, Statistic, Tag, Row, Col, Divider, Typography } from 'antd';

import { formatter } from '../../../utils/numbers';

const tagsColors = {
  motor: 'green',
  mobile: 'orange',
  lifestyle: 'pink',
  work: 'blue',
};

const AdvertCard = ({ name, price, sale, tags }) => {
  const headStyle = {
    backgroundColor: sale ? '#f6ffed' : '#fff7e6',
    color: sale ? '#52c41a' : '#fa8c16',
  };
  return (
    <Card title={sale ? 'Sell' : 'Buy'} headStyle={headStyle} hoverable>
      <Row>
        <Col span={12}>
          <Typography.Title level={4}>{name}</Typography.Title>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Statistic title="Price" value={price} formatter={formatter} />
        </Col>
      </Row>
      <Divider plain></Divider>
      {tags.map(tag => (
        <Tag key={tag} color={tagsColors[tag]}>
          {tag}
        </Tag>
      ))}
    </Card>
  );
};

AdvertCard.propTypes = {
  name: T.string.isRequired,
  price: T.number.isRequired,
  sale: T.bool.isRequired,
  tags: T.arrayOf(T.string.isRequired).isRequired,
};

export default AdvertCard;
