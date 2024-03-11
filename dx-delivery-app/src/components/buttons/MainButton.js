import React from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '@hooks';
import styles from './styles';

const MainButon = ({
  label,
  onPress,
  backgroundColor,
  disabled = false,
  borderRadius = false,
  picture,
  loading,
  widthSize,
  className,
  fontSize = 14,
}) => {
  const {colors} = useTheme();

  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <View
        style={[
          borderRadius ? styles.mainButtonRadius : styles.mainButton,
          {backgroundColor: backgroundColor ?? colors.button.main},
          picture && styles.buttonWithPicture,
          disabled && {backgroundColor: colors.button.disabled},
          widthSize && {width: widthSize},
          className && className,
        ]}
      >
        {picture && <Image source={picture} style={styles.imageMargin} />}
        {loading ? (
          <ActivityIndicator color={colors.common.white} />
        ) : (
          <Text
            style={[
              styles.buttonText,
              {color: colors.common.white, fontSize: fontSize},
            ]}
          >
            {label}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MainButon;
