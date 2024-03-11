import React from 'react';
import {View} from 'react-native';
import {DownloadShippingButton, DeleteShippingButton} from '@components';
import styles from './ShippingDetail.styles';

const ShipppingRightActions = () => {
  return (
    <View style={styles.rightActions}>
      <DownloadShippingButton />
      <DeleteShippingButton />
    </View>
  );
};

export default ShipppingRightActions;
