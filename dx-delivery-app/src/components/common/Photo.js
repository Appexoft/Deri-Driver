import React from 'react';
import {View, Image, TouchableWithoutFeedback} from 'react-native';
import {useTheme} from '@hooks';

import styles from './styles';

const Photo = ({uri, edit = true, onDelete, onDowload}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.photoContainer,
        {backgroundColor: colors.layout.secondary},
      ]}>
      {edit && (
        <TouchableWithoutFeedback onPress={onDelete}>
          <Image
            source={require('@assets/close/rounded_close.png')}
            style={styles.closeImage}
          />
        </TouchableWithoutFeedback>
      )}
      {onDowload ? (
        <TouchableWithoutFeedback onPress={onDowload}>
          <Image source={{uri}} style={styles.image} />
        </TouchableWithoutFeedback>
      ) : (
        <Image source={{uri}} style={styles.image} />
      )}
    </View>
  );
};

export default Photo;
