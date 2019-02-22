export const route = state => {
  return state.getIn(['router', 'location', 'pathname']) || '';
};
