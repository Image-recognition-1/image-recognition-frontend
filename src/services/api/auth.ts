import { apiConfig } from '../../boot/apiConfig';
import {
  // API
  AuthApi,
  // models
  LoginAuthLoginPostRequest,
  RegisterRequest,
  GoogleLoginRequest,
} from '../../../schemas/generated-api';

export type { GoogleLoginRequest, RegisterRequest, LoginAuthLoginPostRequest };

export default {
  login(requestParams: LoginAuthLoginPostRequest) {
    const authApi = new AuthApi(apiConfig);
    return authApi.loginAuthLoginPost(requestParams);
  },
  register(registerRequest: RegisterRequest) {
    const authApi = new AuthApi(apiConfig);
    return authApi.registerUserAuthRegisterPost({ registerRequest });
  },
  googleLogin(googleLoginRequest: GoogleLoginRequest) {
    const authApi = new AuthApi(apiConfig);
    return authApi.googleLoginAuthGoogleLoginPost({ googleLoginRequest });
  },
  logout() {
    const authApi = new AuthApi(apiConfig);
    return authApi.logoutAuthLogoutGet();
  },
};
