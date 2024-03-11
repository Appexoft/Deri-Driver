import React, {useContext, useEffect, useState, useCallback} from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {shippingMethods} from '@helpers/constants';
import {ShippingContext} from '@store/shipping/state';
import {
  MainButton,
  CancelButton,
  ErrorAlertDialog,
  SecondaryButton,
} from '@components';
import {
  SHIPPING_PACKAGES,
  ORIGIN_ADDRESS_FORM,
  SHIPPING_RECEIVER_DETAILS,
} from '@components/navigation/ScreenNames';
import {shippingTypeValues} from '@helpers/constants';
import {useTheme} from '@hooks';
import styles from './Shipping.styles';

const icons = {
  PICK_UP: require('@assets/pick_up_icon/pick_up_icon.png'),
  FLASH: require('@assets/flash_icon/flash.png'),
  COMMON: require('@assets/common_icon/common_icon.png'),
  EXPRESS: require('@assets/express_icon/express_icon.png'),
  CHECK: require('@assets/check/check.png'),
  DEPOSIT: require('@assets/deposit/deposit.png'),
};

const ShippingType = ({navigation, route, ...props}) => {
  const {colors} = useTheme();
  const {
    avaiblesValues: {typesOfShipping},
    addValueToShippingForm,
    shippingForm,
    createShippingError,
    dismissCreateShippingError,
    loading,
    clearShippingData,
    shippingRate,
  } = useContext(ShippingContext);

  const [_shippingType, _setShippingType] = useState([]);
  const [activeShippingType, setActiveShippingType] = useState(
    shippingForm?.type,
  );

  useEffect(() => {
    setActiveShippingType(shippingForm?.type);
  }, [shippingForm?.type]);

  useEffect(() => {
    if (typesOfShipping?.length) {
      _setShippingType(
        typesOfShipping?.reduce((filtered, item, index) => {
          if (item.id !== shippingTypeValues.MERCADO_LIBRE) {
            filtered.push({...item, active: index === 0});
          }
          return filtered;
        }, []),
      );
    }
  }, [typesOfShipping]);

  const setCurrentShippingType = selectedItemId => {
    _setShippingType(
      _shippingType?.map(item => {
        if (item.id === selectedItemId) {
          item.active = true;
          setActiveShippingType(item.id);
        } else {
          item.active = false;
        }
        return item;
      }),
    );
  };

  const goBack = () => {
    navigation.goBack();
  };

  const cancelShipping = () => {
    clearShippingData();
    navigation.navigate(ORIGIN_ADDRESS_FORM);
  };

  const navigateToReceiverDetails = useCallback(() => {
    navigation.navigate(SHIPPING_RECEIVER_DETAILS);
  }, [navigation]);

  const submitShippingType = useCallback(async () => {
    addValueToShippingForm('type', activeShippingType);
    if (
      shippingMethods.MESSAGERING === shippingForm.method ||
      shippingMethods.COLLECTION === shippingForm.method
    ) {
      addValueToShippingForm('packages', []);
      await shippingRate(
        shippingForm.origin.postalCode,
        shippingForm.destination.postalCode,
        [],
        activeShippingType,
        shippingForm.method,
        navigateToReceiverDetails,
      );
      return;
    }
    navigation.navigate(SHIPPING_PACKAGES);
  }, [
    activeShippingType,
    addValueToShippingForm,
    navigateToReceiverDetails,
    navigation,
    shippingForm.destination.postalCode,
    shippingForm.method,
    shippingForm.origin.postalCode,
    shippingRate,
  ]);

  return (
    <View style={styles.flexContainer}>
      <ScrollView
        style={[styles.container, {backgroundColor: colors.common.white}]}
        contentContainerStyle={[styles.centerContainer, styles.flexContainer]}>
        <View style={[styles.flexContainer, styles.topSeparation]}>
          {!!_shippingType?.length &&
            _shippingType.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={event => setCurrentShippingType(item.id)}
                style={[
                  styles.shippingTypeItem,
                  {
                    borderColor: colors.border.main,
                    backgroundColor: colors.common.white,
                  },
                  item.id === activeShippingType && {
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
            ))}
        </View>
        <View style={[styles.paddingHorizontal, styles.fullWidth]}>
          <View style={styles.mainButtonContainer}>
            <View
              style={[
                styles.mainButtonContainer,
                styles.row,
                styles.spaceBetween,
              ]}>
              <SecondaryButton label="Atrás" onPress={goBack} />
              <MainButton
                label="Siguiente"
                onPress={submitShippingType}
                disabled={!activeShippingType || loading}
                loading={loading}
              />
            </View>
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

export default ShippingType;
