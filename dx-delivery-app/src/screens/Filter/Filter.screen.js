import React, {useCallback, useContext} from 'react';
import {Platform, ScrollView, View} from 'react-native';
import {ShippingContext} from '@store/shipping/state';
import {useFilter} from '@hooks';
import {MainButton, CancelButton} from '@components';
import {isAdmin} from '@utils/roles';
import {UserContext} from '@store/user/state';
import {useTheme} from '@hooks';
import styles from './Filter.styles';

const Filter = ({navigation, route}) => {
  const {colors} = useTheme();
  const isIOS = Platform.OS === 'ios';
  const {setFilters, filter, listOfFilters} = useContext(ShippingContext);
  const {deliveryZone, business, shippingState, shippingType} = listOfFilters;
  const {user} = useContext(UserContext);

  const userIsAdmin = isAdmin(user);

  //Library rule: All other pickers should be closed when another picker opens.
  const onZoneFilterOpen = useCallback(() => {
    typeFilter.setOpen(false);
    clientFilter.setOpen(false);
    stateFilter.setOpen(false);
  }, [clientFilter, stateFilter, typeFilter]);

  const onTypeFilterOpen = useCallback(() => {
    clientFilter.setOpen(false);
    stateFilter.setOpen(false);
    zoneFilter.setOpen(false);
  }, [clientFilter, stateFilter, zoneFilter]);

  const onClientFilterOpen = useCallback(() => {
    zoneFilter.setOpen(false);
    stateFilter.setOpen(false);
    typeFilter.setOpen(false);
  }, [stateFilter, typeFilter, zoneFilter]);

  const onStateFilterOpen = useCallback(() => {
    clientFilter.setOpen(false);
    zoneFilter.setOpen(false);
    typeFilter.setOpen(false);
  }, [clientFilter, typeFilter, zoneFilter]);

  const zoneFilter = useFilter({
    arrayOfItems: deliveryZone,
    onStateOpen: onZoneFilterOpen,
    label: 'Zonas',
    initialValue: filter.zone || [],
  });

  const clientFilter = useFilter({
    arrayOfItems: business,
    onStateOpen: onClientFilterOpen,
    label: 'Empresas',
    initialValue: filter.client || [],
  });

  const typeFilter = useFilter({
    arrayOfItems: shippingType,
    onStateOpen: onTypeFilterOpen,
    label: 'Tipo de envíos',
    initialValue: filter.type || [],
  });

  const stateFilter = useFilter({
    arrayOfItems: shippingState,
    onStateOpen: onStateFilterOpen,
    label: 'Estado del envío',
    initialValue: filter.state || [],
  });

  const {SelectInputItem: TypeFilter} = typeFilter;
  const {SelectInputItem: StateFilter} = stateFilter;
  const {SelectInputItem: ZoneFilter} = zoneFilter;
  const {SelectInputItem: ClientFilter} = clientFilter;

  const closeModal = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const submitFilter = useCallback(() => {
    const zone = zoneFilter.value;
    const type = typeFilter.value;
    const client = clientFilter.value;
    const state = stateFilter.value;

    setFilters({
      filter: {
        zone,
        type,
        client,
        state,
      },
    });

    navigation.goBack();
  }, [
    zoneFilter.value,
    typeFilter.value,
    clientFilter.value,
    stateFilter.value,
    setFilters,
    navigation,
  ]);

  return (
    <View style={[styles.container, {backgroundColor: colors.common.white}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View>
          {userIsAdmin && (
            <>
              <ZoneFilter />
              <ClientFilter />
            </>
          )}
          <TypeFilter />
          <StateFilter />
        </View>
        <View style={isIOS && styles.hiddingButton}>
          <View style={styles.separation}>
            <MainButton label="Filtrar" onPress={submitFilter} />
          </View>
          <CancelButton label="Cancelar" onPress={closeModal} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Filter;
