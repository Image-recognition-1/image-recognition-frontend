import authApi from 'src/services/api/auth';

import userApi, { UserResponse, UsersApi } from 'src/services/api/user';

export type {
  UserResponse, UsersApi,
};
export {
  authApi,
  userApi,
};
