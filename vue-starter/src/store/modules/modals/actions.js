import MutationsTypes from './mutation-types';
import Constants from './constants';

export default {
  openTestModal ({ commit }, data) {
    commit(MutationsTypes.OPEN_MODAL, {
      type: Constants.MODAL_TYPES.TEST_MODAL,
      data,
    });
  },

  closeModal ({ commit }) {
    commit(MutationsTypes.CLOSE_MODAL);
  }
};
