import { connect } from 'react-redux';
import roleRouteSelector from './selector';

import RoleRoute from './RoleRoute';

export default connect(roleRouteSelector)(
  RoleRoute,
);
