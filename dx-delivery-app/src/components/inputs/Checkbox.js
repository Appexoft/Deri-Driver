import React from 'react';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const checkbox = require('@assets/checkbox/checkbox.png');
const checkboxSelected = require('@assets/checkbox/checkbox_selected.png');

const Checkbox = ({value, setValue}) => {
  const onPress = () => {
    if (setValue && typeof setValue === 'function') {
      setValue(!value);
    }
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={value ? checkboxSelected : checkbox}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default Checkbox;
