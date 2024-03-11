import {useState} from 'react';
import {defaultDeltas} from '@helpers/constants';

const useMap = (lat = -34.8824311, long = -56.1758958) => {
  //TODO handle user current location market
  const [markerData, setMarker] = useState({
    latitude: lat,
    longitude: long,
  });
  const [regionData, setRegion] = useState({
    latitude: lat,
    longitude: long,
    ...defaultDeltas,
  });

  return {
    regionData,
    markerData,
    setMarker,
    setRegion,
  };
};

export default useMap;
