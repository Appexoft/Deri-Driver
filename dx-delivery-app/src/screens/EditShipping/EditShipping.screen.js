import React, {useContext, useState, useCallback, useEffect} from 'react';
import {ScrollView, View, Linking, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {ShippingContext} from '@store/shipping/state';
import {shippingState as shippingStateValues} from '@helpers/constants';
import {useFilter} from '@hooks';
import {CAMERA} from '@components/navigation/ScreenNames';
import {
  MainButton,
  CancelButton,
  TextAreaInput,
  AddressInput,
  Photo,
  Input,
  InputError,
  ErrorAlertDialog,
  SecondaryButton,
} from '@components';
import {formatDataToSend, formatShippingData} from '@helpers/shipping';
import {isAdmin, isAdminOrRider} from '@utils/roles';
import {UserContext} from '@store/user/state';
import {useTheme} from '@hooks';
import styles from './EditShipping.styles';

const EditShipping = ({navigation, route}) => {
  const {
    listOfFilters,
    shippingUpdate,
    undeliveredReasons,
    shippingDetailImages,
    loading,
    removeImageToShipping,
    setArrayOfImages,
    shippingDetail,
    editAddressForm,
    setCurrentAddresses,
    errorRequest,
    dismissError,
  } = useContext(ShippingContext);
  const {colors} = useTheme();

  const [comment, setComment] = useState(shippingDetail.comments);
  const [undeliveredReason, setUndeliveredReason] = useState(
    shippingDetail.undeliveredReasonDetails,
  );
  const [newReceiver, setNewReceiver] = useState(false);
  const [receiver, setReceiver] = useState(shippingDetail.receiver);
  const [client, setClient] = useState(shippingDetail.client);
  const [clientDni, setClientDni] = useState(shippingDetail.clientDni);

  //Agency FORM
  const [department, setDepartment] = useState(
    shippingDetail.destinyDepartment,
  );
  const [city, setCity] = useState(shippingDetail.destinyCity);
  const [streetName, setStreetName] = useState(shippingDetail.destinyStreet);
  const [streetFloor, setStreetFloor] = useState(shippingDetail.destinyFloor);

  const [error, setError] = useState({});

  const {user} = useContext(UserContext);

  const userIsAdmin = isAdmin(user);
  const userIsAdminOrRider = isAdminOrRider(user);

  const {shippingState} = listOfFilters;

  const stateOpen = useCallback(() => {
    undeliveredReasonsFilter.setOpen(false);
  }, [undeliveredReasonsFilter]);

  const undeliveredOpen = useCallback(() => {
    stateFilter.setOpen(false);
  }, [stateFilter]);

  const stateFilter = useFilter({
    arrayOfItems: shippingState,
    label: 'Estado del envío',
    initialValue: shippingDetail.state,
    multiple: false,
    onStateOpen: stateOpen,
    disabled: !userIsAdminOrRider,
    error: error.field === 'state',
  });

  const undeliveredReasonsFilter = useFilter({
    arrayOfItems: undeliveredReasons,
    label: '¿Por que no fue entregado?',
    initialValue: shippingDetail.undeliveredReason,
    multiple: false,
    onStateOpen: undeliveredOpen,
    disabled: !userIsAdminOrRider,
    error: error.field === 'undeliveredReason',
  });

  const {SelectInputItem: StateFilter} = stateFilter;
  const {SelectInputItem: UndeliveredReasonsFilter} = undeliveredReasonsFilter;

  const saveChanges = async () => {
    if (!loading) {
      const {origin, destination} = editAddressForm;
      if (!stateFilter.value) {
        setError({
          field: 'state',
          message: 'Campo obligatorio',
        });
        return;
      }

      let currentShipping = shippingDetail;
      currentShipping.state = stateFilter.value;
      currentShipping.comments = comment;
      currentShipping.undeliveredReason = undeliveredReasonsFilter.value;
      currentShipping.undeliveredReasonDetails = undeliveredReason;
      currentShipping.client = client;
      currentShipping.clientDni = clientDni;
      currentShipping.receiver = receiver;

      if (origin.address) {
        const addressForm = formatDataToSend(origin, 'origin');
        currentShipping = {
          ...currentShipping,
          ...addressForm,
        };
      }

      if (destination.address) {
        const addressForm = formatDataToSend(destination, 'destination');
        currentShipping = {
          ...currentShipping,
          ...addressForm,
        };
      }

      if (shippingDetail.Agency) {
        if (!streetName && !shippingDetail.pickupInAgency) {
          return setError({
            field: 'streetName',
            message: 'Campo obligatorio',
          });
        }
        if (!city) {
          return setError({
            field: 'city',
            message: 'Campo obligatorio',
          });
        }
        if (!department) {
          return setError({
            field: 'department',
            message: 'Campo obligatorio',
          });
        }
        const addressForm = formatDataToSend(
          {
            streetName,
            streetFloor,
            city,
            location: shippingDetail.destinyLocation,
            department,
          },
          'destination',
        );
        currentShipping = {
          ...currentShipping,
          ...addressForm,
        };
      }

      if (isUndelivered && !undeliveredReasonsFilter.value) {
        setError({
          field: 'undeliveredReason',
          message: 'Campo obligatorio',
        });
        return;
      }

      if (isDelivered && !clientDni) {
        setError({
          field: 'dni',
          message: 'Campo obligatorio',
        });
        return;
      }

      if (newReceiver && isDelivered && !receiver) {
        setError({
          field: 'receiver',
          message: 'Campo obligatorio',
        });
        return;
      }

      const hasError = await shippingUpdate(currentShipping);
      if (!hasError) {
        navigation.goBack();
      }
    }
  };

  const cancelChanges = () => {
    navigation.goBack();
  };

  const goToCamera = () => {
    navigation.navigate(CAMERA);
  };

  const hasPictures = shippingDetailImages?.length > 0;

  const deleteImage = uri => {
    removeImageToShipping(uri);
  };

  useEffect(() => {
    const shippingImage = shippingDetail?.ShippingImages;
    if (shippingImage) {
      setArrayOfImages(shippingImage);
    }
  }, [setArrayOfImages, shippingDetail?.ShippingImages]);

  const showCurrentOrEditedOrigin = editAddressForm?.origin
    ? `${editAddressForm.origin.streetName} ${
        editAddressForm.origin.streetNumber
      } ${editAddressForm.origin.streetFloor || ''}`
    : `${shippingDetail.originStreet} ${shippingDetail.originNumber} ${
        shippingDetail.originFloor || ''
      }`;

  const showCurrentOrEditedDestiny = editAddressForm?.destination
    ? `${editAddressForm.destination.streetName} ${
        editAddressForm.destination.streetNumber
      } ${editAddressForm.destination.streetFloor || ''}`
    : `${shippingDetail.destinyStreet} ${shippingDetail.destinyNumber || ''} ${
        shippingDetail.destinyFloor || ''
      }`;

  useEffect(() => {
    const currentAddress = formatShippingData(shippingDetail);
    setCurrentAddresses(currentAddress);
    return () => {
      const clean = formatShippingData({}, true);
      setCurrentAddresses(clean);
    };
  }, [setCurrentAddresses, shippingDetail]);

  const isDelivered = stateFilter.value === shippingStateValues.DELIVERED.value;
  const isUndelivered =
    stateFilter.value === shippingStateValues.UNDELIVERED.value;

  useEffect(() => {
    setError({});
  }, [
    clientDni,
    undeliveredReasonsFilter.value,
    stateFilter.value,
    city,
    streetFloor,
    streetName,
    department,
  ]);

  const onCall = async () => {
    await Linking.openURL(`tel:${shippingDetail?.phone}`);
  };

  const isMeli = shippingDetail.type === 'MERCADO_LIBRE';

  return (
    <View style={styles.flexContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        style={{backgroundColor: colors.common.white}}>
        <StateFilter />
        <View style={styles.addressInputContainer}>
          <AddressInput
            label="Dirección de Origen"
            value={showCurrentOrEditedOrigin}
            inputContainerStyle={styles.maxHeightAddress}
          />
        </View>
        {shippingDetail.Agency ? (
          <View style={styles.agencyForm}>
            <Input
              label="Departamento de destino"
              returnKeyType="next"
              keyboardType="default"
              onChangeText={setDepartment}
              value={department}
              editable={false}
            />
            {error?.field === 'department' && <InputError />}
            <Input
              label="Ciudad de destino"
              returnKeyType="next"
              keyboardType="default"
              onChangeText={setCity}
              value={city}
              editable={false}
            />
            {error?.field === 'city' && <InputError />}
            {!shippingDetail.pickupInAgency && (
              <>
                <Input
                  label="Dirección de destino"
                  returnKeyType="next"
                  keyboardType="default"
                  onChangeText={setStreetName}
                  value={streetName}
                  editable={false}
                />
                {error?.field === 'streetName' && <InputError />}
                <Input
                  label="Apartamento/Casa de destino"
                  returnKeyType="next"
                  keyboardType="default"
                  onChangeText={setStreetFloor}
                  value={streetFloor}
                  editable={false}
                />
              </>
            )}
          </View>
        ) : (
          <View style={styles.addressInputContainer}>
            <AddressInput
              label="Dirección de Destino"
              value={showCurrentOrEditedDestiny}
              inputContainerStyle={styles.maxHeightAddress}
            />
          </View>
        )}
        {isUndelivered && (
          <>
            <UndeliveredReasonsFilter />
            <View style={styles.separation}>
              <TextAreaInput
                label="Describa por que no fue entregado"
                value={undeliveredReason}
                onChange={setUndeliveredReason}
                editable={userIsAdminOrRider}
              />
            </View>
          </>
        )}
        {isDelivered && (
          <>
            <Input
              label="Nombre del Destinatario"
              returnKeyType="next"
              keyboardType="default"
              onChangeText={setClient}
              value={client}
              editable={false}
              inputStyle={styles.inputStyle}
            />
            <View style={styles.checkboxRow}>
              <CheckBox
                value={newReceiver}
                tintColors={{
                  false: colors.button.main,
                  true: colors.button.main,
                }}
                onValueChange={setNewReceiver}
              />
              <Text>Recibe otra persona</Text>
            </View>
            {newReceiver && (
              <>
                <Input
                  label="Nombre de quien recibe"
                  returnKeyType="next"
                  keyboardType="default"
                  onChangeText={setReceiver}
                  value={receiver}
                  inputStyle={styles.inputStyle}
                />
                {error?.field === 'receiver' && <InputError />}
              </>
            )}
            <Input
              label="Cédula del destinatario"
              returnKeyType="next"
              keyboardType="default"
              onChangeText={setClientDni}
              value={clientDni}
              inputStyle={styles.inputStyle}
            />
            {error?.field === 'dni' && <InputError />}
          </>
        )}
        {!isUndelivered && (
          <View style={styles.separation}>
            <TextAreaInput
              label="Comentario"
              value={comment}
              onChange={setComment}
              editable={userIsAdmin && !isMeli && !isUndelivered}
            />
          </View>
        )}

        {hasPictures && (
          <View style={styles.photosContainer}>
            {shippingDetailImages.map(shippingImage => (
              <View style={styles.photoContainer} key={shippingImage.uri}>
                <Photo
                  uri={shippingImage.uri}
                  onDelete={() => deleteImage(shippingImage.uri)}
                  edit={
                    userIsAdmin || (userIsAdminOrRider && !shippingImage.id)
                  }
                />
              </View>
            ))}
          </View>
        )}
        {userIsAdminOrRider && (
          <View style={[styles.onlySeparation, styles.alignedRow]}>
            <SecondaryButton
              label="Llamar cliente"
              onPress={onCall}
              picture={require('@assets/call/call.png')}
              customImage={styles.rightSeparation}
            />
            <SecondaryButton
              label="Agregar foto"
              onPress={goToCamera}
              picture={require('@assets/camera/blue_camera.png')}
              customImage={styles.customImage}
            />
          </View>
        )}
        {userIsAdminOrRider && (
          <View style={styles.separation}>
            <View style={styles.separation}>
              <MainButton
                label="Guardar"
                onPress={saveChanges}
                loading={loading}
              />
            </View>
            <CancelButton label="Cancelar" onPress={cancelChanges} />
          </View>
        )}
      </ScrollView>
      <ErrorAlertDialog
        visible={errorRequest}
        onClose={dismissError}
        message="Hubo un error al guardar el pedido, por favor inténtelo más tarde"
      />
    </View>
  );
};

export default EditShipping;
