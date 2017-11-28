import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withStyles } from 'material-ui/styles';

import styles from './styles';

// modals
import BaseModal  from 'components/modals/BaseModal';
import TestModal from 'components/modals/TestModal';

// modals
import ModalTypes from 'constants/modals';

const mapTypeToModal = {
  [ModalTypes.TEST_MODAL]: TestModal,
};

class ModalsPortal extends Component {
  render() {
    const { classes, modals, closeModal } = this.props;

    return (
      <div className={classes.modalsPortal}>
        {
          modals.map((type, index) => {
            const ModalContent = mapTypeToModal[type];

            return (
              <BaseModal key={index} contentLabel={type} closeAction={closeModal}>
                <ModalContent/>
              </BaseModal>
            );
          })
        }
      </div>
    );
  }

}

ModalsPortal.propTypes = {
  classes: PropTypes.object,
  modals: ImmutablePropTypes.stack,
  closeModal: PropTypes.func,
};

export default withStyles(styles)(ModalsPortal);
