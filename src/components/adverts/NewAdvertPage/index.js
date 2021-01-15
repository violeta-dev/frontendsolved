import { connect } from 'react-redux';

import NewAdvertPage from './NewAdvertPage';
import { createAdvert, resetError } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

const mapStateToProps = state => getUi(state);

const mapDispatchToProps = { onCreate: createAdvert, onErrorClose: resetError };

export default connect(mapStateToProps, mapDispatchToProps)(NewAdvertPage);
