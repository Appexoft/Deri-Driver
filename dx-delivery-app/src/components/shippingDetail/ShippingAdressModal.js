import React, {Fragment} from 'react';
import {View, Image, Text} from 'react-native';
import styles from './styles';

const locationIcon = require('@assets/location/location.png');
const clockIcon = require('@assets/clock/clock.png');
const routingIcon = require('@assets/routing/routing.png');
const iconInfoCircle = require('@assets/info_circle/info-circle.png');

const ShippingAdressModal = ({
  firstPointName,
  secondPointName,
  error = false,
}) => {
  return (
    <View style={styles.bottomSheetModal}>
      <Image source={locationIcon} />
      <Text style={styles.bottomSheetModal__title}>{firstPointName}</Text>
      <Text style={styles.bottomSheetModal__address}>{secondPointName}</Text>
      {error ? (
        <View style={styles.error}>
          <View style={styles.error__icon}>
            <Image source={iconInfoCircle} resizeMode="center" />
          </View>
          <View style={styles.error__text}>
            <Text style={styles.error__text__normal}>
              No podemos llegar a tu dirección, sin embargo, te ofrecemos
              recoger tu pedido en la siguiente sede cercana a vos:
            </Text>
            <View style={styles.error__text__marginTop10}>
              <Text style={styles.error__text__bold}>Vitarro Delivery</Text>
              <Text style={styles.error__text__normal}>
                GM69+26G 27000 Rocha, Departamento de Rocha, Uruguay
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Fragment>
          <View style={styles.timeAndDistance}>
            <View style={styles.timeAndDistance__timer}>
              <Image source={clockIcon} />
              <Text style={styles.timeAndDistance__timer__clock}>
                09:00AM - 5:00PM
              </Text>
            </View>
            <View style={styles.timeAndDistance__timer}>
              <Image source={routingIcon} />
              <Text style={styles.timeAndDistance__timer__clock}>
                A 4.5 KM de ti
              </Text>
            </View>
          </View>
          <View style={styles.contact}>
            <Text style={styles.contact__phone}>+5982506250</Text>
          </View>
        </Fragment>
      )}
    </View>
  );
};

export default ShippingAdressModal;
