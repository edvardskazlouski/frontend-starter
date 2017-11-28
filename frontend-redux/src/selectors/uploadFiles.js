import { createSelector } from 'reselect';

export const uploadFiles = state => state.get('uploadFiles');

export const loading = createSelector(
  uploadFiles,
  uploadFiles => uploadFiles.get('loading', false),
);
