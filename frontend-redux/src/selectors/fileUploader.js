import { crateSelector, createSelector } from 'reselect';
import { List, Map } from 'immutable';

export const uploader = (state, { meta, input }) =>
  state.getIn(['fileUploaders', meta.form, input.name], new Map());

export const isLoading = createSelector(
  uploader,
  uploader => uploader.get('isLoading', false)
);

export const files = createSelector(
  uploader,
  uploader => uploader.get('files', new List())
);

export const error = createSelector(
  uploader,
  uploader => uploader.get('error', new Map())
);
