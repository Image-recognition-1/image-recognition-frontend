import { apiConfig } from '../../boot/apiConfig';
import {
  AuthApi, LoginAuthTokenPostRequest, UsersApi, CreateUserRequest,
} from '../../../schemas/generated-api';

export default {
  login(requestParams: LoginAuthTokenPostRequest) {
    const authApi = new AuthApi(apiConfig);
    return authApi.loginAuthTokenPost(requestParams);
  },
  register(createUserRequest: CreateUserRequest) {
    const usersApi = new UsersApi(apiConfig);
    return usersApi.createUserUsersCreatePost({ createUserRequest });
  },

  logout() {
    const authApi = new AuthApi(apiConfig);
    return authApi.logoutAuthLogoutGet();
  },
  getMe() {
    const authApi = new AuthApi(apiConfig);
    return authApi.readUsersMeAuthGetMeGet();
  },
};
