import { apiConfig } from '../../boot/apiConfig';
import {
  // APIs
  FlightsApi,
  // Models
  FlightResponse,
  CreateFlightRequest,
  UpdateFlightRequest,
} from '../../../schemas/generated-api';

export type { FlightResponse, FlightsApi };

export default {
  createFlight(flight: CreateFlightRequest) {
    const flightApi = new FlightsApi(apiConfig);
    return flightApi.createFlightFlightsCreatePost({ createFlightRequest: flight });
  },
  getFlights() {
    const flightApi = new FlightsApi(apiConfig);
    return flightApi.getAllFlightsFlightsGet();
  },
  getFlight(flightId: number) {
    const flightApi = new FlightsApi(apiConfig);
    return flightApi.getFlightByIdFlightsFlightIdGet({ flightId });
  },
  updateFlight(flightId: number, updateFlightRequest: UpdateFlightRequest) {
    const flightApi = new FlightsApi(apiConfig);
    return flightApi.updateFlightFlightsFlightIdPut({ flightId, updateFlightRequest });
  },
  deleteFlight(flightId: number) {
    const flightApi = new FlightsApi(apiConfig);
    return flightApi.deleteFlightFlightsFlightIdDelete({ flightId });
  },
};
