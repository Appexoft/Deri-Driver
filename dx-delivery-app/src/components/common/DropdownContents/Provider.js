import React from 'react';
import {View, Text} from 'react-native';
import {Checkbox} from '@components';
import styles from './styles';

const Label = ({value}) => (
  <View style={styles.imgTitleOption}>
    <View style={styles.paddingLeft10}>
      <Text style={styles.titleOption}>{value.name}</Text>
    </View>
  </View>
);

const Provider = ({value, icon, justLabel, isSelected}) => {
  if (justLabel) {
    return <Label value={value} />;
  }
  return (
    <View
      style={[
        styles.containerOptions,
        styles.extraBorderRadius,
        isSelected && styles.selected,
      ]}
    >
      <View style={styles.imgTitleOption}>
        <View style={styles.paddingLeft10}>
          <Text style={styles.titleOption}>{value.name}</Text>
        </View>
      </View>
      <Checkbox value={isSelected} />
    </View>
  );
};

export default Provider;
