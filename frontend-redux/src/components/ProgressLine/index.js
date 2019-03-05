import { connect } from 'react-redux';

import ProgressLine from './ProgressLine';
import mapStateToProps from './selector';

export default connect(
  mapStateToProps,
)(ProgressLine);
