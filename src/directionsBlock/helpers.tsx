import {Address, Coords} from './types';

export const createAddressStr = (addr: Address) => {
  if (!addr) {
    return '';
  } else if (!addr.name && addr.localadmin) {
    return addr.localadmin;
  } else if (addr.name && !addr.localadmin) {
    return addr.name;
  } else if (!addr.name && !addr.localadmin) {
    return addr.coords ? addr.coords.lat + ', ' + addr.coords.lon : '';
  } else {
    return addr.name + ', ' + addr.localadmin;
  }
};
