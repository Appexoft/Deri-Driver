import React from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

const CloseButton = ({color, onPress}) => {
  const icon = {
    white: require('@assets/close/white_close.png'),
    black: require('@assets/close/black_close.png'),
  };

  const navigation = useNavigation();

  const closeModal = () => {
    if (onPress) {
      onPress();
      return;
    }
    navigation.goBack();
  };

  const selectedIcon = icon[color] || icon['white'];

  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <View style={styles.buttonTouchable}>
        <Image source={selectedIcon} style={styles.leftTopBarButton} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CloseButton;
