import React, {useContext, useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import profileIcon from '@assets/profile/profile_blue.png';
import locationIcon from '@assets/location_pin/location_pin_outlined.png';
import packageIcon from '@assets/package/package_blue.png';
import {ShippingDetailPrice, ShippingDetailComment} from '@components';
import {ShippingContext} from '@store/shipping/state';
import styles from './styles';
import downloadIcon from './../../../assets/download/download.png';
import GuardarPDF from './ShippingDetailPrintData';

const ShippingDetailDataCard = ({
  icon,
  data = {value1: 'Data2', value2: 'Data3'},
  title,
}) => {
  return (
    <View style={styles.shippingDetailData}>
      <View style={styles.shippingDetailData__image}>
        <Image source={icon} />
      </View>
      <View style={styles.shippingDetailData__data}>
        <View>
          <Text style={styles.shippingDetailData__data__title}>{title}</Text>
        </View>
        <Text style={styles.shippingDetailData__data__data}>
          {data?.value1}
        </Text>
        <Text style={styles.shippingDetailData__data__data}>
          {data?.value2}
        </Text>
      </View>
    </View>
  );
};

const ShippingDetailData = () => {
  const {shippingDetail} = useContext(ShippingContext);
  const [dataClient, setDataClient] = useState(null);
  const [dataFromShipping, setDataFromShipping] = useState(null);
  const [dataDestinyShipping, setDataDestinyShipping] = useState(null);

  useEffect(() => {
    if (shippingDetail) {
      setDataClient({
        value1: shippingDetail?.Client?.name,
        value2: shippingDetail?.phone,
      });
      setDataFromShipping({
        value1: shippingDetail?.originStreet,
        value2: `${shippingDetail?.originCity}, ${shippingDetail?.originPostalCode}`,
      });
      setDataDestinyShipping({
        value1: shippingDetail?.destinyStreet,
        value2: `${shippingDetail?.destinyCity}, ${shippingDetail?.destinyPostalCode}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingDetail]);

  return (
    <View>
      <View style={styles.shippingDetailDataContainer}>
        <View style={styles.shippingDetailDataContainer__shippingCard}>
          <ShippingDetailDataCard
            icon={profileIcon}
            title="Cliente"
            data={dataClient}
          />
        </View>
        <View style={styles.shippingDetailDataContainer__shippingCard}>
          <ShippingDetailDataCard
            icon={locationIcon}
            title="Origen"
            data={dataFromShipping}
          />
        </View>
        <View style={styles.shippingDetailDataContainer__shippingCard}>
          <ShippingDetailDataCard
            icon={packageIcon}
            title="Destino"
            data={dataDestinyShipping}
          />
        </View>
      </View>
      <View style={[styles.shippingDetailPriceAndPdf]}>
        <View style={styles.shippingDetailDataPrice}>
          <ShippingDetailPrice data={shippingDetail?.price} />
        </View>
        <View>
          <GuardarPDF image={downloadIcon} />
        </View>
      </View>
      <View>
        <ShippingDetailComment data={shippingDetail?.details} />
      </View>
    </View>
  );
};

export default ShippingDetailData;
