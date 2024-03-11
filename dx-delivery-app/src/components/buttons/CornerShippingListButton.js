import React, {useContext} from 'react';
import {Image, View, TouchableWithoutFeedback} from 'react-native';
import {UserContext} from '@store/user/state';
import {isAdminOrRider} from '@utils/roles';
import {useNavigation} from '@react-navigation/native';
import {QR} from '@components/navigation/ScreenNames';
import styles from './styles';

const CornerShippingListButton = () => {
  const navigation = useNavigation();
  const {user} = useContext(UserContext);
  const userIsAdminOrRider = isAdminOrRider(user);

  const navigateToScannerScreen = () => {
    navigation.navigate(QR);
  };

  return (
    <View style={styles.rightHeaderActions}>
      {userIsAdminOrRider && (
        <TouchableWithoutFeedback onPress={navigateToScannerScreen}>
          <View style={styles.rightHeaderBtn}>
            <Image
              source={require('@assets/scanner/scanner.png')}
              style={styles.scannerButton}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
      )}
      {/* TODO: Decide if logic below is still relevant */}
      {/* {isAdminUser ? <RiderButton /> : !isRiderUser && <HandledGPButton />} */}
    </View>
  );
};

export default CornerShippingListButton;
