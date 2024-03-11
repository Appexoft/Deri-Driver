import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import styles from './styles';

import iconRadioActivate from '@assets/ring/Ring.png';

const InputRadio = ({
  label,
  description,
  value = {
    value: null,
    description: null,
    id: null,
    activate: false,
  },
  onChange,
}) => {
  const renderIconRadioDefault = () => {
    return <View style={styles.radioButton__circle} />;
  };

  const handleRadioButton = () => {
    onChange(value);
  };

  return (
    <TouchableWithoutFeedback onPress={handleRadioButton}>
      <View style={styles.inputRadioButton}>
        <View styles={styles.dataInputRadioButton}>
          <Text style={styles.dataInputRadioButton__label}>{label}</Text>
          {description && (
            <Text style={styles.dataInputRadioButton__description}>
              {description}
            </Text>
          )}
        </View>
        <View style={styles.ring}>
          {value.activate ? (
            <Image source={iconRadioActivate} resizeMode="contain" />
          ) : (
            renderIconRadioDefault()
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InputRadio;
