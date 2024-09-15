import { apiConfig } from '../../boot/apiConfig';
import {
  // APIs
  AircraftApi,
  // Models
  AircraftResponse,
  CreateAircraftRequest,
  UpdateAircraftRequest,
} from '../../../schemas/generated-api';

export type { AircraftResponse, AircraftApi };

export default {
  createAircraft(aircraft: CreateAircraftRequest) {
    const aircraftApi = new AircraftApi(apiConfig);
    return aircraftApi.createAircraftAircraftCreatePost({ createAircraftRequest: aircraft });
  },
  getAircrafts() {
    const aircraftApi = new AircraftApi(apiConfig);
    return aircraftApi.getAllAircraftsAircraftGet();
  },
  getAircraft(aircraftId: number) {
    const aircraftApi = new AircraftApi(apiConfig);
    return aircraftApi.getAircraftByIdAircraftAircraftIdGet({ aircraftId });
  },
  updateAircraft(aircraftId: number, updateAircraftRequest: UpdateAircraftRequest) {
    const aircraftApi = new AircraftApi(apiConfig);
    return aircraftApi.updateAircraftAircraftAircraftIdPut({ aircraftId, updateAircraftRequest });
  },
  deleteAircraft(aircraftId: number) {
    const aircraftApi = new AircraftApi(apiConfig);
    return aircraftApi.deleteAircraftAircraftAircraftIdDelete({ aircraftId });
  },
};
