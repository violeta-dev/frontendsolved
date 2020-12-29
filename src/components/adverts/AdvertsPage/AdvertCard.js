import { Card, Statistic, Row, Col, Divider, Typography } from 'antd';

import { formatter } from '../../../utils/numbers';
import { advert } from '../../../propTypes';
import Tags from '../Tags';

const getHeadStyle = sale =>
  sale
    ? {
        backgroundColor: '#f6ffed',
        color: '#52c41a',
      }
    : {
        backgroundColor: '#fff7e6',
        color: '#fa8c16',
      };

const AdvertCard = ({ name, price, sale, tags }) => (
  <Card title={sale ? 'Sell' : 'Buy'} headStyle={getHeadStyle(sale)} hoverable>
    <Row>
      <Col span={12}>
        <Typography.Title level={4}>{name}</Typography.Title>
      </Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        <Statistic title="Price" value={price} formatter={formatter} />
      </Col>
    </Row>
    <Divider plain></Divider>
    <Tags tags={tags}></Tags>
  </Card>
);

AdvertCard.propTypes = advert;

export default AdvertCard;
