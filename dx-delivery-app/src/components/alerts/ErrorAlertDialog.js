import React from 'react';
import {View, Text, Image} from 'react-native';
import Overlay from 'react-native-modal-overlay';
import styles from './styles';
import MainButton from '@components/buttons/MainButton';
import {useTheme} from '@hooks';

const ErrorAlertDialog = ({
  message = 'Parece que hubo un error',
  visible,
  onClose,
}) => {
  const {colors} = useTheme();
  return (
    <Overlay
      visible={visible}
      onClose={onClose}
      closeOnTouchOutside
      containerStyle={{backgroundColor: colors.layout.overlay}}
      childrenWrapperStyle={styles.container_overlay}>
      <View style={styles.container_dialog}>
        <Image
          style={styles.image_dialog}
          source={require('@assets/error/error.png')}
        />
        <Text style={styles.title_dialog}>¡Oh no!</Text>
        <Text style={styles.subtitle_dialog}>
          {typeof message === 'string' ? message : 'Parece que hubo un error'}
        </Text>
        <MainButton label="Regresar" onPress={onClose} />
      </View>
    </Overlay>
  );
};

export default ErrorAlertDialog;
