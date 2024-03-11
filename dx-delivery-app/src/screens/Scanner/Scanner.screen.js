import React from 'react';
import {View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {SHIPPING_DETAIL} from '@components/navigation/ScreenNames';
import {useTheme} from '@hooks';
import styles from './Scanner.styles';

const Scanner = ({navigation}) => {
  const {colors} = useTheme();
  const barcodeRecognized = barcode => {
    const {gp_id /* lastmile*/, id /*MELI*/} = JSON.parse(barcode.data);
    navigation.navigate(SHIPPING_DETAIL, {
      itemId: gp_id ?? id,
      isFromQR: true,
    });
  };

  return (
    <View
      style={[styles.container, {backgroundColor: colors.layout.secondary}]}>
      <View style={styles.flexItem}>
        <QRCodeScanner
          onRead={barcodeRecognized}
          flashMode={RNCamera.Constants.FlashMode.torch}
        />
      </View>
    </View>
  );
};

export default Scanner;
