import React from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {useColors} from '@theme';

// eslint-disable-next-line react-hooks/rules-of-hooks
const colors = useColors();

const MainButonOutlined = ({
  label,
  color,
  onPress,
  disabled = false,
  borderRadius = false,
  borderColor = colors.border.secondary,
  picture,
  loading,
  widthSize,
  className,
}) => (
  <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
    <View
      style={[
        borderRadius
          ? styles.mainButtonRadiusOutlined
          : styles.mainButtonOutlined,
        borderColor && [styles.borderWidth, {borderColor}],
        {backgroundColor: colors.button.white},
        picture && styles.buttonWithPicture,
        disabled && {backgroundColor: colors.button.disabled},
        widthSize && {width: widthSize},
        className && className,
      ]}
    >
      {picture && (
        <Image
          source={picture}
          style={styles.imageMargin}
          resizeMode="contain"
        />
      )}
      {loading ? (
        <ActivityIndicator color={colors.common.white} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            color ? {color} : {color: colors.text.main},
          ]}
        >
          {label}
        </Text>
      )}
    </View>
  </TouchableWithoutFeedback>
);

export default MainButonOutlined;
