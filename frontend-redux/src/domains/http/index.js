import * as AllActionsCreators from './actionsCreators';
import saga from './saga';
import reducer from './reducer';

const ActionsCreators = {
  makeRequest: AllActionsCreators.makeRequest,
};

export {
  ActionsCreators,
  saga,
  reducer,
};
