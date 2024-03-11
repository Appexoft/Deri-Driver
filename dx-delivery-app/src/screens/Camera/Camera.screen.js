import React, {useRef, useContext, useState} from 'react';
import {ShippingContext} from '@store/shipping/state';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useTheme} from '@hooks';
import styles from './Camera.styles';

const PhotoButton = ({takePicture}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={takePicture}
      style={[styles.capture, {backgroundColor: colors.button.disabled}]}>
      <View
        style={[styles.buttonContent, {backgroundColor: colors.common.white}]}
      />
    </TouchableOpacity>
  );
};

const ConfirmOrReject = ({onConfirm, onReject}) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={onConfirm} style={styles.actionButon}>
        <Image source={require('@assets/approve/approve.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onReject} style={styles.actionButon}>
        <Image source={require('@assets/cancel/cancel.png')} />
      </TouchableOpacity>
    </View>
  );
};

const Camera = ({navigation}) => {
  const {colors} = useTheme();
  const camera = useRef();
  const [currentImage, setCurrentImage] = useState(null);
  const {asignImageToShipping, loading} = useContext(ShippingContext);

  const takePicture = async () => {
    if (camera.current) {
      const options = {quality: 0.7};
      const data = await camera.current.takePictureAsync(options);

      const uriParts = data.uri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      const splitUri = data.uri.split('/');
      const filename = splitUri[splitUri.length - 1];

      const file = {
        name: filename,
        uri:
          Platform.OS === 'android'
            ? data.uri
            : data.uri.replace('file://', ''),
        type: `image/${fileType}`,
      };

      setCurrentImage(file);
    }
  };

  const onConfirmPicture = () => {
    asignImageToShipping(currentImage);
    navigation.goBack();
  };

  const onRejectPicture = () => {
    setCurrentImage(null);
  };

  return (
    <View
      style={[styles.container, {backgroundColor: colors.layout.secondary}]}>
      {currentImage ? (
        <View style={styles.flexItem}>
          <Image source={{uri: currentImage.uri}} style={styles.flexItem} />
          <ConfirmOrReject
            onReject={onRejectPicture}
            onConfirm={onConfirmPicture}
          />
        </View>
      ) : (
        <View style={styles.flexItem}>
          <RNCamera
            ref={camera}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            captureAudio={false}
            androidCameraPermissionOptions={{
              title: 'Permisos para utilizar la camara',
              message: 'Necesitamos tu aprobación para acceder a la camara',
              buttonPositive: 'Aprobar',
              buttonNegative: 'Cancelar',
            }}>
            {loading && <ActivityIndicator size="large" />}
          </RNCamera>
          <PhotoButton takePicture={takePicture} />
        </View>
      )}
    </View>
  );
};

export default Camera;
