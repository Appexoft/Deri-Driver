import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {useTheme} from '@hooks';

const ButtonStatus = ({backgroundColor = 'default', value}) => {
  const {colors} = useTheme();
  const bgColor =
    backgroundColor === 'default' ? colors.button.default : backgroundColor;

  return (
    <View style={[styles.buttonStatus, {backgroundColor: bgColor}]}>
      <Text style={styles.buttonStatus__title}>{value}</Text>
    </View>
  );
};

export default ButtonStatus;
