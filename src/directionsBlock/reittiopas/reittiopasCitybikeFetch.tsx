import axios from 'axios';

import reittiopasConfig from './reittiopasConfig';

export const fetchCityBikes = async () => {
  const query = `{
    bikeRentalStations {
      lon,
      lat,
      bikesAvailable
    }
  }`

  const res = await axios({
    url: reittiopasConfig.routingApiUrl,
    method: 'post',
    data: {
      query,
    },
  });

  return res.data.data
}