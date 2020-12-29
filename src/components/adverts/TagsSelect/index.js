import { connect } from 'react-redux';

import TagsSelect from './TagsSelect';
import { loadTags } from '../../../store/actions';
import { getTags, getUi } from '../../../store/selectors';

const mapStateToProps = state => ({ ...getUi(state), tags: getTags(state) });

const mapDispatchToProps = {
  onLoad: loadTags,
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsSelect);
