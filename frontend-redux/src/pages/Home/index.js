import { connect } from 'react-redux';

// view
import Home from './Home';

// selector
import homeSelector from './selector';

export default connect(
  homeSelector,
  dispatch => ({
    // TODO: complete actions list
  }),
)(Home);
