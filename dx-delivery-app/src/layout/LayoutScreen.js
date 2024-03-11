import React from 'react';
import {View} from 'react-native';
import styles from './styles';

const LayoutScreen = ({children}) => {
  return <View style={styles.paddingLayout}>{children}</View>;
};

export default LayoutScreen;
