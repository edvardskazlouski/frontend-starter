import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import injectSheet from 'react-jss';
import { Map } from 'immutable';

import styles from './styles';
import Dialog from 'material-ui/Dialog';

// modals
import TestModal from 'components/modals/TestModal';

// modals
import ModalTypes from 'constants/modals';

const mapTypeToModal = {
  [ModalTypes.TEST_MODAL]: TestModal,
};

function ModalsPortal({ classes, modals, closeModal }) {
  const modal = modals.get(0, new Map());
  const ModalContent =  mapTypeToModal[modal.get('type')];

  return ModalContent ? (
    <Dialog
      classes={classes}
      open={true}
      onRequestClose={closeModal}
    >
      <ModalContent
        data={modal.get('data', new Map())}
        key={modal.get('type')}
        closeModal={closeModal}
      />
    </Dialog>
  ) : null;
}

export default injectSheet(styles)(ModalsPortal);

ModalsPortal.propTypes = {
  classes: PropTypes.object,
  modals: ImmutablePropTypes.stack,
  closeModal: PropTypes.func,
};
