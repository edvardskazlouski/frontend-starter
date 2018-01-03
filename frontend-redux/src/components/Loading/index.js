import {connect} from 'react-redux';

import { loadingSelector } from 'selectors/loading';

import Loading from './Loading';

export default connect(loadingSelector)(Loading);
