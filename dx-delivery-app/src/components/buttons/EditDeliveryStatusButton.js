import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import EditPencilIcon from '@assets/edit_pencil/edit_pencil2.png';

const EditDeliveryStatusButton = ({value, onPress}) => {
  return (
    <View style={[styles.editBox]}>
      <Text style={[styles.textEdit]}>{value}</Text>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.editIcon]}>
          <Image source={EditPencilIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EditDeliveryStatusButton;
