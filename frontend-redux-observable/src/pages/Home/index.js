import { connect } from 'react-redux';

import {
  openTestModal
} from 'actionCreators/modals';

// view
import Home from './Home';

// selector
import homeSelector from './selector';

const mapDispatchToProps = {
  openTestModal,
};

export default connect(
  homeSelector,
  mapDispatchToProps,
)(Home);
