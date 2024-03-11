import React, {useRef, useEffect, forwardRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {BottomSheetModal} from '@components';

import styles from './styles';
import arrowDownIcon from '@assets/arrow_down/arrow-down.png';

const InputDropdownBottom = forwardRef(
  (
    {
      label,
      placeholder,
      icon,
      required,
      children,
      valueSelected = {
        value: null,
        description: null,
        activate: null,
        icon: null,
        id: null,
      },
    },
    ref,
  ) => {
    const dropdownRef = useRef(null);
    const snapPoints = ['30%', '55%'];

    const handleOpenBottomSheet = () => {
      dropdownRef.current?.openModal();
    };

    useEffect(() => {
      if (valueSelected?.activate) {
        dropdownRef.current?.closeModal();
      }
    }, [valueSelected]);

    return (
      <>
        <View style={styles.dropdownBottom}>
          {required && label ? (
            <Text style={styles.dropdownBottom__label}>{`${label} *`}</Text>
          ) : label ? (
            <Text style={styles.dropdownBottom__label}>{`${label}`}</Text>
          ) : null}
          <View style={styles.inputDropdown}>
            <TouchableWithoutFeedback onPress={handleOpenBottomSheet}>
              <View style={styles.inputDropdownIconAndLabel}>
                <View style={styles.inputDropdownIconAndLabel__display}>
                  {valueSelected?.icon ? (
                    <View style={styles.inputDropdown__image}>
                      <Image source={valueSelected?.icon} />
                    </View>
                  ) : icon ? (
                    <View style={styles.inputDropdown__image}>
                      <Image source={icon} />
                    </View>
                  ) : null}
                  <View>
                    <Text
                      style={[
                        valueSelected?.value
                          ? styles.inputDropdown__iconAndLabel__placeholder_activate
                          : styles.inputDropdown__iconAndLabel__placeholder,
                      ]}
                    >
                      {valueSelected?.value
                        ? valueSelected?.value
                        : placeholder}
                    </Text>
                    {valueSelected?.description && (
                      <Text
                        style={styles.inputDropdown__iconAndLabel__placeholder}
                      >
                        {valueSelected.description}
                      </Text>
                    )}
                  </View>
                </View>
                <View>
                  <Image source={arrowDownIcon} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <BottomSheetModal ref={dropdownRef} snapPoints={snapPoints} index={1}>
          <ScrollView>{children}</ScrollView>
        </BottomSheetModal>
      </>
    );
  },
);

export default InputDropdownBottom;
