import React from 'react';
import {View, ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@hooks';

import styles from './styles';

const FooterButton = ({label, onPress, disable, isLoading}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPress} disabled={disable}>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.status.loading.main} />
        ) : (
          <Text style={[styles.link, {color: colors.button.main}]}>
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FooterButton;
