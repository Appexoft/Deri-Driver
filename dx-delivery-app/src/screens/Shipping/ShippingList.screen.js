import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import {View, Text, Image} from 'react-native';
import {ShippingContext} from '@store/shipping/state';
import {BottomSheetContext} from '@store/bottomSheet/state';
import {
  MainButton,
  MainButtonOutlined,
  ShippingGroupList,
  ActionBar,
  AddShippingButton,
  BottomSheetModal,
  SucccesAlertDialog,
  ErrorAlertDialog,
} from '@components';
import {UserContext} from '@store/user/state';
import {isAdmin} from '@utils/roles';
import {useDebounce} from '@hooks';
import {useTheme} from '@hooks';
import styles from './Shipping.styles';
import {BottomSheetModalName} from '../../components/modal/ModalNames';

const cactus = require('@assets/cactus/cactus.png');

const ShippingList = () => {
  const {
    getDatesWithShippings,
    loading,
    shippingGroups,
    amountOfGroups,
    stateFilter,
    hasFilter,
    refreshShippingsByDate,
    apiDeleteShippingsById,
    shippingSelectedById,
    deleteAllShippingSelectById,
  } = useContext(ShippingContext);
  const {bottomSheet, setOpenBottomSheet} = useContext(BottomSheetContext);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const {user} = useContext(UserContext);
  const {colors} = useTheme();

  const isAdminUser = isAdmin(user);

  const flatListRef = useRef();
  const bottomSheetModalRef = useRef(null);

  const [term, setTerm] = useState('');
  const [page, setPage] = useState(1);

  const debouncedSearchTerm = useDebounce(term, 800);

  useEffect(() => {
    setPage(1);
    scrollToTop();
  }, [debouncedSearchTerm, scrollToTop]);

  const refresh = useCallback(() => {
    setPage(1);
    setTerm('');
    scrollToTop();
    refreshShippingsByDate();
  }, [refreshShippingsByDate, scrollToTop]);

  const onRefresh = useCallback(async () => {
    setPage(1);
    getDatesWithShippings(page, debouncedSearchTerm);
    deleteAllShippingSelectById();
  }, [
    getDatesWithShippings,
    page,
    debouncedSearchTerm,
    deleteAllShippingSelectById,
  ]);

  useEffect(() => {
    refresh();
  }, [stateFilter, refresh]);

  const scrollToTop = useCallback(() => {
    flatListRef?.current?.scrollToOffset({animated: false, offset: 0});
  }, []);

  useEffect(() => {
    getDatesWithShippings(page, debouncedSearchTerm);
  }, [getDatesWithShippings, page, debouncedSearchTerm]);

  useEffect(() => {
    deleteAllShippingSelectById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const incrementPage = useCallback(() => {
    if (shippingGroups?.length < amountOfGroups || (isAdminUser && !loading)) {
      setPage(page + 1);
    }
  }, [amountOfGroups, isAdminUser, shippingGroups?.length, loading, page]);

  const showEmptyState = !shippingGroups?.length && !loading;

  const handleDeleteShipping = async () => {
    const successCallback = () => {
      //shipping deleted
      setOpenBottomSheet(false);
      setSuccessAlert(true);
      setPage(1);
    };

    const errorCallback = () => {
      setOpenBottomSheet(false);
      setErrorAlert(true);
    };

    await apiDeleteShippingsById(
      shippingSelectedById,
      successCallback,
      errorCallback,
    );
    getDatesWithShippings(page, debouncedSearchTerm);
    deleteAllShippingSelectById();
  };

  const handleCloseSuccessAlert = () => {
    setSuccessAlert(false);
  };

  const handleCloseErrorAlert = () => {
    setErrorAlert(false);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.common.white},
        styles.positionRelative,
      ]}
    >
      <AddShippingButton />
      <ActionBar />
      <View
        style={[
          styles.listContainer,
          isAdminUser && styles.removePaddingHorizontal,
        ]}
      >
        {showEmptyState && (
          <View>
            <Image style={styles.image_cactus} source={cactus} />
            <Text style={[styles.text_empty_state, {color: colors.text.main}]}>
              {hasFilter()
                ? 'No se encontraron pedidos'
                : 'Ya puedes comenzar a gestionar tus pedidos'}
            </Text>
            <MainButton
              label="Actualizar"
              onPress={onRefresh}
              loading={loading}
            />
          </View>
        )}
        <View style={styles.flexContainer}>
          {!showEmptyState && (
            <ShippingGroupList
              data={shippingGroups}
              onRefresh={onRefresh}
              loading={loading}
              incrementPage={incrementPage}
            />
          )}
          <BottomSheetModal
            open={bottomSheet === BottomSheetModalName.DELETE_IN_LIST}
            ref={bottomSheetModalRef}
            onChange={index => index === -1 && setOpenBottomSheet(false)}
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
                onPress={() => setOpenBottomSheet(false)}
                label="Cancelar"
                widthSize="100%"
                borderColor={colors.button.disabled}
                className={[styles.marginTop15, styles.buttonHeight]}
              />
            </View>
          </BottomSheetModal>
          <SucccesAlertDialog
            message="Pedido eliminado"
            visible={successAlert}
            onClose={handleCloseSuccessAlert}
          />
          <ErrorAlertDialog
            visible={errorAlert}
            onClose={handleCloseErrorAlert}
          />
        </View>
      </View>
    </View>
  );
};

export default ShippingList;
