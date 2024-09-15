import { apiConfig } from '../../boot/apiConfig';
import { LoginLoginPostRequest, DefaultApi, RegisterRequest } from '../../../schemas/generated-api';

export default {
  login(requestParams: LoginLoginPostRequest) {
    const authApi = new DefaultApi(apiConfig);
    return authApi.loginLoginPost(requestParams);
  },
  register(registerRequest: RegisterRequest) {
    const usersApi = new DefaultApi(apiConfig);
    return usersApi.registerUserRegisterPost({ registerRequest });
  },

  getMe() {
    const authApi = new DefaultApi(apiConfig);
    return authApi.getMeGetmeGet();
  },
  logout() {
    const authApi = new DefaultApi(apiConfig);
    return authApi.logoutLogoutGet();
  },
};
