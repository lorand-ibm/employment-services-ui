import axios from 'axios';

import reittiopasConfig from './reittiopasConfig';

import {Address} from '../types';

const getFetchUrl = query => {
  const text = query;
  return `${reittiopasConfig.geocodingApiUrl}/search?text=${text}&boundary.polygon=${
    reittiopasConfig.boundaryPolygon
  }`;
};

export const getAddress = (query): Promise<Address[]> =>
  axios.get(getFetchUrl(query)).then(res =>
    res.data.features.map(feature => {
      const coords = feature.geometry.coordinates.toString().split(',');
      return {
        name: feature.properties.name,
        localadmin: feature.properties.localadmin,
        coords: {lat: coords[1], lon: coords[0]},
      };
    }),
  );
