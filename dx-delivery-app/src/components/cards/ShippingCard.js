import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import {shippingState, shippingIconTypes} from '@helpers/constants';
import {FilterOptions} from '@components';
import {useTheme, useShippingStore, useDebounce} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {SHIPPING_DETAIL} from '../navigation/ScreenNames';
import styles from './styles';

const Icon = ({type}) => {
  const {icons} = useTheme();

  const iconName = icons[shippingIconTypes[type] || shippingIconTypes.COMMON];

  return <Image style={styles.icon} source={{uri: iconName}} />;
};

const ShippingCard = ({item, isMl, isPickup}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {apiUpdateShippingState, getDatesWithShippings, setShippingDetail} =
    useShippingStore();
  const {label, backgroundColor, color} = shippingState[item.state];
  const [openTooltip, setOpenTooltip] = useState(false);

  const debouncedSearchTerm = useDebounce('', 800);

  const handleTooltipOptions = () => {
    setOpenTooltip(!openTooltip);
  };

  const handleCloseTooltip = () => {
    setOpenTooltip(false);
  };

  const handleGetValueFromTooltip = value => {
    const successCallback = data => {
      setOpenTooltip(false);
      getDatesWithShippings(1, debouncedSearchTerm);
    };

    const errorCallback = () => {
      setOpenTooltip(false);
    };

    apiUpdateShippingState(value, item.id, successCallback, errorCallback);
  };

  const handleGoToShippingDetailScreen = () => {
    setShippingDetail(item);
    navigation.navigate(SHIPPING_DETAIL, {
      itemId: item.id,
      itemState: item.state,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleGoToShippingDetailScreen}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.common.white,
            color: colors.text.main,
            borderColor: colors.border.main,
          },
          styles.shippingCardContainer,
        ]}
      >
        <View style={styles.iconWrapper}>
          <Icon type={item.type} />
        </View>

        <View style={styles.flex}>
          <View>
            <View style={[styles.row, styles.stateRow]}>
              <Text style={styles.secondaryLabel}>Pedido {item.number}</Text>
              <View>
                <View style={[styles.orderState, {backgroundColor}]}>
                  <TouchableWithoutFeedback onPress={handleTooltipOptions}>
                    <Text style={[styles.orderStateText, {color}]}>
                      {label}
                    </Text>
                  </TouchableWithoutFeedback>
                  <FilterOptions
                    options={Object.values(shippingState)}
                    open={openTooltip}
                    onClose={handleCloseTooltip}
                    onOptionSelected={handleGetValueFromTooltip}
                  />
                </View>
                {isMl && (
                  <View
                    style={[
                      styles.orderState,
                      styles.mlStatus,
                      {color: colors.card.meli},
                    ]}
                  >
                    <Text
                      style={[styles.orderStateText, {color: colors.text.main}]}
                    >
                      {'Mercado Libre'}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View>
            <Text numberOfLines={3}>
              <Text style={styles.secondaryLabel}>Origen: </Text>
              <Text style={styles.direction}>
                {item.originStreet} {item.originNumber}
              </Text>
            </Text>
            {!isPickup && (
              <Text numberOfLines={3}>
                <Text style={styles.secondaryLabel}>Destino: </Text>
                <Text style={styles.direction}>
                  {item.pickupInAgency ? (
                    <>
                      {item.destinyDepartment} {item.destinyCity}
                    </>
                  ) : (
                    <>
                      {item.destinyStreet} {item.destinyNumber}
                    </>
                  )}
                </Text>
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ShippingCard;
