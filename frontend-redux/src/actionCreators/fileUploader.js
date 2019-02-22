import { createAction } from 'redux-actions';

import ActionTypes from 'actionTypes/fileUploader';

export const registerUploader = createAction(ActionTypes.REGISTER_UPLOADER);
export const deregisterUploader = createAction(ActionTypes.DEREGISTER_UPLOADER);
export const uploadFiles = createAction(ActionTypes.UPLOAD_FILES);
