import React, {useContext, useEffect, useCallback, useState} from 'react';
import {View, ActivityIndicator, FlatList, Text} from 'react-native';

import {RiderContext} from '@store/rider/state';
import {ShippingContext} from '@store/shipping/state';
import {UserContext} from '@store/user/state';
import {RiderCard, MainButton} from '@components';
import {isAdmin} from '@utils/roles';
import {useTheme} from '@hooks';
import styles from './Riders.styles';

const Riders = ({navigation, route}) => {
  const {colors} = useTheme();
  const editableRider = route?.params?.editableRider;
  const {listOfRiders, loading, getListOfRiders, query} =
    useContext(RiderContext);
  const {user} = useContext(UserContext);
  const userIsAdmin = isAdmin(user);

  const {
    asignRider,
    enableSelection,
    _asignRiderToShippings,
    getDatesWithShippings,
    loading: loadingShipping,
    openedZone,
    getShippingsByClientAndDate,
  } = useContext(ShippingContext);
  const isMultipleShipping = enableSelection;
  const [selectedRider, setSelectedRider] = useState(editableRider);

  useEffect(() => {
    getListOfRiders();
  }, [getListOfRiders]);

  const selectRider = useCallback(rider => {
    setSelectedRider(rider);
  }, []);

  const RenderDeliveryItem = useCallback(
    ({item}) => {
      const isSelected =
        (item.id === editableRider?.id && !selectedRider) ||
        item.id === selectedRider?.id;

      return (
        <RiderCard
          raiderName={item?.name}
          onPress={() => selectRider(item)}
          editIcon={false}
          isSelected={isSelected}
        />
      );
    },
    [editableRider, selectRider, selectedRider],
  );

  const saveShipping = async () => {
    if (isMultipleShipping) {
      await _asignRiderToShippings(selectedRider.id);
      if (userIsAdmin) {
        await getShippingsByClientAndDate(openedZone, '', 1);
      } else {
        await getDatesWithShippings(1, '');
      }
    } else {
      await asignRider(route?.params?.shippingId, selectedRider.id);
    }

    return navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.common.white}]}>
      <Text style={styles.title}>Selecciona un cadete</Text>
      {/* <View
        style={[
          styles.searchInputContainer,
          {backgroundColor: colors.common.white},
        ]}
      >
        <SearchInput value={query} label="Buscar cadete" onChange={setQuery} />
      </View> */}
      <FlatList
        data={listOfRiders.filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase()),
        )}
        renderItem={RenderDeliveryItem}
      />
      <MainButton
        label="Aceptar"
        fontSize={16}
        onPress={saveShipping}
        loading={loadingShipping}
        widthSize="100%"
        disabled={!selectedRider || loadingShipping}
        className={styles.mainButton}
      />
    </View>
  );
};

export default Riders;
