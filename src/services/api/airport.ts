import { apiConfig } from '../../boot/apiConfig';
import {
  // APIs
  AirportsApi,
  // Models
  AirportResponse,
  CreateAirportRequest,
  UpdateAirportRequest,
} from '../../../schemas/generated-api';

export type { AirportResponse, AirportsApi };

export default {
  createAirport(airport: CreateAirportRequest) {
    const airportApi = new AirportsApi(apiConfig);
    return airportApi.createAirportAirportsCreatePost({ createAirportRequest: airport });
  },
  getAirports() {
    const airportApi = new AirportsApi(apiConfig);
    return airportApi.getAllAirportsAirportsGet();
  },
  getAirport(airportId: number) {
    const airportApi = new AirportsApi(apiConfig);
    return airportApi.getAirportByIdAirportsAirportIdGet({ airportId });
  },
  updateAirport(airportId: number, updateAirportRequest: UpdateAirportRequest) {
    const airportApi = new AirportsApi(apiConfig);
    return airportApi.updateAirportAirportsAirportIdPut({ airportId, updateAirportRequest });
  },
  deleteAirport(airportId: number) {
    const airportApi = new AirportsApi(apiConfig);
    return airportApi.deleteAirportAirportsAirportIdDelete({ airportId });
  },
};
