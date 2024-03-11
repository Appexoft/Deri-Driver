import React, {useContext, useEffect, useState, useCallback} from 'react';
import {ShippingContext} from '@store/shipping/state';
import {Map} from '@components';
import {ADDRESS_MAP_TITLE} from '@components/navigation/ScreenNames';

const AddressMap = ({route, navigation}) => {
  const {addressType, edit} = route.params;

  const {
    setAddressGeocode,
    setStreetFloor,
    shippingForm,
    editAddressForm,
    mapIsLoading,
    mapError,
    suggestedLocations,
    getSuggestedAddresses,
  } = useContext(ShippingContext);

  const {
    location: {lat, long},
    address,
    streetFloor,
    streetName,
    streetNumber,
  } = edit ? editAddressForm[addressType] : shippingForm[addressType];

  const addressFormated = address ? `${streetName} ${streetNumber}` : '';
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [addressSearch, setAddressSearch] = useState(addressFormated);
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
  }, [addressSearch, mapError, mapIsLoading]);

  useEffect(() => {
    navigation.setOptions({
      title:
        addressType === 'origin'
          ? ADDRESS_MAP_TITLE.replace('${ADDRESS_TYPE}', 'Origen')
          : addressType === 'destination'
          ? ADDRESS_MAP_TITLE.replace('${ADDRESS_TYPE}', 'Destino')
          : null,
    });
  }, [navigation, addressType]);

  useEffect(() => {
    handleRegionChange({latitude: lat, longitude: long});
  }, [handleRegionChange, lat, long]);

  const onConfirm = () => {
    setStreetFloor(addressType, addressFloor, edit);
    return navigation.goBack();
  };

  const setAddress = item => {
    if (item) {
      setAddressSearch(item?.main_text);
      setAddressGeocode(addressType, item?.place_id, item?.main_text, edit);
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
      suggestedLocations={suggestedLocations}
      error={mapError}
      onConfirm={onConfirm}
      btnDisabled={btnDisabled}
      addressFloor={addressFloor}
      setAddressFloor={setAddressFloor}
      addressSearch={addressFormated}
      regionData={regionData}
      handleRegionChange={handleRegionChange}
      markerData={markerData}
      setAddress={setAddress}
      onAddressSearch={onAddressSearch}
    />
  );
};

export default AddressMap;
