import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const ShippingDetailPrice = ({data}) => {
  return (
    <View>
      <Text style={styles.shippingDetailPrice__title}>Precio del envío</Text>
      <Text style={styles.shippingDetailPrice__price}>{`$${data}`}</Text>
    </View>
  );
};

export default ShippingDetailPrice;
