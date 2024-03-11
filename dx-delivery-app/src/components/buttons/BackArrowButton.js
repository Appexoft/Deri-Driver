import React from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

const BackArrowButton = ({color, ...props}) => {
  const arrowIcon = {
    white: require('@assets/back_arrow_icon/back_white_arrow_icon.png'),
    blue: require('@assets/back_arrow_icon/back_blue_arrow_icon.png'),
    roundedBlack: require('@assets/back_arrow_icon/back_black_arrow_rounded_icon.png'),
  };

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  const icon = arrowIcon[color] || arrowIcon['white'];

  return (
    <TouchableWithoutFeedback onPress={goBack}>
      <View style={[styles.buttonTouchable, styles.uniqueButton]}>
        <Image source={icon} style={styles.rowImg} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BackArrowButton;
