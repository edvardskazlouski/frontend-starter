import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

// actions creators
import {
  closeModal,
} from 'actionCreators/modals';

import ModalsPortal from './ModalsPortal';
import mapStateToProps from './selector';

// modals
import ModalTypes from 'constants/modals';

// modals
import TestModal from 'containers/modals/TestModal';

const modalsMap = {
  [ModalTypes.TEST_MODAL]: TestModal,
};

const mapDispatchToProps = {
  closeModal,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withModalMaps = withProps(props => ({
  ...props,
  modalsMap,
}));

export default compose(
  withConnect,
  withModalMaps
)(ModalsPortal);
