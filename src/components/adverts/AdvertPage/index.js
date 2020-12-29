import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { deleteAdvert, loadAdvert } from '../../../store/actions';
import { getAdvert } from '../../../store/selectors';
import withDataLoad from '../../../hocs/withDataLoad';

import AdvertPage from './AdvertPage';

const mapStateToProps = (state, ownProps) => ({
  advert: getAdvert(ownProps.match.params.id)(state),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    onLoad: () => dispatch(loadAdvert(id)),
    onDelete: () => dispatch(deleteAdvert(id)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withDataLoad({
    noRender: ({ advert }) => !advert,
    renderError: () => <Redirect to="/404" />,
  }),
)(AdvertPage);
