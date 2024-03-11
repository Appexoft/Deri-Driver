import React, {useState, useMemo} from 'react';
import {
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import {useFonts, useCommon} from '@theme';
import {useShippingStore} from '@hooks';
import {
  shippingStateFilter,
  shippingStateFilterValues,
} from '@helpers/constants';
import styles from './styles';

const filter = require('@assets/filter/filter.png');
const activeFilter = require('@assets/filter/active_filter.png');

const emptyAction = () => {};

const Content = () => {
  const fonts = useFonts();
  const {stateFilter, setStateFilter} = useShippingStore();

  return (
    <TouchableWithoutFeedback onPress={emptyAction}>
      <View style={styles.fullWidthContent}>
        <View style={styles.separation}>
          <Text style={fonts.boldTitle}>Filtrar</Text>
        </View>
        {shippingStateFilter.map(({label, value}, index) => (
          <TouchableOpacity
            style={[
              styles.separation,
              shippingStateFilter.length - 1 === index && styles.removeBorder,
            ]}
            key={value}
            onPress={() => setStateFilter(value)}
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

const FilterMenu = () => {
  const [open, setOpen] = useState(false);
  const {stateFilter} = useShippingStore();
  const common = useCommon();
  const isActive = useMemo(
    () => stateFilter !== shippingStateFilterValues.ALL,
    [stateFilter],
  );

  return (
    <Tooltip
      isVisible={open}
      content={<Content />}
      contentStyle={[styles.modalContainer, common.shadow]}
      arrowSize={styles.arrowSize}
      placement="bottom"
      disableShadow
      backgroundColor="transparent"
      closeOnContentInteraction={false}
      showChildInTooltip={false}
      onClose={() => setOpen(false)}
    >
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View style={styles.buttonTouchable}>
          <Image
            source={isActive ? activeFilter : filter}
            resizeMode="center"
            style={styles.imageSize}
          />
        </View>
      </TouchableOpacity>
    </Tooltip>
  );
};

export default FilterMenu;
