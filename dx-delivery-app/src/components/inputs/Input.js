import React from 'react';
import {TextInput, View, Text} from 'react-native';
import {useTheme} from '@hooks';
import styles from './styles';

const Input = ({
  label,
  keyboardType,
  onChangeText,
  returnKeyType,
  multiline,
  numberOfLines,
  value,
  labelStyle,
  inputStyle,
  editable,
  placeholderTextColor,
  placeholder = '',
}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.inputContainer}>
      <Text
        style={[
          styles.inputLabel,
          {color: colors.text.main},
          labelStyle && labelStyle,
        ]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.common.white,
            color: colors.text.main,
            borderColor: colors.border.main,
          },
          multiline && styles.tripleHeight,
          inputStyle && inputStyle,
        ]}
        placeholderTextColor={placeholderTextColor || colors.text.secondary}
        placeholder={placeholder}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        multiline={multiline}
        value={value}
        numberOfLines={numberOfLines}
        editable={editable}
      />
    </View>
  );
};

export default Input;
