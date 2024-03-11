import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

const ErrorAlert = ({
  title = '¡Oh no!',
  description = 'Parece que hubo un error, inténtelo de nuevo más tarde',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={require('@assets/error/error.png')} />
      <Text style={styles.subtitle}>{description}</Text>
    </View>
  );
};

export default ErrorAlert;
