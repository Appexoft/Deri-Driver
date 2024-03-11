import React, {useCallback, useState, useEffect} from 'react';
import {Image, View} from 'react-native';
import {DropdownInput, AutoCompleteInput} from '@components';
import {departments} from '@helpers/constants';
import {useStyles} from '@theme';
import {useShippingStore, useSuggestedLocation} from '@hooks';
import {isIos} from '@helpers/platform';
import styles from './styles';

const AddressInput = ({
  activePin = false,
  addressType = 'origin',
  zIndex = 1,
  placeholderDeparment = 'Departamento',
  placeholderAddress = '',
  activeInput,
  setActiveInput,
  onDataFromDropdown,
  onDataFromAutoComplete,
}) => {
  const defaultValue = 'Montevideo';
  const theme = useStyles();
  const {setAddressGeocode, shippingForm, setValueToAddressTypeForm} =
    useShippingStore();
  const [query, setQuery] = useState('');
  const {result, loading} = useSuggestedLocation(query);

  const handleDepartmentPick = value => {
    onDataFromDropdown(value);
    setValueToAddressTypeForm(addressType, {department: value});
  };

  const {address, streetName, streetNumber} = shippingForm[addressType];
  const addressFormated = address ? `${streetName} ${streetNumber}` : '';
  const setAddress = item => {
    if (item) {
      setAddressGeocode(addressType, item?.place_id, item?.main_text);
    }
  };

  const dropdownId = `${addressType}-dropdown`;
  const autoCompleteId = `${addressType}-autocomplete`;

  const onFocus = useCallback(
    id => {
      if (setActiveInput && typeof setActiveInput === 'function') {
        setActiveInput(id);
      }
    },
    [setActiveInput],
  );

  useEffect(() => {
    if (addressFormated) {
      onDataFromAutoComplete(addressFormated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressFormated]);

  useEffect(() => {
    onDataFromDropdown(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[theme.row, isIos && {zIndex}]}>
      <View style={styles.locationIconContainer}>
        <Image
          source={
            activePin
              ? require('@assets/location_pin/location_pin_active.png')
              : require('@assets/location_pin/location_pin.png')
          }
          resizeMode="contain"
          style={styles.locationIconImg}
        />
      </View>
      <View style={theme.flex}>
        <DropdownInput
          placeholder={placeholderDeparment}
          list={departments}
          onOptionSelected={handleDepartmentPick}
          defaultInputValue={defaultValue}
          inputContainerStyles={isIos && styles.zIndexTwo}
          onFocus={() => onFocus(dropdownId)}
          isFocus={activeInput === dropdownId}
        />
        <AutoCompleteInput
          placeholder={placeholderAddress}
          suggestedLocations={result}
          onAddressSearch={setQuery}
          loading={loading}
          setAddress={setAddress}
          currentValue={addressFormated}
          onFocus={() => onFocus(autoCompleteId)}
          isFocus={activeInput === autoCompleteId}
        />
      </View>
    </View>
  );
};

export default AddressInput;
