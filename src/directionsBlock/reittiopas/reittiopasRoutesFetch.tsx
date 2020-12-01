import axios from 'axios';

import reittiopasConfig from './reittiopasConfig';

import {Coords, ItinaryDetails, RouteResults} from '../types';

const transportModes = {
  //kumpaa käytetään ALL vai TRANSIT?
  ALL: '[{mode: FERRY}, {mode: BUS}, {mode: RAIL},{mode: SUBWAY}, {mode: TRAM}, {mode: WALK}]',
  //TRANSIT: "[{mode: TRANSIT}]",
  WALK: '[{mode: WALK}]',
  BICYCLE: '[{mode: BICYCLE}]',
  CAR: '[{mode: CAR}]',
};

const getPlanQuery = (fromCoords, toCoords, transportMode) => {
  return `plan(
      from: {lat: ${fromCoords.lat}, lon: ${fromCoords.lon}},
      to: {lat: ${toCoords.lat}, lon: ${toCoords.lon}},
      numItineraries: 1,
      transportModes: ${transportMode}
    ) {
      date
      itineraries {
        walkDistance
        duration
        legs {
          mode
          distance
          duration
        }
      }
    }`;
};

const queryRoute = async (fromCoords: Coords, toCoords: Coords) => {
  const query = `{
    ALL: ${getPlanQuery(fromCoords, toCoords, transportModes.ALL)},
    WALK: ${getPlanQuery(fromCoords, toCoords, transportModes.WALK)},
    BICYCLE: ${getPlanQuery(fromCoords, toCoords, transportModes.BICYCLE)},
    CAR: ${getPlanQuery(fromCoords, toCoords, transportModes.CAR)}
  }`;


  const res = await axios({
    url: reittiopasConfig.routingApiUrl,
    method: 'post',

    timeout: 60*1000,
    data: {
      query,
    },
  });

  return res.data.data;
};

const getItinayDetails = (itinary): ItinaryDetails => {
  const itineraryDetailsReducer = (acc, leg) => {
    return {
      ...acc,
      distance: acc.distance + leg.distance,
      emissions: acc.emissions + reittiopasConfig.emissionsPerM[leg.mode] * leg.distance,
    };
  };
  const legs = itinary.legs;
  if (legs.length == 0) return null;
  return legs.reduce(itineraryDetailsReducer, {
    distance: 0,
    emissions: 0,
    duration: itinary.duration,
  });
};

const fetchRoutes = async (fromCoords: Coords, toCoords: Coords): Promise<RouteResults> => {
  const data = await queryRoute(fromCoords, toCoords);
  const keys = Object.keys(data);
  const routeDetails = keys.reduce((acc, key) => {
    const itinary = data[key].itineraries[0];
    const itinaryDetails = itinary ? getItinayDetails(itinary) : null;
    return {...acc, [key]: itinaryDetails};
  }, {});
  return {date: data[keys[0]].date, results: routeDetails};
};

export default fetchRoutes;
