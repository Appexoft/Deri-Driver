import React, {useState, useEffect, useRef} from 'react';
import {View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {
  MainButton,
  MainButtonOutlined,
  AddressInput,
  ErrorAlertDialog,
  BottomSheetModal,
  ShippingAdressModal,
  AddressMap,
} from '@components';
import {CREATE_SHIPPING_DETAIL} from '@components/navigation/ScreenNames';
import {formatMarker} from '@helpers/map';
import {useMap, useKeyboardAvoidingViewProps, useShippingStore} from '@hooks';
import {useStyles} from '@theme';
import {isIos} from '@helpers/platform';
import styles from './Shipping.styles';
import {useColors} from '@theme';

const OriginFormAddress = ({navigation, route, ...props}) => {
  const {
    shippingForm,
    createShippingError,
    dismissCreateShippingError,
    loading,
  } = useShippingStore();
  const theme = useStyles();
  const bottomSheetModalRef = useRef(null);
  const colors = useColors();
  const [dataFirstDropdown, setDataFirstDropdown] = useState(null);
  const [dataFirstAutocomplete, setDataFirstAutocomplete] = useState(null);
  const [dataSecondDropdown, setDataSecondDropdown] = useState(null);
  const [dataSecondAutocomplete, setDataSecondAutocomplete] = useState(null);

  const {regionData, markerData} = useMap();

  const [btnDisabled, setBtnDisabled] = useState(true);

  const [activeInput, setActiveInput] = useState(null);

  const handleSubmit = async () => {
    navigation.navigate(CREATE_SHIPPING_DETAIL);
  };

  const keyboardVerticalOffset = useKeyboardAvoidingViewProps(true);

  const handleGetDataFirstDropdown = data => {
    setDataFirstDropdown(data);
  };

  const handleGetDataFirstAutocomplete = data => {
    setDataFirstAutocomplete(data);
  };

  const handleGetDataSecondDropdown = data => {
    setDataSecondDropdown(data);
  };

  const handleGetDataSecondAutocomplete = data => {
    setDataSecondAutocomplete(data);
  };

  const handleCloseBottomSheet = () => {
    bottomSheetModalRef.current?.closeModal();
    setBtnDisabled(false);
  };

  useEffect(() => {
    if (
      dataFirstDropdown?.length &&
      dataFirstAutocomplete?.length &&
      dataSecondDropdown?.length &&
      dataSecondAutocomplete?.length
    ) {
      bottomSheetModalRef.current?.openModal();
    }
  }, [
    dataFirstDropdown,
    dataFirstAutocomplete,
    dataSecondDropdown,
    dataSecondAutocomplete,
  ]);

  return (
    <>
      <BottomSheetModal snapPoints={['30%', '55%']} ref={bottomSheetModalRef}>
        <ScrollView>
          <ShippingAdressModal
            firstPointName={dataFirstAutocomplete}
            secondPointName={dataSecondAutocomplete}
          />
          <View style={styles.sectionButtons}>
            <MainButtonOutlined
              label="Atrás"
              widthSize="100%"
              borderColor={colors.button.disabled}
              className={[styles.marginTop15, styles.buttonHeight]}
            />
            <MainButton
              label="Siguiente"
              onPress={handleCloseBottomSheet}
              loading={loading}
              widthSize="100%"
              className={[styles.marginTop16, styles.buttonHeight]}
            />
          </View>
        </ScrollView>
      </BottomSheetModal>

      <ErrorAlertDialog
        visible={!!createShippingError}
        onClose={dismissCreateShippingError}
        message={createShippingError}
      />
      <KeyboardAvoidingView {...keyboardVerticalOffset}>
        <View style={styles.addressFormContainer}>
          <View style={[styles.actionContainer, isIos && styles.zIndexNine]}>
            <View>
              <AddressInput
                activePin
                zIndex={4}
                setActiveInput={setActiveInput}
                activeInput={activeInput}
                onDataFromDropdown={handleGetDataFirstDropdown}
                onDataFromAutoComplete={handleGetDataFirstAutocomplete}
                placeholderAddress="Dirección de origen"
              />
              <AddressInput
                addressType="destination"
                zIndex={3}
                setActiveInput={setActiveInput}
                activeInput={activeInput}
                onDataFromDropdown={handleGetDataSecondDropdown}
                onDataFromAutoComplete={handleGetDataSecondAutocomplete}
                placeholderAddress="Dirección de destino"
              />
            </View>
          </View>
          <View customStyles={isIos && styles.zIndexFive}>
            <AddressMap
              regionData={regionData}
              markerData={markerData}
              originMarker={
                shippingForm.origin?.address &&
                formatMarker(shippingForm.origin, 'origin')
              }
              destinationMarker={
                shippingForm.destination?.address &&
                formatMarker(shippingForm.destination, 'destination')
              }
              loading={loading}
            />
          </View>
          <View style={styles.floatSubmit}>
            <MainButton
              label="Siguiente"
              onPress={handleSubmit}
              disabled={btnDisabled}
              loading={loading}
              widthSize="100%"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default OriginFormAddress;
