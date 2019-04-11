import * as AllActionsCreators from './actionsCreators';
import saga from './saga';

const ActionsCreators = {
  sendData: AllActionsCreators.sendData,
};

export {
  ActionsCreators,
  saga,
};
