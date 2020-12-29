import { connect } from 'react-redux';
import { deleteAdvert, loadAdvert } from '../../../store/actions';

import { getAdvert, getUi } from '../../../store/selectors';

import AdvertPage from './AdvertPage';

const mapStateToProps = (state, ownProps) => ({
  ...getUi(state),
  advert: getAdvert(ownProps.match.params.id)(state),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    onLoad: () => dispatch(loadAdvert(id)),
    onDelete: () => dispatch(deleteAdvert(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertPage);
