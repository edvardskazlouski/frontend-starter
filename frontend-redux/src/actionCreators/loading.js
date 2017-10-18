import ActionTypes from 'actionTypes/loading';

export const startLoading = () => ({
  type: ActionTypes.LOADING_START,
});

export const stopLoading = () => ({
  type: ActionTypes.LOADING_FINISH,
});
