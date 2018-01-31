import MutationsTypes from './mutation-types';

export default {
  [MutationsTypes.OPEN_MODAL]: (state, modal) => {
    state.modals.push(modal);
  },
  [MutationsTypes.CLOSE_MODAL]:  state => {
    state.modals.pop();
  },
};
