import React from 'react';
import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import {useTheme} from '@hooks';
import styles from './styles';

const RiderCard = ({
  onPress,
  raiderName,
  editIcon = true,
  isSelected,
  onPressEdit,
}) => {
  const {colors} = useTheme();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.container,
          styles.centeredContent,
          {
            backgroundColor: colors.common.white,
            color: colors.text.main,
            borderColor: colors.border.main,
          },
          isSelected && {borderColor: colors.common.main},
        ]}
      >
        <View style={styles.rowCenteted}>
          <View style={styles.rowCenteted}>
            <View style={styles.imageContainer}>
              <Image source={require('@assets/rider/cadete.png')} />
            </View>
            <Text style={[styles.raiderName, {color: colors.text.main}]}>
              {raiderName}
            </Text>
          </View>
          {editIcon && (
            <TouchableWithoutFeedback onPress={onPressEdit}>
              <Image source={require('@assets/edit_pencil/edit_pencil.png')} />
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RiderCard;
