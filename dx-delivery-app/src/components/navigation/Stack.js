import React from 'react';
import {useContext} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, StyleSheet} from 'react-native';
import {BottomSheetContext} from '@store/bottomSheet/state';
import {
  HomeScreen,
  ProfileScreen,
  FilterScreen,
  ShippingTypeScreen,
  OriginFormAddress,
  AddressMapScreen,
  ShippingDetail,
  RidersScreen,
  EditShipping,
  CameraScreen,
  SignupScreen,
  ScannerScreen,
  UserAddress,
  ShippingMethod,
  Packages,
  ReceiverDetails,
  CreateShippingDetail,
  ShippingListScreen,
  Result,
  DestinationFormAddress,
} from '@screens';
import {CloseButton, BackArrowButton as BackWhiteButton} from '@components';

import DrawerNavigator from './Drawer';
import {UserContext} from '@store/user/state';
import {
  HOME,
  DRAWER,
  PROFILE,
  MAINSTACK,
  FILTER,
  CAMERA,
  PROFILE_TITLE,
  FILTER_TITLE,
  SHIPPING_TYPE,
  SHIPPING_TYPE_TITLE,
  ORIGIN_ADDRESS_FORM,
  SHIPPING_FORM_TITLE,
  ADDRESS_MAP,
  SHIPPING_DETAIL,
  SHIPPING_DETAIL_TITLE,
  RIDERS,
  EDIT_SHIPPING,
  EDIT_SHIPPING_TITLE,
  SIGN_UP,
  SIGN_UP_TITLE,
  QR,
  USER_ADDRESS,
  SHIPPING_METHOD,
  SHIPPING_METHOD_TITLE,
  SHIPPING_PACKAGES,
  SHIPPING_PACKAGES_TITLE,
  SHIPPING_RECEIVER_DETAILS,
  SHIPPING_RECEIVER_DETAILS_TITLE,
  CREATE_SHIPPING_DETAIL_TITLE,
  CREATE_SHIPPING_DETAIL,
  RESULT,
  DESTINATION_ADDRESS_FORM,
  SHIPPING_TITLE,
} from './ScreenNames';

import {useColors} from '../../theme';
import styles from './styles';

// eslint-disable-next-line react-hooks/rules-of-hooks
const colors = useColors();

const CustomTitle = () => (
  <View style={styles.textRow}>
    <Text
      style={[
        styles.appTitle,
        styles.marginRight,
        {color: colors.common.white},
      ]}
    >
      Dx
    </Text>
    <Text style={[styles.appTitle, {color: colors.button.main}]}>Delivery</Text>
  </View>
);

const Stack = createStackNavigator();
const MainStack = createStackNavigator();

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: styles.whisper,
  },
};

const baseHeader = {
  headerTitleAlign: 'center',
  headerTitleStyle: styles.headerTitleStyle,
};

const modalScreenOptions = ({headerTitle, leftButton}) => ({
  ...baseHeader,
  headerTintColor: colors.common.white,
  headerStyle: [styles.headerStyle, {backgroundColor: colors.layout.main}],
  headerLeft: leftButton,
  headerTitle,
});

const screenOption = (headerTitle, headerRight) => ({
  ...baseHeader,
  headerTintColor: colors.common.white,
  headerStyle: [styles.bigHeader, {backgroundColor: colors.layout.main}],
  headerBackTitleVisible: false,
  headerTitle,
  headerRight,
});

const CloseBlackButton = onPress => (
  <CloseButton color="black" onPress={onPress} />
);
const BackBlueButton = () => <BackWhiteButton color="blue" />;
const BackRoundedButton = () => <BackWhiteButton color="roundedBlack" />;

const modalWithWhiteHeader = ({headerTitle, leftButton, customStyles}) => ({
  ...baseHeader,
  headerTintColor: colors.layout.secondary,
  headerStyle: [
    styles.headerStyle,
    {backgroundColor: colors.common.white},
    styles && customStyles,
  ],
  headerLeft: leftButton,
  headerBackTitleVisible: false,
  headerTitle,
});

const MainStackScreen = () => (
  <MainStack.Navigator>
    <Stack.Screen
      name={DRAWER}
      component={DrawerNavigator}
      options={{headerShown: false}}
    />
    <Stack.Screen name={HOME} component={HomeScreen} options={{title: HOME}} />
    <Stack.Screen
      name={RIDERS}
      component={RidersScreen}
      options={screenOption(SHIPPING_DETAIL_TITLE)}
    />
    <Stack.Screen
      name={RESULT}
      component={Result}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={SHIPPING_TITLE}
      component={ShippingListScreen}
      options={{headerShown: false}}
    />
  </MainStack.Navigator>
);

