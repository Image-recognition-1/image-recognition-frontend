import { apiConfig } from '../../boot/apiConfig';
import {
  // APIs
  DefaultApi,
  // Models
  RegisterRequest,
  ResponseUser,
  UpdateUserRequest,
} from '../../../schemas/generated-api';

export type { ResponseUser };

export default {
  createUser(user: RegisterRequest) {
    const userApi = new DefaultApi(apiConfig);
    return userApi.registerUserRegisterPost({ registerRequest: user });
  },
  updateUser(uid: string, updateUserRequest: UpdateUserRequest) {
    const userApi = new DefaultApi(apiConfig);
    return userApi.updateUserUpdateUserUidPut({ uid, updateUserRequest });
  },

};
