import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { advert } from '../../../propTypes';
import { deleteAdvert, loadAdvert } from '../../../store/actions';
import { getAdvert } from '../../../store/selectors';
import withDataLoad from '../../../hocs/withDataLoad';

import { Image, Typography, Statistic, Row, Col } from 'antd';
import { ConfirmationButton } from '../../shared';
import { DeleteOutlined } from '@ant-design/icons';
import placeholder from '../../../assets/photo-placeholder.png';
import Tags from '../Tags';
import { formatter } from '../../../utils/numbers';

const { Title } = Typography;

const AdvertDetail = ({ advert, onDelete }) => {
  const { name, sale, price, tags, photoUrl } = advert;
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
        onConfirm={onDelete}
        style={{ marginTop: 20 }}
        block
      >
        Delete
      </ConfirmationButton>
    </Row>
  );
};

AdvertDetail.propTypes = {
  advert: T.shape(advert).isRequired,
  onDelete: T.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  advert: getAdvert(ownProps.advertId)(state),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const { advertId } = ownProps;
  return {
    onLoad: () => dispatch(loadAdvert(advertId)),
    onDelete: () => dispatch(deleteAdvert(advertId)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withDataLoad({
    noRender: ({ advert }) => !advert,
    renderError: () => <Redirect to="/404" />,
  }),
)(AdvertDetail);
