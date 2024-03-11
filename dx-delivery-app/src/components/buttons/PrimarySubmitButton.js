import React from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '@hooks';
import styles from './styles';

const PrimarySubmitButton = ({
  label,
  onPress,
  disabled = false,
  loading,
  widthSize = '100%',
  inputContainer,
}) => {
  const {colors} = useTheme();
  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.primarySubmitButton,
          disabled && styles.primarySubmitButtonDisabled,
          inputContainer,
          {width: widthSize},
        ]}
      >
        {loading ? (
          <ActivityIndicator color={colors.common.white} />
        ) : (
          <Text style={styles.buttonText}>{label}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PrimarySubmitButton;
