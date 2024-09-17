import { apiConfig } from '../../boot/apiConfig';
import {
  // APIs
  ImageApi,
  // Models
  ImagesRead,
} from '../../../schemas/generated-api';

export type { ImagesRead };

export default {
  uploadImage(file: Blob) {
    const imageApi = new ImageApi(apiConfig);
    return imageApi.uploadImageUploadPost({ file });
  },
  getImages() {
    const imageApi = new ImageApi(apiConfig);
    return imageApi.getImagesImageImagesGet();
  },
};
