import React, {useContext} from 'react';
import {TouchableWithoutFeedback, Image} from 'react-native';
import {ShippingContext} from '@store/shipping/state';
import {UserContext} from '@store/user/state';
import {isAdmin} from '@utils/roles';
import {shippingState, shippingTypeValues} from '@helpers/constants';

import styles from './styles';

const DeleteShippingButton = () => {
  const {shippingDetail, loading, handleDeleteModal} =
    useContext(ShippingContext);
  const {user} = useContext(UserContext);
  const userIsAdmin = isAdmin(user);

  const isReadyToAssign =
    shippingDetail.state === shippingState.TO_ASSIGN.value;

  const isFromML = shippingDetail.type === shippingTypeValues.MERCADO_LIBRE;

  const showDeleteModal = () => {
    handleDeleteModal();
  };

  return (
    <>
      {!loading && !isFromML && (isReadyToAssign || userIsAdmin) && (
        <TouchableWithoutFeedback onPress={showDeleteModal}>
          <Image
            source={require('@assets/delete/delete.png')}
            style={styles.rightTopBarButton}
            resizeMode="center"
          />
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

export default DeleteShippingButton;
