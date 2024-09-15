import { apiConfig } from '../../boot/apiConfig';
import {
  // APIs
  DefaultApi,
  // Models
} from '../../../schemas/generated-api';

export default {
  uploadImage(file: Blob) {
    const imageApi = new DefaultApi(apiConfig);
    return imageApi.uploadUploadPost({ file });
  },
};
