import React, {useMemo} from 'react';
import {ScrollView, View} from 'react-native';

import {useShippingStore} from '@hooks';
import {ORIGIN_ADDRESS_FORM} from '@components/navigation/ScreenNames';
import {InputWithIcon, TextAreaInput, MainButton} from '@components';

import styles from './Shipping.styles';
import {maxLengthOfShippingDetails} from '../../helpers/constants';

const ReceiverDetails = ({navigation, route}) => {
  const {shippingForm, setValueToAddressTypeForm} = useShippingStore();

  const isMaxLength =
    shippingForm?.receiverDetails?.details.length > maxLengthOfShippingDetails;

  const isSubmitButtonDisabled = useMemo(
    () =>
      !(
        shippingForm?.receiverDetails?.name &&
        shippingForm?.receiverDetails?.phone &&
        !isMaxLength
      ),
    [
      shippingForm?.receiverDetails?.name,
      shippingForm?.receiverDetails?.phone,
      isMaxLength,
    ],
  );

  const handlePress = () => {
    if (
      shippingForm?.receiverDetails?.name &&
      shippingForm?.receiverDetails?.phone
    ) {
      navigation.navigate(ORIGIN_ADDRESS_FORM);
    }
  };

  const handleChangeInput = (value, propName) => {
    setValueToAddressTypeForm('receiverDetails', {[propName]: value});
  };

  return (
    <View style={styles.spaceBetweenContainer}>
      <ScrollView
        style={styles.scrollSeparation}
        showsVerticalScrollIndicator={false}
      >
        <InputWithIcon
          label="Información del destinatario"
          placeholder="Ingresá el nombre del destinatario"
          icon="PROFILE"
          value={shippingForm?.receiverDetails?.name}
          onChangeText={value => handleChangeInput(value, 'name')}
          required
        />
        <InputWithIcon
          label="Teléfono"
          placeholder="Ingresá el teléfono del destinatario"
          icon="PHONE"
          type="phone"
          keyboardType="phone-pad"
          returnKeyType="next"
          onChangeText={value => handleChangeInput(value, 'phone')}
          value={shippingForm?.receiverDetails?.phone}
          required
        />
        <TextAreaInput
          focusChange
          label="Detalle"
          placeholder="Ingresá cualquier otro detalle que pueda ser de ayuda para ubicar al destinatario"
          onChange={value => handleChangeInput(value, 'details')}
          value={shippingForm?.receiverDetails?.details}
          height={160}
          isMaxLength={isMaxLength}
        />
      </ScrollView>
      <MainButton
        disabled={isSubmitButtonDisabled}
        widthSize="100%"
        label="Siguiente"
        onPress={handlePress}
        className={styles.topSeparation}
      />
    </View>
  );
};

export default ReceiverDetails;
