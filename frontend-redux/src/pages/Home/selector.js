import { createStructuredSelector } from 'reselect';
import { route } from '../../selectors/routing';

export default createStructuredSelector({
  route,
});
