import React, {useContext, useEffect, useState, useCallback} from 'react';
import {UserContext} from '@store/user/state';
import {Map} from '@components';

const UserAddress = ({navigation}) => {
  const {
    setAddressGeocode,
    addressForm,
    mapIsLoading,
    mapError,
    suggestedLocations,
    getSuggestedAddresses,
  } = useContext(UserContext);

  const {
    location: {lat, long},
    streetFloor,
    place_id,
  } = addressForm;

  const address = addressForm.streetName
    ? `${addressForm.streetName} ${addressForm.streetNumber}`
    : '';
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [addressSearch, setAddressSearch] = useState(address);
  const [addressId, setAddressId] = useState(place_id);
  const [addressFloor, setAddressFloor] = useState(streetFloor);

  const [markerData, setMarker] = useState({
    latitude: lat,
    longitude: long,
  });

  const [regionData, setRegion] = useState({
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  useEffect(() => {
    setBtnDisabled(!addressSearch || mapIsLoading || mapError);
  }, [addressSearch, mapIsLoading, mapError]);

  useEffect(() => {
    handleRegionChange({latitude: lat, longitude: long});
  }, [handleRegionChange, lat, long]);

  const onConfirm = async () => {
    if (
      await setAddressGeocode(
        addressId,
        true,
        addressFloor,
        true,
        addressSearch,
      )
    ) {
      return navigation.goBack();
    }
  };

  const setAddress = item => {
    if (item) {
      setAddressSearch(item?.main_text);
      setAddressId(item?.place_id);
      setAddressGeocode(item?.place_id, false, false, true, item?.main_text);
    }
  };

  const onAddressSearch = text => {
    setAddressSearch(text);
    if (text && text !== '') {
      getSuggestedAddresses(text);
    }
  };

  const handleRegionChange = useCallback(
    _address => {
      let {latitude, longitude, latitudeDelta, longitudeDelta} = _address;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: latitudeDelta || regionData.latitudeDelta,
        longitudeDelta: longitudeDelta || regionData.longitudeDelta,
      });
      setMarker({latitude, longitude});
    },
    [regionData.latitudeDelta, regionData.longitudeDelta],
  );

  return (
    <Map
      loading={mapIsLoading}
      error={mapError}
      suggestedLocations={suggestedLocations}
      onConfirm={onConfirm}
      btnDisabled={btnDisabled}
      addressFloor={addressFloor}
      setAddressFloor={setAddressFloor}
      addressSearch={address}
      regionData={regionData}
      handleRegionChange={handleRegionChange}
      markerData={markerData}
      setAddress={setAddress}
      onAddressSearch={onAddressSearch}
    />
  );
};

export default UserAddress;
