import { apiConfig } from '../../boot/apiConfig';
import {
  // APIs
  DefaultApi,
  // Models
  RegisterRequest,
  ResponseUser,
} from '../../../schemas/generated-api';

export type { ResponseUser };

export default {
  createUser(user: RegisterRequest) {
    const userApi = new DefaultApi(apiConfig);
    return userApi.registerUserRegisterPost({ registerRequest: user });
  },
  // getUsers() {
  //   const userApi = new UsersApi(apiConfig);
  //   return userApi.getAllUsersUsersGet();
  // },
  // getUser(userId: number) {
  //   const userApi = new UsersApi(apiConfig);
  //   return userApi.getUserByIdUsersUserIdGet({ userId });
  // },
  // updateUser(userId: number, updateUserRequest: UpdateUserRequest) {
  //   const userApi = new UsersApi(apiConfig);
  //   return userApi.updateUserUsersUserIdPut({ userId, updateUserRequest });
  // },
  // deleteUser(userId: number) {
  //   const userApi = new UsersApi(apiConfig);
  //   return userApi.deleteUserUsersUserIdDelete({ userId });
  // },
};
