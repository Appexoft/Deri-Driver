import React from 'react';
import {TouchableWithoutFeedback, Text, View} from 'react-native';
import {useTheme} from '@hooks';
import styles from './styles';

const CancelButton = ({label, onPress}) => {
  const {colors} = useTheme();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.cancelButton}>
        <Text style={[styles.buttonText, {color: colors.button.main}]}>
          {label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CancelButton;
