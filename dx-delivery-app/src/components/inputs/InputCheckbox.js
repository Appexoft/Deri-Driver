import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

const checkbox = require('@assets/checkbox_input/checkbox.png');
const checkboxActive = require('@assets/checkbox_input/checkbox_active.png');

const InputCheckbox = ({value, onGetValue}) => {
  const [inputState, setInputState] = useState(value);

  const handleChangeCheckbox = () => {
    setInputState(!inputState);
    onGetValue(!inputState);
  };

  useEffect(() => {
    if (value) {
      setInputState(true);
    } else {
      setInputState(false);
    }
  }, [value]);

  return (
    <TouchableOpacity onPress={handleChangeCheckbox}>
      <View>
        <Image
          source={inputState ? checkboxActive : checkbox}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

export default InputCheckbox;
