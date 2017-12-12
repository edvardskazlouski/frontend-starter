import { createAction } from 'redux-actions';

import ActionTypes from 'actionTypes/fileUploader';

export const uploadFile = createAction(ActionTypes.UPLOAD_FILE);
