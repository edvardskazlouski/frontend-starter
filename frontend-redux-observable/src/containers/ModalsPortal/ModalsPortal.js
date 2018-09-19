import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import injectSheet from 'react-jss';
import { Map } from 'immutable';

import styles from './styles';
import Dialog from '@material-ui/core/Dialog';

const ModalsPortal = ({ classes, modals, modalsMap, closeModal }) => {
  const modal = modals.get(0, new Map());
  const ModalContent =  modalsMap[modal.get('type')];

  return ModalContent ? (
    <Dialog
      classes={classes}
      open={true}
      onClose={closeModal}
    >
      <ModalContent
        data={modal.get('data', new Map())}
        key={modal.get('type')}
        closeModal={closeModal}
      />
    </Dialog>
  ) : null;
};

ModalsPortal.propTypes = {
  classes: PropTypes.object,
  modals: ImmutablePropTypes.stack,
  modalsMap: PropTypes.object,
  closeModal: PropTypes.func,
};

export default injectSheet(styles)(ModalsPortal);
