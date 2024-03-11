import React, {useEffect, useMemo, useState, useRef, useCallback} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  Image,
} from 'react-native';
import {
  PrimarySubmitButton,
  SecondaryButton,
  PackageDetailForm,
} from '@components';
import {DRAWER} from '@components/navigation/ScreenNames';
import {useKeyboardAvoidingViewProps, useShippingStore} from '@hooks';
import {DropdownBottomSheetModal} from '@components';
import iconCalendar from '@assets/calendar/calendar.png';
import iconInfoCircle from '@assets/info_circle/info-circle.png';
import {shippingTypes} from '../../api/shippings';

import styles from './ShippingDetail.styles';
import {shippingMethods, shippingTypeValues} from '../../helpers/constants';

const CreateShippingDetail = ({route, navigation}) => {
  const {
    setValueToAddressTypeForm,
    addValueToShippingForm,
    _checkPostalCode,
    shippingForm,
    createShipping,
    clearShippingData,
    shippingRate,
  } = useShippingStore();
  const mounted = useRef(false);
  const bottomSheetModalRef = useRef(null);
  const [arrayOfPackages, setArrayOfPackages] = useState([0]);
  const [packagesDetails, setPackagesDetails] = useState({});
  const [typeShipping, setTypeShipping] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [typeShippingSelected, setTypeShippingSelected] = useState(null);
  const transformPackage = (typeIcon, count) => {
    const result = {S: '', M: '', L: ''};

    if (typeIcon === 'S' || typeIcon === 'M' || typeIcon === 'L') {
      result[typeIcon] = `${count}`;
    }
    return result;
  };
  const [listOfPackages, setListOfPackages] = useState([
    {
      S: '',
      M: '',
      L: '',
    },
  ]);

  const originPostalCode = shippingForm.origin.postalCode;
  const destinationPostalCode = shippingForm.destination.postalCode;

  useEffect(() => {
    if (shippingForm.type.typeIcon && shippingForm.packages.packages) {
      const packageCount = Object.keys(shippingForm?.packages?.packages).length;
      const transformPackages = transformPackage(
        shippingForm.type.typeIcon,
        packageCount,
      );
      setListOfPackages([transformPackages]);
    }
  }, [shippingForm.type.typeIcon, shippingForm.packages.packages]);

  useEffect(() => {
    const data = Object.values(packagesDetails);
    if (data.length) {
      for (let i = 0; i < arrayOfPackages.length; i++) {
        if (
          data[i]?.type?.activate &&
          data[i]?.weight?.length &&
          typeShippingSelected?.id
        ) {
          setButtonDisabled(false);
        } else {
          setButtonDisabled(true);
        }
      }
    }
  }, [packagesDetails, arrayOfPackages, typeShippingSelected]);

  const handleFormChanges = useCallback((formKey, prop, value) => {
    setPackagesDetails(currentDetails => ({
      ...currentDetails,
      [formKey]: {
        ...currentDetails[formKey],
        [prop]: value,
      },
    }));
  }, []);

  useEffect(() => {
    setValueToAddressTypeForm('type', typeShippingSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeShippingSelected]);

  useEffect(() => {
    setValueToAddressTypeForm('packages', {packages: packagesDetails});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packagesDetails]);

  const packagesForms = useMemo(() => {
    const handleDeletePackage = i => {
      const result = Object.values(packagesDetails).filter(
        (_, key) => key !== i,
      );
      const object = result.reduce(
        (obj, item, key) => Object.assign(obj, {[key]: item}),
        {},
      );

      const resultNumbers = arrayOfPackages.filter((_, k) => k !== i);
      setPackagesDetails(object);
      setArrayOfPackages(resultNumbers);
    };

    return arrayOfPackages.map((key, i) => (
      <PackageDetailForm
        key={`package_detail_${key}`}
        formKey={i}
        handleChanges={handleFormChanges}
        parentMounted={mounted.current}
        packageNumber={i + 1}
        onDeletePackageNumber={() => handleDeletePackage(i)}
      />
    ));
  }, [arrayOfPackages, handleFormChanges, mounted, packagesDetails]);

  const submitOriginForm = async () => {
    const packages = JSON.stringify(listOfPackages);
    const shippingType = shippingTypeValues.COMMON;
    const shippingMethod = shippingMethods.ORDER;

    await addValueToShippingForm('packages', listOfPackages);
    await _checkPostalCode(originPostalCode);

    const purchaseDetails = await shippingRate(
      originPostalCode,
      destinationPostalCode,
      packages,
      shippingType,
      shippingMethod,
    );

    const handleSuccess = numberShipping => {
      clearShippingData();
      navigation.navigate(DRAWER);
    };

    await createShipping(purchaseDetails, handleSuccess);
  };

  const handleAddAnotherPackage = () => {
    setArrayOfPackages([
      ...arrayOfPackages,
      arrayOfPackages[arrayOfPackages.length - 1] + 1,
    ]);
    setButtonDisabled(true);
  };

  const keyboardVerticalOffset = useKeyboardAvoidingViewProps();

  const handleCloseModal = () => {
    bottomSheetModalRef.current?.closeModal();
  };

  const getShippingTypes = useCallback(async () => {
    if (originPostalCode && destinationPostalCode) {
      const result = await shippingTypes(
        originPostalCode,
        destinationPostalCode,
      );
      if (Array.isArray(result) && result.length) {
        setTypeShipping(result);
      }
    }
  }, [originPostalCode, destinationPostalCode]);

  const handleSetShippingType = value => {
    addValueToShippingForm('ShippingTypeId', value.shippingTypeId);
    setTypeShippingSelected(value);
  };

  useEffect(() => {
    mounted.current = true;
    getShippingTypes();
  }, [getShippingTypes]);

  return (
    <View
      style={styles.createShippingDetailContainer}
      onStartShouldSetResponder={handleCloseModal}
    >
      <KeyboardAvoidingView {...keyboardVerticalOffset}>
        <ScrollView
          contentContainerStyle={styles.createShippingDetailScrollable}
          showsVerticalScrollIndicator={false}
        >
          {packagesForms}
          <SecondaryButton
            label="Agregar otro paquete"
            onPress={handleAddAnotherPackage}
            widthSize="100%"
            large
          />
          <DropdownBottomSheetModal
            label="Servicio"
            placeholder="Seleccioná el servicio"
            icon={iconCalendar}
            ref={bottomSheetModalRef}
            data={typeShipping}
            optionPress={typeShippingSelected}
            onOptionSelected={handleSetShippingType}
          />
          <View style={styles.containerAlert}>
            <Image
              source={iconInfoCircle}
              style={[styles.inputIcon, styles.dropdownIcon]}
            />
            <Text style={styles.titleAlert}>
              Las diferencias de peso tendrán gastos adicionales o la devolución
              de la mercancía
            </Text>
          </View>
          <PrimarySubmitButton
            disabled={buttonDisabled}
            widthSize="100%"
            label="Siguiente"
            onPress={submitOriginForm}
            inputContainer={styles.submitSeparation}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateShippingDetail;
