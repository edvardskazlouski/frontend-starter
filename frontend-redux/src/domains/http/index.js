import * as AllActionsCreators from './actionsCreators';
import saga from './saga';

const ActionsCreators = {
  makeRequest: AllActionsCreators.makeRequest,
  makeCancelableRequest: AllActionsCreators.makeCancelableRequest,
};

export {
  ActionsCreators,
  saga,
};
