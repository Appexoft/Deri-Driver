import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useTheme} from '@hooks';
import styles from './styles';

const EditableState = ({item, editState, disableEdit}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.container,
        styles.removeMargin,
        {backgroundColor: item?.backgroundColor},
        disableEdit && styles.addPadding,
      ]}>
      <Text style={[styles.itemText, {color: item?.color}]}>{item?.label}</Text>
      {!disableEdit && (
        <TouchableOpacity
          style={[
            styles.closeContainer,
            {backgroundColor: colors.common.white},
          ]}
          onPress={editState}>
          <Image
            source={require('@assets/edit_pencil/edit_pencil_blue.png')}
            style={styles.editImg}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EditableState;
