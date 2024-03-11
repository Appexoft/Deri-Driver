import React, {useContext} from 'react';
import {View, Text, Modal, Image} from 'react-native';
import {ShippingContext} from '@store/shipping/state';
import {useNavigation} from '@react-navigation/native';
import {SecondaryButton, MainButton, CloseButton} from '@components';
import {useTheme} from '@hooks';

import styles from './ShippingDetail.styles';

const ShippingDeleteModal = () => {
  const {colors} = useTheme();
  const {showDeleteModal, handleDeleteModal, deleteShipping} =
    useContext(ShippingContext);

  const navigation = useNavigation();

  const hideDeleteModal = () => {
    handleDeleteModal();
  };

  const removeShipping = async () => {
    await deleteShipping(handleResult);
  };

  const handleResult = success => {
    if (success) {
      navigation.goBack();
    }
  };

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={showDeleteModal}>
        <View style={styles.centeredView}>
          <View
            style={[styles.modalView, {backgroundColor: colors.common.white}]}>
            <View style={styles.closeModalButton}>
              <CloseButton color="black" onPress={hideDeleteModal} />
            </View>
            <Image
              source={require('@assets/warning/warning.png')}
              style={styles.deleteIcon}
            />
            <Text style={[styles.deleteModalTitle, {color: colors.text.main}]}>
              Borrar Pedido
            </Text>
            <Text style={styles.deleteModalLabel}>
              Esta seguro que deseas borrar el pedido ?
            </Text>
            <View style={styles.row}>
              <View style={styles.modalAction}>
                <SecondaryButton
                  label="Borrar"
                  onPress={removeShipping}
                  widthSize={100}
                />
              </View>
              <View style={styles.modalAction}>
                <MainButton
                  label="Cancelar"
                  onPress={hideDeleteModal}
                  widthSize={100}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ShippingDeleteModal;
