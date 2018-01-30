import request from 'services/http';
import RequestConstants from 'constants/http';
import UserFormatters from './formatters';

export default {
  getUser: async () => {
    const user = await request(
      RequestConstants.METHODS.GET,
      RequestConstants.ENDPOINTS.USER,
    );

    return UserFormatters.formatUser(user);
  }
};
