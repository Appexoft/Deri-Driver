import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '@hooks';
import styles from './styles';

const ShippingTag = ({label}) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.tagContainer, {backgroundColor: colors.border.main}]}>
      <Text style={[styles.tagText, {color: colors.text.main}]}>{label}</Text>
    </View>
  );
};

export default ShippingTag;
