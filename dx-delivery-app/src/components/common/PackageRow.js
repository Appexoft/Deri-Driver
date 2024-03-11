import React from 'react';
import {View, Image, Text} from 'react-native';
import {useTheme} from '@hooks';
import styles from './styles';

const packageBox = require('@assets/package_box/package_box.png');

const PackageRow = ({packages, removeLeftMargin, marginRight}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.rowItem}>
      {packages.map((_package, index) =>
        Object.entries(_package).map(
          ([key, val]) =>
            !!val && (
              <View
                style={[
                  styles.packageItem,
                  removeLeftMargin && styles.removeLeftMargin,
                  marginRight && styles.marginRight,
                ]}
                key={key}>
                <Image source={packageBox} />
                <Text
                  style={[
                    styles.packageText,
                    {color: colors.text.main},
                  ]}>{`${val} ${key}`}</Text>
              </View>
            ),
        ),
      )}
    </View>
  );
};

export default PackageRow;
