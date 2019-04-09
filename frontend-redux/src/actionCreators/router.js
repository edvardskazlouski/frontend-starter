import { push } from 'connected-react-router/immutable';
import * as Routes from 'constants/routing';

export const toHome = () => push(Routes.HOME);

export const toTest = () => push(Routes.TEST);
