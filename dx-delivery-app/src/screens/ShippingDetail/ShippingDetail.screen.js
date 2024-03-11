import React, {useContext, useEffect} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {useTheme} from '@hooks';
import {
  ActionBarShippingDetail,
  ShippingDetailData,
  MainButtonOutlined,
  RiderCard,
} from '@components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RIDERS} from '../../components/navigation/ScreenNames';
import styles from './ShippingDetail.styles';
import EmptySelectedRider from '../../components/empty/EmptySelectedRider';
import {ShippingContext} from '@store/shipping/state';
import {UserContext} from '@store/user/state';
import {isAdmin} from '@utils/roles';
import {shippingState} from '@helpers/constants';

const SearchRider = ({handleGoToSearchScreen}) => {
  return (
    <View style={styles.cadet}>
      <View style={styles.noCadet}>
        <EmptySelectedRider />
        <Text style={styles.noCadet__title}>No hay un cadete asignado</Text>
        <Text style={styles.noCadet__subtitle}>
          Asigna un cadete para que el pedido sea entregado en tiempo y forma.
        </Text>
      </View>
      <View style={[styles.cadet__seachCadet]}>
        <MainButtonOutlined
          label="Buscar cadete"
          widthSize="100%"
          onPress={handleGoToSearchScreen}
          className={[{paddingVertical: 15}]}
        />
      </View>
    </View>
  );
};

const ShippingDetail = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const {shippingDetail, getShippingDetail} = useContext(ShippingContext);
  const hasRider = shippingDetail.Rider;
  const isDelivered = shippingDetail.state === shippingState.DELIVERED.value;
  const {user} = useContext(UserContext);
  const userIsAdmin = isAdmin(user);
  useEffect(() => {
    if (route?.params?.itemId) {
      getShippingDetail(route.params.itemId, route.params.isFromQR);
    }
  }, [getShippingDetail, route.params]);
  const handleGoToSearchScreen = () => {
    navigation.navigate(RIDERS, {
      editableRider: hasRider,
      shippingId: shippingDetail.id,
    });
  };

  return (
    <View style={[styles.flexContainer, styles.paddingTop10]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: colors.common.white}}
      >
        <ActionBarShippingDetail itemState={route?.params?.itemState} />
        <ShippingDetailData />
        {hasRider ? (
          <View style={styles.containerSeparation}>
            <RiderCard
              raiderName={hasRider.name}
              onPressEdit={handleGoToSearchScreen}
              editIcon={!isDelivered && userIsAdmin}
            />
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <SearchRider handleGoToSearchScreen={handleGoToSearchScreen} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ShippingDetail;
