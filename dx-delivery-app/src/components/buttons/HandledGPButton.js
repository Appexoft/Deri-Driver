import React, {useContext} from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
import {ShippingContext} from '@store/shipping/state';
import styles from './styles';

const enabledIcon = require('@assets/confirm/confirm.png');
const disabledIcon = require('@assets/confirm/disabled_confirm.png');

const HandledGPButton = () => {
  const {enableSelection, shippingSelected, _shippingHandledByGP} =
    useContext(ShippingContext);

  const isEnabled = enableSelection && shippingSelected.length;

  const submitAction = () => {
    if (isEnabled) {
      _shippingHandledByGP();
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

export default HandledGPButton;
