import React, {useContext, useCallback} from 'react';
import {Text, View, Image, ScrollView, Linking} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import {UserContext} from '@store/user/state';
import {SecondaryButton} from '@components';
import {isRider} from '@utils/roles';
import {useTheme} from '@hooks';
import styles from './Profile.styles';

const profileIcon = require('@assets/profile/profile.png');
const emailIcon = require('@assets/email/email.png');
const addressIcon = require('@assets/home/home.png');
const phoneIcon = require('@assets/phone/phone.png');

const Profile = () => {
  const {colors} = useTheme();
  const {user, isLoading, getMeliAuthWebUrl, updateUserBusiness} =
    useContext(UserContext);

  const rider = isRider(user);

  const goToMeliAuthWebLink = useCallback(async () => {
    if (!isLoading) {
      const meliUrl = await getMeliAuthWebUrl();
      if (meliUrl) {
        await Linking.openURL(meliUrl);
      }
    }
  }, [getMeliAuthWebUrl, isLoading]);

  const updateShippingAutomaticHandling = useCallback(
    async value => {
      if (!isLoading) {
        await updateUserBusiness({
          shippingAutomaticHandling: value,
        });
      }
    },
    [isLoading, updateUserBusiness],
  );

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={[styles.container, {backgroundColor: colors.common.white}]}>
      <View
        style={[
          styles.baseInfoContainer,
          {backgroundColor: colors.common.white},
        ]}>
        <View style={styles.rowContainer}>
          <Image resizeMode="cover" style={styles.icon} source={profileIcon} />
          <Text style={styles.label}>Nombre: </Text>
          <Text style={styles.name} numberOfLines={1}>
            {user.name}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Image resizeMode="cover" style={styles.icon} source={addressIcon} />
          <View style={styles.wrapContainer}>
            <Text style={styles.label}>Dirección: </Text>
            <Text style={styles.value}>
              {`${user.addressStreet} ${user.addressNumber} `}
            </Text>
            <Text style={styles.value}>{user.addressFloor}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Image resizeMode="cover" style={styles.icon} source={emailIcon} />
          <Text style={styles.label}>Email: </Text>
          <Text style={styles.value} numberOfLines={1}>
            {user.email}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Image resizeMode="cover" style={styles.icon} source={phoneIcon} />
          <Text style={styles.label}>Teléfono: </Text>
          <Text style={styles.value} numberOfLines={1}>
            {user.phone}
          </Text>
        </View>
      </View>
      {user.BusinessId && user.Business && (
        <View
          style={[
            styles.businessContainer,
            {backgroundColor: colors.common.gray},
          ]}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Nombre de la Empresa: </Text>
            <Text style={styles.value} numberOfLines={1}>
              {user.Business.name}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Razon Social: </Text>
            <Text style={styles.value} numberOfLines={1}>
              {user.Business.businessName}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>RUT: </Text>
            <Text style={styles.value} numberOfLines={1}>
              {user.Business.rut}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.actionButton}>
              <SecondaryButton
                large={true}
                label="Conceder permisos en Mercado Libre"
                onPress={goToMeliAuthWebLink}
                loading={isLoading}
              />
            </View>
          </View>
          {!rider && (
            <View style={styles.rowContainer}>
              <CheckBox
                value={user?.Business?.shippingAutomaticHandling}
                tintColors={{
                  false: colors.button.main,
                  true: colors.button.main,
                }}
                onValueChange={updateShippingAutomaticHandling}
                style={styles.checkBoxStyle}
                tintColor={colors.button.main}
                onCheckColor={colors.button.main}
                onTintColor={colors.button.main}
              />
              <Text>Gestión automática de pedidos</Text>
            </View>
          )}
        </View>
      )}
      {rider && (
        <View
          style={[
            styles.businessContainer,
            {backgroundColor: colors.common.gray},
          ]}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>CI: </Text>
            <Text style={styles.value} numberOfLines={1}>
              {user.ci}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Matricula del vehículo: </Text>
            <Text style={styles.value} numberOfLines={1}>
              {user.enrollment}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Profile;
