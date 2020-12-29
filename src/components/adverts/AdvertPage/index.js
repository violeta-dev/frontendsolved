import { connect } from 'react-redux';
import { loadAdvert } from '../../../store/actions';

import { getAdvert, getUi } from '../../../store/selectors';

import AdvertPage from './AdvertPage';

const mapStateToProps = (state, ownProps) => ({
  ...getUi(state),
  advert: getAdvert(ownProps.match.params.id)(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoad: () => dispatch(loadAdvert(ownProps.match.params.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvertPage);
