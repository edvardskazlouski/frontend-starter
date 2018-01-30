import MutationsTypes from './mutation-types';

// mutations - handlers for changes that dispatched from actions
// reducer - YOU MUSTN'T RESET STATE LINK
export default {
  [MutationsTypes.SAVE_USER]: (state, user) => {
    state.name = user.name;
    state.role = user.role;
  },
  [MutationsTypes.CLEAR_USER]:  state => {
      state = {};
  },
};
