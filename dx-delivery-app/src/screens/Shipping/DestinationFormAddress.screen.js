import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import Config from 'react-native-config';
import CheckBox from '@react-native-community/checkbox';
import {ShippingContext} from '@store/shipping/state';
import {
  MainButton,
  CancelButton,
  AddressInput,
  ErrorAlertDialog,
  SecondaryButton,
  Input,
} from '@components';
import {useFilter} from '@hooks';
import {
  ADDRESS_MAP,
  SHIPPING_METHOD,
  ORIGIN_ADDRESS_FORM,
} from '@components/navigation/ScreenNames';
import {shippingTypeValues, departments} from '@helpers/constants';
import {useTheme} from '@hooks';

import styles from './Shipping.styles';

const OriginFormAddress = ({navigation, route, ...props}) => {
  const {colors} = useTheme();
  const isIOS = Platform.OS === 'ios';
  const {
    shippingForm,
    getShippingFormAvaibleValues,
    createShippingError,
    dismissCreateShippingError,
    avaiblesValues: {neighborhoods},
    loading,
    clearShippingData,
    pickupCenters,
    setDestination,
    addValueToShippingForm,
  } = useContext(ShippingContext);

  const validAddress = useMemo(
    () => shippingForm.destination?.address,
    [shippingForm.destination?.address],
  );
  const destinationAddress = shippingForm.destination.address
    ? `${shippingForm.destination?.streetName} ${
        shippingForm.destination?.streetNumber
      } ${shippingForm.destination?.streetFloor || ''}`
    : '';

  const [pickupInAgency, setPickupInAgency] = useState(false);
  const [destinationType, setDestinationType] = useState(
    shippingForm.destinationType || 'MVD',
  );
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [department, setDepartment] = useState(
    shippingForm.destination.department,
  );
  const [city, setCity] = useState(shippingForm.destination.city);
  const [streetName, setStreetName] = useState(
    shippingForm.destination.streetName,
  );
  const [streetFloor, setStreetFloor] = useState(
    shippingForm.destination.streetFloor,
  );

  const isMvd = useMemo(() => destinationType === 'MVD', [destinationType]);
  const isPickup = useMemo(
    () => destinationType === shippingTypeValues.PICK_UP,
    [destinationType],
  );
  const isAgency = useMemo(
    () => destinationType === 'AGENCY',
    [destinationType],
  );

  const pickupFilter = useFilter({
    arrayOfItems: pickupCenters,
    label: 'Sucursal',
    initialValue: null,
    multiple: false,
    onlySelect: true,
  });

  const departmentSelect = useFilter({
    arrayOfItems: departments,
    label: 'Departamento',
    initialValue: null,
    multiple: false,
    onlySelect: true,
  });

  const neighborhoodSelect = useFilter({
    arrayOfItems: neighborhoods || [],
    label: 'Barrio',
    initialValue: shippingForm?.neighborhood || null,
    multiple: false,
    onlySelect: true,
  });

  useEffect(() => {
    neighborhoodSelect.setItems(neighborhoods || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [neighborhoods]);

  const {SelectInputItem: PickupFilter} = pickupFilter;

  const {SelectInputItem: DepartmentSelect} = departmentSelect;

  const {SelectInputItem: NeighborhoodSelect} = neighborhoodSelect;

  const mvdOption = useMemo(() => isMvd && validAddress, [isMvd, validAddress]);

  const pickupOption = useMemo(
    () => isPickup && !loading && validAddress && pickupFilter?.value,
    [isPickup, loading, pickupFilter?.value, validAddress],
  );

  const agencyOption = useMemo(
    () =>
      isAgency &&
      !loading &&
      city &&
      department &&
      (pickupInAgency || streetName),
    [city, department, isAgency, loading, pickupInAgency, streetName],
  );

  useEffect(() => {
    if (pickupFilter?.activeItem) {
      setDestination(pickupFilter.activeItem);
    }
  }, [pickupFilter?.activeItem, setDestination]);

  useEffect(() => {
    if (departmentSelect?.activeItem) {
      setDepartment(departmentSelect.activeItem.name);
    }
  }, [departmentSelect?.activeItem]);

  useEffect(() => {
    setBtnDisabled(
      !(
        (mvdOption && shippingForm?.neighborhood) ||
        pickupOption ||
        agencyOption
      ),
    );
  }, [agencyOption, shippingForm?.neighborhood, mvdOption, pickupOption]);

  const cancelShipping = () => {
    clearShippingData();
    navigation.navigate(ORIGIN_ADDRESS_FORM);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToShippingMethod = useCallback(() => {
    navigation.navigate(SHIPPING_METHOD);
  }, [navigation]);

  const submitAddress = useCallback(async () => {
    if (isAgency) {
      setDestination({
        address: '',
        location: {lat: -34.8824311, long: -56.1758958},
        postalCode: '',
        streetNumber: '',
        department,
        city,
        streetName,
        streetFloor,
      });
    }
    await getShippingFormAvaibleValues(
      'methods',
      shippingForm.origin.postalCode,
      shippingForm.destination.postalCode,
      null,
      isAgency,
      isPickup,
      !isMvd && navigateToShippingMethod,
    );
  }, [
    city,
    department,
    getShippingFormAvaibleValues,
    isAgency,
    isMvd,
    isPickup,
    navigateToShippingMethod,
    setDestination,
    shippingForm.destination.postalCode,
    shippingForm.origin.postalCode,
    streetFloor,
    streetName,
  ]);

  useEffect(() => {
    if (mvdOption) {
      submitAddress();
    }
  }, [mvdOption, submitAddress]);

  const mapDestinationScreen = () => {
    navigation.navigate(ADDRESS_MAP, {addressType: 'destination'});
  };

  const onChangeCheckbox = (value, key) => {
    if (value) {
      setDestinationType(key);
    }
    if (value === shippingTypeValues.PICK_UP) {
      addValueToShippingForm('type', shippingTypeValues.PICK_UP);
    }
  };

  const openZones = useCallback(async () => {
    await Linking.openURL(`${Config.ZONES_URL}`);
  }, []);

  useEffect(() => {
    addValueToShippingForm('destinationType', destinationType);
  }, [addValueToShippingForm, destinationType]);

  useEffect(() => {
    addValueToShippingForm('pickupInAgency', pickupInAgency);
  }, [addValueToShippingForm, pickupInAgency]);

  useEffect(() => {
    addValueToShippingForm('neighborhood', neighborhoodSelect.activeItem);
  }, [addValueToShippingForm, neighborhoodSelect.activeItem]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flexContainer}>
      <ScrollView
        style={[styles.formContainer, {backgroundColor: colors.common.white}]}
        contentContainerStyle={styles.centerContainer}>
        <Text style={styles.presentationText}>
          Selecciona el origen y el destino de tu pedido
        </Text>
        <View style={styles.allSpace}>
          <View style={[styles.row, styles.customRow]}>
            <Text style={styles.addressIndication}>DESTINO</Text>
            <TouchableOpacity onPress={openZones}>
              <Text style={[styles.link, {color: colors.button.main}]}>
                Ver zonas
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separation}>
            <View
              style={[
                styles.row,
                styles.centerContainer,
                styles.checkBoxSeparation,
              ]}>
              <CheckBox
                tintColors={{
                  false: colors.blackPearl,
                  true: colors.blackPearl,
                }}
                boxType="circle"
                value={isMvd}
                onValueChange={value => onChangeCheckbox(value, 'MVD')}
                style={styles.checkBoxStyle}
                tintColor={colors.blackPearl}
                onCheckColor={colors.blackPearl}
                onTintColor={colors.blackPearl}
              />
              <Text>Montevideo o Canelones</Text>
            </View>
            <View
              style={[
                styles.row,
                styles.centerContainer,
                styles.checkBoxSeparation,
              ]}>
              <CheckBox
                tintColors={{
                  false: colors.blackPearl,
                  true: colors.blackPearl,
                }}
                boxType="circle"
                value={isPickup}
                onValueChange={value =>
                  onChangeCheckbox(value, shippingTypeValues.PICK_UP)
                }
                style={styles.checkBoxStyle}
                tintColor={colors.blackPearl}
                onCheckColor={colors.blackPearl}
                onTintColor={colors.blackPearl}
              />
              <Text>Pick up</Text>
            </View>
            <View
              style={[
                styles.row,
                styles.centerContainer,
                styles.checkBoxSeparation,
              ]}>
              <CheckBox
                tintColors={{
                  false: colors.blackPearl,
                  true: colors.blackPearl,
                }}
                boxType="circle"
                value={isAgency}
                onValueChange={value => onChangeCheckbox(value, 'AGENCY')}
                style={styles.checkBoxStyle}
                tintColor={colors.blackPearl}
                onCheckColor={colors.blackPearl}
                onTintColor={colors.blackPearl}
              />
              <Text>Al interior</Text>
            </View>
          </View>
          {isMvd && (
            <>
              <View style={styles.addressInputContainer}>
                <AddressInput
                  label="Dirección"
                  onPress={mapDestinationScreen}
                  value={destinationAddress}
                  inputContainerStyle={styles.maxHeightAddress}
                />
              </View>
              {!!mvdOption && <NeighborhoodSelect />}
            </>
          )}
          {isPickup && (
            <View>
              <PickupFilter />
            </View>
          )}
          {isAgency && (
            <View style={styles.agencyForm}>
              <DepartmentSelect />
              <Input
                label="Ciudad"
                returnKeyType="next"
                keyboardType="default"
                onChangeText={setCity}
                value={city}
              />
              <View
                style={[
                  styles.row,
                  styles.centerContainer,
                  styles.inputSeparation,
                ]}>
                <CheckBox
                  tintColors={{
                    false: colors.blackPearl,
                    true: colors.blackPearl,
                  }}
                  boxType="circle"
                  value={pickupInAgency}
                  onValueChange={setPickupInAgency}
                  style={styles.checkBoxStyle}
                  tintColor={colors.blackPearl}
                  onCheckColor={colors.blackPearl}
                  onTintColor={colors.blackPearl}
                />
                <Text>Retira en agencia</Text>
              </View>
              {!pickupInAgency && (
                <>
                  <Input
                    label="Dirección"
                    returnKeyType="next"
                    keyboardType="default"
                    onChangeText={setStreetName}
                    value={streetName}
                  />
                  <Input
                    label="Apartamento/Casa"
                    returnKeyType="next"
                    keyboardType="default"
                    onChangeText={setStreetFloor}
                    value={streetFloor}
                  />
                </>
              )}
            </View>
          )}
        </View>
        <View
          style={[
            styles.mainButtonContainer,
            styles.row,
            styles.spaceBetween,
            styles.fullWidth,
            isIOS && styles.hiddingButton,
          ]}>
          <SecondaryButton label="Atrás" onPress={goBack} />
          <MainButton
            label="Siguiente"
            onPress={mvdOption ? navigateToShippingMethod : submitAddress}
            disabled={btnDisabled}
            loading={loading}
          />
        </View>
        <View
          style={[styles.cancelButtonContainer, isIOS && styles.hiddingButton]}>
          <CancelButton label="Cancelar" onPress={cancelShipping} />
        </View>
      </ScrollView>
      <ErrorAlertDialog
        visible={!!createShippingError}
        onClose={dismissCreateShippingError}
        message={createShippingError}
      />
    </KeyboardAvoidingView>
  );
};

export default OriginFormAddress;
