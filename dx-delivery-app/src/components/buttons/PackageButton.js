import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {useTheme} from '@hooks';
import styles from './styles';

const PackageButton = ({packageSize, packageSelected, onPress}) => {
  const {colors} = useTheme();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.packageSize,
          {
            borderColor: colors.border.main,
            backgroundColor: colors.common.white,
          },
          packageSelected && {
            borderColor: colors.border.selected,
            borderWidth: 3,
          },
        ]}>
        <Text style={[styles.packageText, {color: colors.text.main}]}>
          {packageSize}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PackageButton;
