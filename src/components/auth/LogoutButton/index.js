import { connect } from 'react-redux';

import LogoutButton from './LogoutButton';
import { logout } from '../../../store/actions';

const mapDispatchToProps = {
  onLogout: logout,
};

export default connect(null, mapDispatchToProps)(LogoutButton);
