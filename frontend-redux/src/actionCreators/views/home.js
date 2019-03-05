import { createAction } from 'redux-actions';

export const getUsers = () => {
  return {
    ACTIONS: {
      start: createAction('REQUEST'),
      success: createAction('SUCCESS'),
      cancel: createAction('CANCEL'),
      error: createAction('ERROR'),
    },
    url: '/test',
    config: {
      method: 'POST',
      body: {},
    },
  };
};
