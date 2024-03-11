import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {ShippingContext} from '@store/shipping/state';
import {
  MainButton,
  CancelButton,
  Input,
  PackageButton,
  TooltipButton,
  ErrorAlertDialog,
  SecondaryButton,
} from '@components';
import {
  SHIPPING_RECEIVER_DETAILS,
  ORIGIN_ADDRESS_FORM,
} from '@components/navigation/ScreenNames';

import {packagesSize} from '@helpers/constants';
import {useTheme} from '@hooks';
import styles from './Shipping.styles';

const PackageItem = ({value, label, removeAction}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.shippingTypeItem,
        {borderColor: colors.border.main, backgroundColor: colors.common.white},
        styles.packageItem,
      ]}>
      <View style={styles.flexItem}>
        <Text>{value} </Text>
        <Text>Talle {label}</Text>
      </View>
      <TouchableOpacity
        style={[styles.closeContainer, {borderColor: colors.border.main}]}
        onPress={removeAction}>
        <Image
          source={require('@assets/close/black_close.png')}
          style={styles.closeImg}
        />
      </TouchableOpacity>
    </View>
  );
};

const Packages = ({navigation, route, ...props}) => {
  const {colors} = useTheme();
  const {
    addValueToShippingForm,
    shippingForm,
    shippingRate,
    createShippingError,
    dismissCreateShippingError,
    loading,
    clearShippingData,
  } = useContext(ShippingContext);
  const [packageSelected, setPackageSelected] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [listOfPackages, setListOfPackages] = useState(
    shippingForm.packages || [
      {
        S: '',
        M: '',
        L: '',
      },
    ],
  );
  const [quantityOfPackages, setQuantityOfPackages] = useState('1');

  const packages = listOfPackages[0];

  const hasPackages =
    packages &&
    Object.values(packages).reduce(
      (prev, current) => Number(prev) + Number(current),
      0,
    ) > 0;

  const navigateToReceiverDetails = () => {
    navigation.navigate(SHIPPING_RECEIVER_DETAILS);
  };

  const submitPackages = async () => {
    addValueToShippingForm('packages', listOfPackages);
    await shippingRate(
      shippingForm.origin.postalCode,
      shippingForm.destination.postalCode,
      JSON.stringify(listOfPackages),
      shippingForm.type,
      shippingForm.method,
      navigateToReceiverDetails,
    );
  };

  useEffect(() => {
    setBtnDisabled(loading || !hasPackages);
  }, [hasPackages, listOfPackages?.length, loading]);

  const addPackageToList = () => {
    if (packageSelected && quantityOfPackages) {
      const copyOfArray = [...listOfPackages];
      copyOfArray[0][packageSelected] =
        Number(copyOfArray[0][packageSelected]) + Number(quantityOfPackages);

      setListOfPackages([...copyOfArray]);

      setPackageSelected(null);
      setQuantityOfPackages('1');
    }
  };

  const removePackage = item => {
    const cleanListOfPackages = [...listOfPackages];
    cleanListOfPackages[0][item] = 0;
    setListOfPackages(cleanListOfPackages);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const cancelShipping = () => {
    clearShippingData();
    navigation.navigate(ORIGIN_ADDRESS_FORM);
  };

  return (
    <View style={styles.flexContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexContainer}>
        <ScrollView
          style={[styles.formContainer, {backgroundColor: colors.common.white}]}
          contentContainerStyle={[
            styles.centerContainer,
            styles.flexContainer,
          ]}>
          <View style={[styles.flexContainer, styles.limitWidth]}>
            {!!hasPackages && (
              <View style={styles.separation}>
                <Text style={styles.inputLabel}>Lista de Paquetes</Text>
                <View style={styles.wrapContainer}>
                  {!!packages.S && (
                    <PackageItem
                      label="S"
                      value={packages.S}
                      removeAction={() => removePackage('S')}
                    />
                  )}
                  {!!packages.M && (
                    <PackageItem
                      label="M"
                      value={packages.M}
                      removeAction={() => removePackage('M')}
                    />
                  )}
                  {!!packages.L && (
                    <PackageItem
                      label="L"
                      value={packages.L}
                      removeAction={() => removePackage('L')}
                    />
                  )}
                </View>
              </View>
            )}
            <View style={[styles.row, styles.separation]}>
              <Input
                label="Cantidad de paquetes"
                returnKeyType="send"
                keyboardType="numeric"
                onChangeText={setQuantityOfPackages}
                value={quantityOfPackages}
                inputStyle={styles.quantityInput}
              />
            </View>
            <View
              style={[styles.row, styles.spaceBetween, styles.centerContainer]}>
              <Text style={[styles.inputLabel, styles.labelCustom]}>
                Tamaño del paquete
              </Text>
              <TooltipButton
                title="Tamaño de paquetes"
                content={
                  'Tamaño S (hasta 5 kg o 45 cm) \nTamaño M (de 5kg a 10 kg o 1 mts) \nTamaño L (de 10 kg a 25 kg 0 1,5 mts)'
                }
              />
            </View>
            <View style={styles.row}>
              {packagesSize.map(_package => (
                <View style={styles.packageMargin} key={_package}>
                  <PackageButton
                    packageSize={_package}
                    onPress={() => setPackageSelected(_package)}
                    packageSelected={packageSelected === _package}
                  />
                </View>
              ))}
            </View>
            <View style={styles.addPackageButton}>
              <MainButton
                label="Agregar paquete"
                onPress={addPackageToList}
                picture={require('@assets/add/add.png')}
              />
            </View>
          </View>
          <View
            style={[
              styles.mainButtonContainer,
              styles.row,
              styles.spaceBetween,
            ]}>
            <SecondaryButton label="Atrás" onPress={goBack} />
            <MainButton
              label="Siguiente"
              onPress={submitPackages}
              disabled={btnDisabled}
              loading={loading}
            />
          </View>
          <View style={styles.cancelButtonContainer}>
            <CancelButton label="Cancelar" onPress={cancelShipping} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <ErrorAlertDialog
        visible={!!createShippingError}
        onClose={dismissCreateShippingError}
        message={createShippingError}
      />
    </View>
  );
};

export default Packages;
