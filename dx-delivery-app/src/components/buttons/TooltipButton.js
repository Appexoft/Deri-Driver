import React, {useState} from 'react';
import Tooltip from 'react-native-walkthrough-tooltip';
import {Text, Image, View, TouchableOpacity} from 'react-native';
import styles from './styles';

const TooltipButton = ({content, title}) => {
  const [open, setOpen] = useState(null);
  return (
    <Tooltip
      isVisible={open}
      content={
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text>{content}</Text>
        </View>
      }
      placement="top"
      onClose={() => setOpen(false)}>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={styles.tooltipPadding}>
        <View>
          <Image
            source={require('@assets/tooltip/tooltip.png')}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </Tooltip>
  );
};

export default TooltipButton;
