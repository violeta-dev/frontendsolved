import { connect } from 'react-redux';

import { loadAdverts } from '../../../store/actions';
import { getAdverts, getUi } from '../../../store/selectors';

import AdvertsPage from './AdvertsPage';

const mapStateToProps = state => ({
  adverts: getAdverts(state),
  ...getUi(state),
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchAdverts: filters => dispatch(loadAdverts(filters)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertsPage);
