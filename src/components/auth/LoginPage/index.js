import { connect } from 'react-redux';

import LoginPage from './LoginPage';
import { login, resetError } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

const mapStateToProps = state => getUi(state);

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLogin: credentials => dispatch(login(credentials, ownProps.location)),
  onErrorClose: () => dispatch(resetError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
