import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from './styles';
import {maxLengthOfShippingDetails} from '../../helpers/constants';

const TextAreaInput = ({
  label,
  value,
  onChange,
  editable,
  focusChange,
  placeholder = '',
  height,
  isMaxLength = false,
}) => {
  const [active, setActive] = useState(false);

  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <View>
        <TextInput
          placeholder={placeholder}
          onBlur={() => setActive(false)}
          onFocus={() => setActive(true)}
          multiline={true}
          numberOfLines={3}
          value={value}
          onChangeText={onChange}
          allowFontScaling={false}
          style={[
            styles.textArea,
            focusChange && active
              ? styles.textAreaActive
              : styles.textAreaInactive,
            {height: height},
            isMaxLength ? styles.textAreaError : null,
          ]}
          editable={editable}
        />
      </View>
      {isMaxLength && (
        <Text style={styles.errorText}>
          El número máximo de caracteres para este campo es{' '}
          {maxLengthOfShippingDetails} caracteres.
        </Text>
      )}
    </View>
  );
};

export default TextAreaInput;
