import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

const Label = ({value}) => (
  <View style={styles.paddingLeft10}>
    <Text style={styles.titleOption}>{value.typeName}</Text>
    <Text style={styles.dataOption}>{value.typeDescription}</Text>
  </View>
);

const Packages = ({value, icon, justLabel = false}) => {
  if (justLabel) {
    return <Label value={value} />;
  }
  return (
    <View style={styles.containerOptions}>
      <View style={styles.imgTitleOption}>
        {value.typeIcon ? (
          <View style={styles.containerIcon}>
            <Image source={value.typeIcon} resizeMode="contain" />
          </View>
        ) : (
          <View style={styles.containerIcon}>
            <Image style={styles.iconImg} source={icon} resizeMode="contain" />
          </View>
        )}
        <Label value={value} />
      </View>
      <View>
        <Text style={styles.priceOption}>${value.price}</Text>
      </View>
    </View>
  );
};

export default Packages;
