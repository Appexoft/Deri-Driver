import React, {useMemo} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Image, View, StatusBar} from 'react-native';
import {ShippingListScreen} from '@screens';
import {useTheme} from '@hooks';
import {CustomDrawer, CornerShippingListButton} from '@components';
import styles from './styles';
import {SHIPPING_TITLE} from './ScreenNames';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const {colors} = useTheme();

  const drawerScreenOptions = (label, icon, title) => ({
    drawerLabel: label,
    headerShown: true,
    drawerIcon: () => (
      <View style={styles.imageContainer}>
        <Image source={icon} resizeMode="center" />
      </View>
    ),
    headerTitle: title,
    headerLeft: () => null,
    headerRight: CornerShippingListButton,
    drawerLabelStyle: [styles.drawerItemLabel, {color: colors.common.white}],
    drawerItemStyle: styles.drawerItem,
    drawerInactiveTintColor: colors.common.white,
    headerTintColor: colors.common.white,
    headerTitleAlign: 'left',
    headerStyle: {...styles.headerStyle, backgroundColor: colors.common.white},
    headerTitleStyle: styles.headerTitleStyle,
  });

  const drawerItems = useMemo(() => {
    return [
      {
        label: 'Mis pedidos',
        icon: require('@assets/order/order.png'),
        component: ShippingListScreen,
        title: SHIPPING_TITLE,
      },
    ];
  }, []);

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          drawerItemStyle: styles.drawerItem,
          headerShown: false,
        }}
      >
        {drawerItems.map(({label, icon, component, title}) => (
          <Drawer.Screen
            name={label}
            component={component}
            key={label}
            options={drawerScreenOptions(label, icon, title)}
          />
        ))}
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigator;
