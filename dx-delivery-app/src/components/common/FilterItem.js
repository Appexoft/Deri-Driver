import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useTheme} from '@hooks';
import styles from './styles';

const FilterItem = ({label, removeItem, disableAction}) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.button.main}]}>
      <Text style={[styles.itemText, {color: colors.text.main}]}>{label}</Text>
      {!disableAction && (
        <TouchableOpacity
          style={[
            styles.closeContainer,
            {backgroundColor: colors.common.white},
          ]}
          onPress={removeItem}>
          <Image
            source={require('@assets/close/black_close.png')}
            style={styles.closeImg}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FilterItem;
