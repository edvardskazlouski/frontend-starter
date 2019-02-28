import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import injectSheet from 'react-jss';
import { Map } from 'immutable';

import styles from './styles';
import Dialog from '@material-ui/core/Dialog';

// modals
import TestModal from 'components/modals/TestModal';

// modals
import ModalTypes from 'constants/modals';

const mapTypeToModal = {
  [ModalTypes.TEST_MODAL]: TestModal,
};

function ModalsPortal({ classes, modals, closeModal }) {
  const modal = modals.get(0, new Map());
  const ModalContent = mapTypeToModal[modal.get('type')];

  if (!ModalContent) {
    return null;
  }
  const node = modal.get('node') || document.querySelector('#modal');

  return ReactDom.createPortal(
    (
      <div className={classes.content}>
        <div className={classes.modalContent}>
          <ModalContent
            key={modal.get('type')}
            closeModal={closeModal}
          />
        </div>
      </div>
    ),
    node
  );
}

export default injectSheet(styles)(ModalsPortal);

ModalsPortal.propTypes = {
  classes: PropTypes.object,
  modals: ImmutablePropTypes.stack,
  closeModal: PropTypes.func,
};
