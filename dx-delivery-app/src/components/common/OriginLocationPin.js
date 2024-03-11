import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';
import {useColors} from '../../theme';

const icon = require('@assets/location_icon/location_icon.png');

const LocationPinImage = ({type}) => {
  const colors = useColors();

  const sourceImage = icon;
  const isOriginType = type === 'origin';

  const backgroundColorTransparency = isOriginType
    ? colors.background.origin
    : colors.background.destination;
  const backgroundColorCircle = isOriginType
    ? colors.common.main
    : colors.common.secondary;

  return (
    <View
      style={[
        styles.locationImg,
        {backgroundColor: backgroundColorTransparency},
      ]}
    >
      <View style={[styles.circle, {backgroundColor: backgroundColorCircle}]}>
        <Image resizeMode="contain" source={sourceImage} />
      </View>
    </View>
  );
};

export default LocationPinImage;
