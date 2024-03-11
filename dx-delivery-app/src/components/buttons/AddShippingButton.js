import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {SHIPPING_RECEIVER_DETAILS} from '../navigation/ScreenNames';

const addIcon = require('@assets/add/add_circle.png');

const AddShippingButton = () => {
  const navigation = useNavigation();
  const openNewOrder = () => {
    navigation.navigate(SHIPPING_RECEIVER_DETAILS);
  };

  return (
    <TouchableOpacity style={styles.positionRelative} onPress={openNewOrder}>
      <View
        style={[
          styles.buttonTouchable,
          styles.buttonShadow,
          styles.positionRelative,
        ]}
        onPress={openNewOrder}
      >
        <Image source={addIcon} />
      </View>
    </TouchableOpacity>
  );
};

export default AddShippingButton;
