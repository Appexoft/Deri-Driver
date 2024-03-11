import React, {useRef, useState, useContext} from 'react';
import {Image, View, TouchableWithoutFeedback, Text} from 'react-native';
import TrashIcon from '@assets/trash/trash.png';
import TrashWithoutBorderIcon from '@assets/trash/trashWithoutBorder.png';
import downloadIcon from '@assets/download/download.png';
import {
  ButtonStatus,
  BottomSheetModal,
  MainButton,
  MainButtonOutlined,
  SucccesAlertDialog,
  ErrorAlertDialog,
} from '@components';
import {shippingState} from '@helpers/constants';
import {useTheme} from '@hooks';
import styles from './styles';
import GuardarPDF from './ShippingDetailPrintData';
import CustomCheckBox from '../inputs/CustomCheckBox';
import useShippingStore from '../../hooks/useShippingStore';
import EditDeliveryStatusButton from '../buttons/EditDeliveryStatusButton';
import {useNavigation} from '@react-navigation/native';
import {DRAWER} from '../navigation/ScreenNames';
import {BottomSheetContext} from '@store/bottomSheet/state';
import {BottomSheetModalName} from '../modal/ModalNames';
import {shippingType} from '../../helpers/constants';

const ActionBarShippingDetail = ({itemState}) => {
  const {colors} = useTheme();
  const bottomSheetRef = useRef(null);
  const {
    loading,
    shippingDetail,
    apiDeleteShippingsById,
    deleteAllShippingSelectById,
    getDatesWithShippings,
  } = useShippingStore();
  const {bottomSheet, setOpenBottomSheet} = useContext(BottomSheetContext);
  const {label} = shippingState[itemState];

  const navigation = useNavigation();

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const [checkBoxValues, setCheckBoxValues] = useState([
    {title: 'No entregado', selected: true},
    {title: 'Para entregar', selected: false},
    {title: 'Entregado', selected: false},
  ]);

  const handleCheckBoxValues = index => {
    setCheckBoxValues(prevValues =>
      prevValues.map((item, idx) => {
        if (idx === index) {
          return {...item, selected: true};
        } else {
          return {...item, selected: false};
        }
      }),
    );
  };

  const handleOpenEditBottomSheet = () => {
    setOpenBottomSheet(BottomSheetModalName.EDIT);
  };

  const handleOpenDeleteBottomSheet = () => {
    setOpenBottomSheet(BottomSheetModalName.DELETE);
  };

  const handleDeleteShipping = async () => {
    const successCallback = () => {
      setOpenBottomSheet(false);
      setSuccessAlert(true);
    };

    const errorCallback = () => {
      setOpenBottomSheet(false);
      setErrorAlert(true);
    };

    await apiDeleteShippingsById(
      [shippingDetail.id],
      successCallback,
      errorCallback,
    );
    deleteAllShippingSelectById();
  };

  const handleCloseSuccessAlert = () => {
    setSuccessAlert(false);
    navigation.navigate(DRAWER);
    getDatesWithShippings();
  };

  const handleCloseErrorAlert = () => {
    setErrorAlert(false);
  };

  return (
    <View style={styles.actionBarShippingDetail}>
      <View
        style={[
          styles.actionBarShippingDetail__row,
          {width: '50%', justifyContent: 'flex-start'},
        ]}
      >
        <EditDeliveryStatusButton
          value={label}
          onPress={() => {}} // handleOpenEditBottomSheet
        />
        <View style={styles.actionBarShippingDetail__editAndUpdate_delete}>
          <TouchableWithoutFeedback onPress={handleOpenDeleteBottomSheet}>
            <Image source={TrashWithoutBorderIcon} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View
        style={[
          styles.actionBarShippingDetail__row,
          {width: '50%', justifyContent: 'flex-end'},
        ]}
      >
        <View style={{paddingRight: 8}}>
          {/* shipping type */}
          <ButtonStatus
            value={shippingType[shippingDetail?.type]}
            backgroundColor={colors.common.green}
          />
        </View>
        {/* package type */}
        <ButtonStatus
          value={shippingDetail?.packages[0]?.type?.value}
          backgroundColor={colors.common.lightRed}
        />
      </View>
      <BottomSheetModal
        open={bottomSheet === BottomSheetModalName.DELETE}
        ref={bottomSheetRef}
        onChange={index => index === 0 && setOpenBottomSheet(null)}
        snapPoints={['20%', '35%']}
      >
        <View style={styles.bottonSheetDeleteShipping}>
          <Text style={styles.bottonSheetDeleteShipping__text}>
            Seguro que desea eliminar?
          </Text>
          <MainButton
            label="Aceptar"
            onPress={() => handleDeleteShipping()}
            loading={loading}
            widthSize="100%"
            className={[styles.marginTop16, styles.buttonHeight]}
          />
          <MainButtonOutlined
            onPress={() => setOpenBottomSheet(null)}
            label="Cancelar"
            widthSize="100%"
            borderColor={colors.button.disabled}
            className={[styles.marginTop15, styles.buttonHeight]}
          />
        </View>
      </BottomSheetModal>
      <BottomSheetModal
        open={bottomSheet === BottomSheetModalName.EDIT}
        ref={bottomSheetRef}
        onChange={index => index === 0 && setOpenBottomSheet(null)}
        snapPoints={['20%', '65%']}
      >
        <View style={styles.bottomSheetEditShipping}>
          <Text style={styles.bottomSheetEditShipping__text}>
            Selecciona el estado del pedido:
          </Text>
          <View style={styles.bottomSheetEditShipping__checkboxes}>
            {checkBoxValues.map((value, index) => {
              return (
                <CustomCheckBox
                  key={index}
                  value={value.selected}
                  onGetValue={() => handleCheckBoxValues(index)}
                  title={value.title}
                />
              );
            })}
          </View>
          <View style={styles.bottomSheetEditShipping__buttons}>
            <GuardarPDF image={TrashIcon} isUnderline title="Eliminar pedido" />
            <GuardarPDF image={downloadIcon} isUnderline />
          </View>
          <MainButton
            label="Confirmar"
            fontSize={16}
            onPress={() => setOpenBottomSheet(null)}
            loading={loading}
            widthSize="100%"
            className={[styles.marginTop16, styles.buttonHeight]}
          />
        </View>
      </BottomSheetModal>
      <SucccesAlertDialog
        message="Pedido eliminado"
        visible={successAlert}
        onClose={handleCloseSuccessAlert}
      />
      <ErrorAlertDialog visible={errorAlert} onClose={handleCloseErrorAlert} />
    </View>
  );
};

export default ActionBarShippingDetail;
