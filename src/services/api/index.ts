import authApi, { GoogleLoginRequest } from 'src/services/api/auth';

import userApi, { UserRead } from 'src/services/api/user';

import imageApi, { ImagesRead } from 'src/services/api/image';

export type { UserRead, GoogleLoginRequest, ImagesRead };

export {
  authApi,
  userApi,
  imageApi,
};
