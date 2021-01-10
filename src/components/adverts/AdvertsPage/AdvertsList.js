import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Empty, Button, List } from 'antd';

import { advert } from '../../../propTypes';
import { loadAdverts } from '../../../store/actions';
import { getAdverts, getAreAdvertsFiltered } from '../../../store/selectors';
import withDataLoad from '../../../hocs/withDataLoad';

import AdvertCard from './AdvertCard';

const AdvertsList = ({ adverts, areAdvertsFiltered }) => {
  const renderEmpty = () => {
    return (
      <Empty description={<span>No adverts here!</span>}>
        {areAdvertsFiltered ? (
          <span>Refine your search</span>
        ) : (
          <Link to="/adverts/new">
            <Button type="primary">Create the first one</Button>
          </Link>
        )}
      </Empty>
    );
  };

  const renderAdvert = advert => {
    return (
      <List.Item>
        <Link to={`/adverts/${advert.id}`}>
          <AdvertCard {...advert} />
        </Link>
      </List.Item>
    );
  };

  if (!adverts.length) {
    return renderEmpty();
  }

  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={adverts}
      renderItem={renderAdvert}
    />
  );
};

AdvertsList.propTypes = {
  adverts: T.arrayOf(T.shape(advert).isRequired).isRequired,
  areAdvertsFiltered: T.bool,
};

const mapStateToProps = state => ({
  adverts: getAdverts(state),
  areAdvertsFiltered: getAreAdvertsFiltered(state),
});

const mapDispatchToProps = {
  onLoad: loadAdverts,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withDataLoad({
    noRender: ({ adverts }) => !adverts,
    renderError: (error, { reload }) => (
      <Empty
        description={<span style={{ color: '#ff4d4f' }}>{`${error}`}</span>}
      >
        <Button type="primary" danger onClick={reload}>
          Reload
        </Button>
      </Empty>
    ),
  }),
)(AdvertsList);
