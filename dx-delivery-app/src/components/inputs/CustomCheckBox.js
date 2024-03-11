import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useColors} from '@theme';

const CustomCheckBox = ({value, onGetValue, title}) => {
  const [inputState, setInputState] = useState(value);
  const colors = useColors();

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
      <View
        style={[
          styles.customCheckBox,
          inputState ? {borderColor: colors.common.main} : {},
          {width: '100%'},
        ]}
      >
        <Text style={styles.customCheckBox__title}>{title}</Text>
        {inputState ? (
          <View style={styles.customCheckBox__true} />
        ) : (
          <View style={styles.customCheckBox__false} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomCheckBox;
