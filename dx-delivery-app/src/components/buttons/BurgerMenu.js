import React from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import styles from './styles';

const BurgerMenu = () => {
  const navigation = useNavigation();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <TouchableWithoutFeedback onPress={toggleDrawer}>
      <View style={styles.buttonTouchable}>
        <Image
          source={require('@assets/burger_menu/burger_menu.png')}
          style={[styles.leftTopBarButton, styles.burgerWidth]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BurgerMenu;