const StackNavigation = () => {
  const {isAuthenticating, profileCompleted, logout} = useContext(UserContext);
  const {bottomSheet} = useContext(BottomSheetContext);
  return (
    <NavigationContainer theme={appTheme} onReady={() => SplashScreen.hide()}>
      {!isAuthenticating ? (
        // No token found, user isn't signed in
        <Stack.Navigator mode="modal">
          <Stack.Screen
            name={HOME}
            component={HomeScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator mode="modal">
          {profileCompleted ? (
            <>
              <Stack.Screen
                name={MAINSTACK}
                component={MainStackScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={PROFILE}
                component={ProfileScreen}
                options={modalScreenOptions({
                  headerTitle: PROFILE_TITLE,
                  leftButton: CloseButton,
                })}
              />
              <Stack.Screen
                name={EDIT_SHIPPING}
                component={EditShipping}
                options={modalWithWhiteHeader({
                  headerTitle: EDIT_SHIPPING_TITLE,
                  leftButton: CloseBlackButton,
                })}
              />
              <Stack.Screen
                name={FILTER}
                component={FilterScreen}
                options={modalWithWhiteHeader({
                  headerTitle: FILTER_TITLE,
                  leftButton: CloseBlackButton,
                })}
              />
              <Stack.Screen
                name={SHIPPING_TYPE}
                component={ShippingTypeScreen}
                options={modalWithWhiteHeader({
                  headerTitle: SHIPPING_TYPE_TITLE,
                  leftButton: BackBlueButton,
                })}
              />
              <Stack.Screen
                name={ORIGIN_ADDRESS_FORM}
                component={OriginFormAddress}
                options={modalWithWhiteHeader({
                  headerTitle: SHIPPING_FORM_TITLE,
                  leftButton: BackRoundedButton,
                })}
              />
              <Stack.Screen
                name={DESTINATION_ADDRESS_FORM}
                component={DestinationFormAddress}
                options={modalScreenOptions({
                  headerTitle: SHIPPING_FORM_TITLE,
                  leftButton: BackWhiteButton,
                })}
              />
              <Stack.Screen
                name={SHIPPING_METHOD}
                component={ShippingMethod}
                options={modalWithWhiteHeader({
                  headerTitle: SHIPPING_METHOD_TITLE,
                  leftButton: BackBlueButton,
                })}
              />
              <Stack.Screen
                name={SHIPPING_PACKAGES}
                component={Packages}
                options={modalScreenOptions({
                  headerTitle: SHIPPING_PACKAGES_TITLE,
                  leftButton: BackWhiteButton,
                })}
              />
              <Stack.Screen
                name={SHIPPING_RECEIVER_DETAILS}
                component={ReceiverDetails}
                options={modalWithWhiteHeader({
                  headerTitle: SHIPPING_RECEIVER_DETAILS_TITLE,
                  leftButton: BackRoundedButton,
                })}
              />
              <Stack.Screen
                name={SHIPPING_DETAIL}
                component={ShippingDetail}
                options={modalWithWhiteHeader({
                  headerTitle: SHIPPING_DETAIL_TITLE,
                  leftButton: BackRoundedButton,
                })}
              />
              <Stack.Screen
                name={RIDERS}
                component={RidersScreen}
                options={modalWithWhiteHeader({
                  headerTitle: SHIPPING_DETAIL_TITLE,
                  leftButton: BackRoundedButton,
                })}
              />
              <Stack.Screen
                name={CREATE_SHIPPING_DETAIL}
                component={CreateShippingDetail}
                options={modalWithWhiteHeader({
                  headerTitle: CREATE_SHIPPING_DETAIL_TITLE,
                  leftButton: BackRoundedButton,
                })}
              />
              <Stack.Screen
                name={ADDRESS_MAP}
                component={AddressMapScreen}
                options={modalScreenOptions({
                  leftButton: BackWhiteButton,
                })}
              />
              <Stack.Screen
                name={CAMERA}
                component={CameraScreen}
                options={modalWithWhiteHeader({
                  headerTitle: '',
                  leftButton: CloseBlackButton,
                  customStyles: {backgroundColor: colors.layout.secondary},
                })}
              />
              <Stack.Screen
                name={QR}
                component={ScannerScreen}
                options={modalWithWhiteHeader({
                  headerTitle: '',
                  leftButton: CloseBlackButton,
                  customStyles: {backgroundColor: colors.layout.secondary},
                })}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name={SIGN_UP}
                component={SignupScreen}
                options={modalWithWhiteHeader({
                  headerTitle: SIGN_UP_TITLE,
                  leftButton: () => CloseBlackButton(logout),
                })}
              />
              <Stack.Screen
                name={USER_ADDRESS}
                component={UserAddress}
                options={screenOption(CustomTitle)}
              />
            </>
          )}
        </Stack.Navigator>
      )}
      {bottomSheet && <View style={styleDimming.dimming} />}
    </NavigationContainer>
  );
};

export default StackNavigation;

const styleDimming = StyleSheet.create({
  dimming: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.22)',
  },
});
