import { apiConfig } from '../../boot/apiConfig';
import {
  // APIs
  UserApi,
  // Models
  UserRead,
  UpdateUserRequest,
} from '../../../schemas/generated-api';

export type { UserRead };

export default {
  getMe() {
    const userApi = new UserApi(apiConfig);
    return userApi.getMeUserGetmeGet();
  },
  updateUser(uid: string, updateUserRequest: UpdateUserRequest) {
    const userApi = new UserApi(apiConfig);
    return userApi.updateUserUserUpdateUserUidPut({ uid, updateUserRequest });
  },
  updateProfilePicture(uid: string, file: Blob) {
    const userApi = new UserApi(apiConfig);
    return userApi.updateProfilePictureUserUpdateProfilePictureUidPut({ uid, file });
  },
};
