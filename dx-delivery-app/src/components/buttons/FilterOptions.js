import React from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import {useFonts, useCommon} from '@theme';
import {useShippingStore} from '@hooks';
import styles from './styles';

const emptyAction = () => {};

const Content = ({data, optionSelected}) => {
  const fonts = useFonts();
  const {stateFilter} = useShippingStore();

  return (
    <TouchableWithoutFeedback onPress={emptyAction}>
      <View style={styles.fullWidthContent}>
        {data.map(({label, value}, index) => (
          <TouchableOpacity
            style={[
              styles.separation,
              data.length - 1 === index && styles.removeBorder,
            ]}
            key={value}
            onPress={() => optionSelected(value)}
          >
            <Text
              style={[
                fonts.secondaryText,
                stateFilter === value && fonts.selected,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </TouchableWithoutFeedback>
  );
};

const FilterOptions = ({
  options = [
    {
      value: 'default',
      label: 'Default',
    },
  ],
  open = false,
  onClose,
  onOptionSelected,
}) => {
  const common = useCommon();

  return (
    <Tooltip
      isVisible={open}
      content={
        <Content
          data={options}
          optionSelected={value => onOptionSelected(value)}
        />
      }
      contentStyle={[styles.modalContainer, common.shadow]}
      arrowSize={styles.arrowSize}
      placement="bottom"
      disableShadow
      backgroundColor="transparent"
      closeOnContentInteraction={false}
      showChildInTooltip={false}
      onClose={onClose}
    >
      <TouchableOpacity>
        <View style={styles.buttonTouchable} />
      </TouchableOpacity>
    </Tooltip>
  );
};

export default FilterOptions;
