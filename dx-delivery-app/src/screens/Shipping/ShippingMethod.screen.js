import React, {useContext, useEffect, useState} from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {ShippingContext} from '@store/shipping/state';
import {
  MainButton,
  CancelButton,
  ErrorAlertDialog,
  SecondaryButton,
} from '@components';
import {
  SHIPPING_TYPE,
  ORIGIN_ADDRESS_FORM,
  SHIPPING_PACKAGES,
  SHIPPING_RECEIVER_DETAILS,
} from '@components/navigation/ScreenNames';
import {
  shippingTypeValues,
  shippingMethods as SHIPPING_METHODS,
} from '@helpers/constants';
import {useTheme} from '@hooks';
import styles from './Shipping.styles';

const icons = {
  MESSAGERING: require('@assets/messagering_icon/messagering_icon.png'),
  ORDER: require('@assets/package/package.png'),
  COLLECTION: require('@assets/collection/collection.png'),
};

const ShippingMethod = ({navigation, route, ...props}) => {
  const {colors} = useTheme();
  const {
    addValueToShippingForm,
    shippingForm,
    avaiblesValues: {shippingMethods},
    getShippingFormAvaibleValues,
    createShippingError,
    dismissCreateShippingError,
    loading,
    clearShippingData,
    shippingRate,
  } = useContext(ShippingContext);

  const [_shippingMethod, _setShippingMethod] = useState([]);
  const [activeShippingMethod, setActiveShippingMethod] = useState(
    shippingForm?.method,
  );

  const isAgency = shippingForm.destinationType === 'AGENCY';
  const isPickup = shippingForm.destinationType === shippingTypeValues.PICK_UP;

  useEffect(() => {
    _setShippingMethod(shippingMethods);
  }, [shippingMethods]);

  useEffect(() => {
    setActiveShippingMethod(shippingForm?.method);
  }, [shippingForm?.method]);

  const setCurrentShippingType = selectedItemId => {
    const selectedItem = _shippingMethod.find(
      item => item.id === selectedItemId,
    );
    setActiveShippingMethod(selectedItem?.id);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const cancelShipping = () => {
    clearShippingData();
    navigation.navigate(ORIGIN_ADDRESS_FORM);
  };

  const navigateToReceiverDetails = () => {
    return navigation.navigate(SHIPPING_RECEIVER_DETAILS);
  };

  const navigateToNextStep = async () => {
    if (shippingForm.destinationType === shippingTypeValues.PICK_UP) {
      addValueToShippingForm('type', shippingForm.destinationType);
      if (SHIPPING_METHODS.MESSAGERING === activeShippingMethod) {
        await shippingRate(
          shippingForm.origin.postalCode,
          shippingForm.destination.postalCode,
          [],
          shippingTypeValues.COMMON,
          activeShippingMethod,
          navigateToReceiverDetails,
        );
        return;
      }
      return navigation.navigate(SHIPPING_PACKAGES);
    }
    if (shippingForm.destinationType === 'AGENCY') {
      addValueToShippingForm('type', shippingTypeValues.COMMON);
      if (SHIPPING_METHODS.MESSAGERING === activeShippingMethod) {
        await shippingRate(
          shippingForm.origin.postalCode,
          shippingForm.destination.postalCode,
          [],
          shippingTypeValues.COMMON,
          activeShippingMethod,
          navigateToReceiverDetails,
        );
        return;
      }
      return navigation.navigate(SHIPPING_PACKAGES);
    }
    return navigation.navigate(SHIPPING_TYPE);
  };

  const submitShippingMethod = async () => {
    addValueToShippingForm('method', activeShippingMethod);
    await getShippingFormAvaibleValues(
      'type',
      shippingForm.origin.postalCode,
      shippingForm.destination.postalCode,
      activeShippingMethod,
      isAgency,
      isPickup,
      navigateToNextStep,
    );
  };

  return (
    <View style={styles.flexContainer}>
      <ScrollView
        style={[styles.container, {backgroundColor: colors.common.white}]}
        contentContainerStyle={[styles.centerContainer, styles.flexContainer]}>
        <View style={[styles.flexContainer, styles.topSeparation]}>
          {_shippingMethod?.map(item => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={event => setCurrentShippingType(item.id)}
                style={[
                  styles.shippingTypeItem,
                  {
                    borderColor: colors.border.main,
                    backgroundColor: colors.common.white,
                  },
                  item.id === activeShippingMethod && {
                    ...styles.selectedShippingTypeItem,
                    borderColor: colors.button.main,
                  },
                ]}>
                <Image
                  source={icons[item.id]}
                  resizeMode="contain"
                  style={styles.shippingTypeImage}
                />
                <View style={styles.shippingTypeTextContainer}>
                  <Text
                    style={[
                      styles.shippingTypeLabel,
                      {color: colors.text.main},
                    ]}>
                    {item.name}
                  </Text>
                  <Text>{item.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={[styles.paddingHorizontal, styles.fullWidth]}>
          <View
            style={[
              styles.mainButtonContainer,
              styles.row,
              styles.spaceBetween,
            ]}>
            <SecondaryButton label="Atrás" onPress={goBack} />
            <MainButton
              label="Siguiente"
              onPress={submitShippingMethod}
              disabled={!activeShippingMethod || loading}
              loading={loading}
            />
          </View>
          <View style={styles.cancelButtonContainer}>
            <CancelButton label="Cancelar" onPress={cancelShipping} />
          </View>
        </View>
      </ScrollView>
      <ErrorAlertDialog
        visible={!!createShippingError}
        onClose={dismissCreateShippingError}
        message={createShippingError}
      />
    </View>
  );
};

export default ShippingMethod;
