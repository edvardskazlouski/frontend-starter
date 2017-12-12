import { createSelector } from 'reselect';
import { List } from 'immutable';

export const fileUploader = state => state.get('fileUploader');

export const loading = createSelector(
  fileUploader,
  fileUploader => fileUploader.get('loading', false),
);

export const files = createSelector(
  fileUploader,
  fileUploader => fileUploader.get('fileUploader', new List()),
);
