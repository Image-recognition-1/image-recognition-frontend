import authApi from 'src/services/api/auth';

import userApi, { UserResponse, UsersApi } from 'src/services/api/user';

import flightApi, { FlightResponse, FlightsApi } from 'src/services/api/flight';
import airportApi, { AirportResponse, AirportsApi } from 'src/services/api/airport';
import aircraftApi, { AircraftResponse, AircraftApi } from 'src/services/api/aircraft';

export type {
  UserResponse, UsersApi,
  FlightResponse, FlightsApi,
  AirportResponse, AirportsApi,
  AircraftResponse, AircraftApi,
};
export {
  authApi,
  userApi,
  flightApi,
  airportApi,
  aircraftApi,
};
