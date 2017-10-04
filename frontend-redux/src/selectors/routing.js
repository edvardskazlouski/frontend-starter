export const route = state => {
  return state.getIn(['routing', 'location', 'pathname']);
};
