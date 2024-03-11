import React, {useState} from 'react';
import {View, Image, Text, TouchableWithoutFeedback} from 'react-native';
import styles from './styles';

import iconRing from '@assets/ring/Ring.png';

const InputPackageFragile = ({label, onChange}) => {
  const [optionSelected, setOptionSelected] = useState(false);

  const handlePressRadioButton = () => {
    setOptionSelected(!optionSelected);
    onChange(!optionSelected);
  };

  return (
    <View style={styles.radioButtonSection}>
      <TouchableWithoutFeedback onPress={handlePressRadioButton}>
        <View style={styles.radioButton}>
          {optionSelected ? (
            <Image source={iconRing} resizeMode="contain" />
          ) : (
            <View style={styles.radioButton__circle} />
          )}
          <Text style={styles.radioButton__title}>{label}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default InputPackageFragile;
