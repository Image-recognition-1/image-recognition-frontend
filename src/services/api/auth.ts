import { apiConfig } from '../../boot/apiConfig';
import {
  LoginLoginPostRequest, DefaultApi, RegisterRequest, GoogleLoginRequest,
} from '../../../schemas/generated-api';

export type { GoogleLoginRequest, RegisterRequest, LoginLoginPostRequest };

export default {
  login(requestParams: LoginLoginPostRequest) {
    const authApi = new DefaultApi(apiConfig);
    return authApi.loginLoginPost(requestParams);
  },
  register(registerRequest: RegisterRequest) {
    const authApi = new DefaultApi(apiConfig);
    return authApi.registerUserRegisterPost({ registerRequest });
  },
  googleLogin(googleLoginRequest: GoogleLoginRequest) {
    const authApi = new DefaultApi(apiConfig);
    return authApi.googleLoginGoogleLoginPost({ googleLoginRequest });
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
