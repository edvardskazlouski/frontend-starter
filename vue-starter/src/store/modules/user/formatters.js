import UserConstants from './constants';

export default {
  formatUser: user => ({
    name: user.name,
    role: user.role || UserConstants.ROLES.NONAUTHENTICATED,
  })
};
