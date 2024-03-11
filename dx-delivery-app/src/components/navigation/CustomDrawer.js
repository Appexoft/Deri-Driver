import React, {useContext} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Image} from 'react-native';
import ProgressDialog from 'react-native-progress-dialog';
import {useTheme} from '@hooks';
import styles from './styles';
import {PROFILE} from './ScreenNames';
import {UserContext} from '@store/user/state';

const profileIcon = require('@assets/profile/profile.png');
const logoutIcon = require('@assets/logout/logout.png');

const CustomDrawer = props => {
  const {colors} = useTheme();
  const {logout, isLoading} = useContext(UserContext);

  const navigateTo = route => {
    props.navigation.navigate(route);
  };

  const Logout = () => {
    logout();
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: colors.layout.main}}
      contentContainerStyle={styles.fullSpace}>
      <View style={styles.content}>
        <ProgressDialog visible={isLoading} label="Por favor espere..." />
        <View style={styles.fullSpace}>
          <DrawerItem
            label="Perfil"
            onPress={() => navigateTo(PROFILE)}
            inactiveTintColor={colors.common.white}
            labelStyle={[styles.drawerItemLabel, {color: colors.common.white}]}
            style={[styles.drawerItem, styles.firstItem]}
            icon={() => (
              <View style={styles.imageContainer}>
                <Image source={profileIcon} resizeMode="center" />
              </View>
            )}
          />
          <DrawerItemList {...props} />
        </View>
        <DrawerItem
          label="Salir"
          onPress={Logout}
          inactiveTintColor={colors.common.white}
          labelStyle={[styles.drawerItemLabel, {color: colors.common.white}]}
          style={[styles.drawerItem, styles.lastItem]}
          icon={() => <Image source={logoutIcon} />}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
