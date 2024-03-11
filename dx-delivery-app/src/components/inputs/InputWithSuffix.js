import React, {useState, useEffect, useMemo} from 'react';
import {TextInput, View, Text} from 'react-native';
import {useStyles} from '@theme';
import styles from './styles';

const InputWithSuffix = ({
  label = '',
  suffix = ' ',
  keyboardType = 'default',
  onChangeText,
  returnKeyType = 'next',
  numberOfLines = 1,
  value,
  placeholder = '',
  required,
  parentMounted,
}) => {
  const theme = useStyles();
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(false);

  const hasLabel = useMemo(() => label.length > 1, [label]);

  useEffect(() => {
    if (required && !value && !isActive && parentMounted) {
      setError(true);
    } else if (error && value && !isActive) {
      setError(false);
    }
  }, [value, required, isActive, error, parentMounted]);

  return (
    <View style={[styles.inputContainer, theme.flex]}>
      <Text style={styles.inputLabelWithIcon}>
        {required && hasLabel ? `${label} *` : hasLabel ? label : ' '}
      </Text>
      <View
        style={[
          styles.inputWithIcon,
          isActive
            ? styles.inputWithIconActive
            : error
            ? styles.inputWithIconError
            : styles.inputWithIconInactive,
        ]}
      >
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onBlur={() => setIsActive(false)}
          onFocus={() => setIsActive(true)}
          style={styles.inputWithIconText}
          underlineColorAndroid="transparent"
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          numberOfLines={numberOfLines}
        />
        <Text style={styles.inputSuffix}>{suffix}</Text>
      </View>
    </View>
  );
};

export default InputWithSuffix;
