import authApi, { GoogleLoginRequest } from 'src/services/api/auth';

import userApi, { ResponseUser } from 'src/services/api/user';

import imageApi from 'src/services/api/image';

export type { ResponseUser, GoogleLoginRequest };

export {
  authApi,
  userApi,
  imageApi,
};
