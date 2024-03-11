import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '@hooks';
import styles from './styles';

const InputError = ({message = 'Campo Obligatorio'}) => {
  const {colors} = useTheme();
  return (
    <View>
      <Text style={[styles.error, {color: colors.status.error.main}]}>
        {message}
      </Text>
    </View>
  );
};

export default InputError;
