import React from 'react';
import T from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Divider, Image, Typography, Statistic, Row, Col } from 'antd';

import { getAdvert, deleteAdvert } from '../../../api/adverts';
import Layout from '../../layout';
import { ConfirmationButton } from '../../shared';
import { DeleteOutlined } from '@ant-design/icons';
import placeholder from '../../../assets/photo-placeholder.png';
import Tags from '../Tags';
import { formatter } from '../../../utils/numbers';

const { Title } = Typography;

class AdvertPage extends React.Component {
  state = {
    advert: null,
    error: null,
  };

  getAdvertId = () => this.props.match.params.id;

  handleDeleteClick = () => {
    const { history } = this.props;
    deleteAdvert(this.getAdvertId()).then(() => history.push('/'));
  };

  getAdvert = async () => {
    try {
      const { result } = await getAdvert(this.getAdvertId());
      if (!result) {
        const error = { message: 'Not found' };
        throw error;
      }
      this.setState({ advert: result });
    } catch (error) {
      this.setState({ error });
    }
  };

  renderAdvert = () => {
    const { advert, error } = this.state;

    if (error) {
      return <Redirect to="/404" />;
    }

    if (!advert) {
      return null;
    }

    const { name, price, tags, sale, photoUrl } = advert;

    return (
      <Row>
        <Col span={24}>
          <Title level={2}>
            {name} - {sale ? 'Sell' : 'Buy'}
          </Title>
        </Col>
        <Col span={12}>
          <Statistic title="Price" value={price} formatter={formatter} />
          <div style={{ marginTop: 20 }}>
            <span style={{ marginRight: 5 }}>Tags</span>
            <Tags tags={tags} />
          </div>
        </Col>
        <Col span={12}>
          <Image
            src={photoUrl}
            alt={name}
            width={300}
            height={300}
            fallback={placeholder}
          />
        </Col>
        <ConfirmationButton
          danger
          icon={<DeleteOutlined />}
          confirmationProps={{
            title: 'Delete advert?',
            content: 'Are you sure you want to delete this advert?',
            okText: 'Yes',
            cancelText: 'No',
            okButtonProps: {
              danger: true,
            },
          }}
          onConfirm={this.handleDeleteClick}
          style={{ marginTop: 20 }}
          block
        >
          Delete
        </ConfirmationButton>
      </Row>
    );
  };

  componentDidMount() {
    this.getAdvert();
  }

  render() {
    return (
      <Layout title="Advert detail">
        <Divider>Detail of your advert</Divider>
        {this.renderAdvert()}
      </Layout>
    );
  }
}

AdvertPage.propTypes = {
  match: T.shape({ params: T.shape({ id: T.string.isRequired }).isRequired })
    .isRequired,
};

export default AdvertPage;
