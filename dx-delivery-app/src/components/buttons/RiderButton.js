import React, {useContext} from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ShippingContext} from '@store/shipping/state';
import {RIDERS} from '@components/navigation/ScreenNames';
import styles from './styles';

const enabledIcon = require('@assets/motorcycle/motorcycle.png');
const disabledIcon = require('@assets/motorcycle/disabled_motorcycle.png');

const RiderButton = () => {
  const navigation = useNavigation();

  const {enableSelection, shippingSelected} = useContext(ShippingContext);

  const isEnabled = enableSelection && shippingSelected.length;

  const submitAction = () => {
    if (isEnabled) {
      navigation.navigate(RIDERS);
    }
  };

  const icon = isEnabled ? enabledIcon : disabledIcon;

  return (
    <TouchableWithoutFeedback onPress={submitAction}>
      <View style={styles.buttonTouchable}>
        <Image
          source={icon}
          style={styles.motorcycleIcon}
          resizeMode="center"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RiderButton;
