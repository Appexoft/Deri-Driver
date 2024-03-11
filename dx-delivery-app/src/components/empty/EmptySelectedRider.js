import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

const EmptySelectedRider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.ringContainer}>
        <View style={styles.thirdRing}>
          <View style={styles.secondRing}>
            <View style={styles.firstRing}>
              {/* <Image source={CadetIcon} /> */}
              <Text>Image</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EmptySelectedRider;
