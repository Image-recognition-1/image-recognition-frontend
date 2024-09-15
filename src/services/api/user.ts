import { apiConfig } from '../../boot/apiConfig';
import {
  // APIs
  UsersApi,
  // Models
  UserResponse,
  CreateUserRequest,
  UpdateUserRequest,
} from '../../../schemas/generated-api';

export type { UserResponse, UsersApi };

export default {
  createUser(user: CreateUserRequest) {
    const userApi = new UsersApi(apiConfig);
    return userApi.createUserUsersCreatePost({ createUserRequest: user });
  },
  getUsers() {
    const userApi = new UsersApi(apiConfig);
    return userApi.getAllUsersUsersGet();
  },
  getUser(userId: number) {
    const userApi = new UsersApi(apiConfig);
    return userApi.getUserByIdUsersUserIdGet({ userId });
  },
  updateUser(userId: number, updateUserRequest: UpdateUserRequest) {
    const userApi = new UsersApi(apiConfig);
    return userApi.updateUserUsersUserIdPut({ userId, updateUserRequest });
  },
  deleteUser(userId: number) {
    const userApi = new UsersApi(apiConfig);
    return userApi.deleteUserUsersUserIdDelete({ userId });
  },
};
