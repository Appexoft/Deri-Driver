import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

const EmptyRider = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No hay un cadete asignado</Text>
      <Image source={require('@assets/rider/rider.png')} />
    </View>
  );
};

export default EmptyRider;
