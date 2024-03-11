import React from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useTheme} from '@hooks';
import styles from './styles';

const SecondaryButton = ({
  label,
  onPress,
  disable,
  large,
  loading,
  widthSize,
  picture,
  customImage,
}) => {
  const {colors} = useTheme();
  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disable}>
      <View
        style={[
          styles.mainButton,
          {
            backgroundColor: colors.common.secondary,
            color: colors.common.white,
            borderColor: colors.border.secondary,
          },
          styles.borderWidth,
          picture && styles.buttonWithPicture,
          large ? styles.largeButton : styles.normalButton,
          disable && {backgroundColor: colors.button.disabled, borderWidth: 0},
          widthSize && {width: widthSize},
        ]}
      >
        {picture && <Image source={picture} style={customImage} />}
        {loading ? (
          <ActivityIndicator color={colors.status.loading.main} />
        ) : (
          <Text
            style={[
              styles.buttonText,
              {color: colors.common.white},
              disable && {color: colors.common.white},
            ]}
          >
            {label}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SecondaryButton;
