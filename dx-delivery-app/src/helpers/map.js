import {defaultDeltas} from './constants';

export const formatMarker = (stop, _id) => ({
  latitude: stop?.location?.lat,
  longitude: stop?.location?.long,
  _id,
  ...defaultDeltas,
});
