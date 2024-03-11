import React, {useContext, useCallback} from 'react';
import {Image, TouchableWithoutFeedback, Linking, View} from 'react-native';
import Config from 'react-native-config';
import {ShippingContext} from '@store/shipping/state';
import {UserContext} from '@store/user/state';
import {isAdmin} from '@utils/roles';
import styles from './styles';
import {shippingState, shippingTypeValues} from '@helpers/constants';

const DownloadShippingButton = () => {
  const {shippingDetail, loading, errorRequest} = useContext(ShippingContext);
  const {user} = useContext(UserContext);
  const userIsAdmin = isAdmin(user);

  const openPdf = useCallback(async () => {
    await Linking.openURL(
      `${Config.API_URL}/shipping/${shippingDetail.id}/pdf?token=${user.token}`,
    );
  }, [shippingDetail, user]);

  const isClose =
    shippingDetail.state === shippingState.DELIVERED.value ||
    shippingDetail.state === shippingState.UNDELIVERED.value;
  const isFromML = shippingDetail.type === shippingTypeValues.MERCADO_LIBRE;
  return (
    <>
      {!loading &&
        !errorRequest &&
        (!isClose || !isFromML) &&
        (userIsAdmin || shippingDetail.RiderId !== user.id) && (
          <TouchableWithoutFeedback onPress={openPdf}>
            <View style={styles.buttonTouchable}>
              <Image
                source={require('@assets/download/download.png')}
                style={styles.rightTopBarButton}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
    </>
  );
};

export default DownloadShippingButton;
