import React from 'react';
import {View, Text, Image} from 'react-native';
import Overlay from 'react-native-modal-overlay';
import MainButton from '@components/buttons/MainButton';
import styles from './styles';

const SucccesAlertDialog = ({
  message = 'La acción se ha realizado con éxito',
  visible,
  onClose,
}) => {
  return (
    <Overlay
      visible={visible}
      onClose={onClose}
      closeOnTouchOutside
      containerStyle={styles.overlay}
      childrenWrapperStyle={styles.container_overlay}
    >
      <View style={styles.container_dialog}>
        <Image
          style={styles.image_dialog}
          source={require('@assets/success/success.png')}
        />
        <Text style={styles.title_dialog}>Completado</Text>
        <Text style={styles.subtitle_dialog}>
          {typeof message === 'string'
            ? message
            : 'La acción se ha realizado con éxito'}
        </Text>
        <MainButton label="Cerrar" onPress={onClose} />
      </View>
    </Overlay>
  );
};

export default SucccesAlertDialog;
