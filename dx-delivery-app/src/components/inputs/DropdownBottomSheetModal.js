import React, {
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {View, Text, Image, ScrollView, TouchableHighlight} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import iconCalendar from '@assets/calendar/calendar.png';
import {Packages, Provider} from '@components/common/DropdownContents';
import styles from './styles';

const DEFAULT_TYPE = 'package';

const DropdownBottomSheetModal = forwardRef(
  (
    {
      label = '',
      placeholder = '',
      icon,
      data,
      inputContainerStyles,
      type = DEFAULT_TYPE,
      title,
      optionPress,
      onOptionSelected,
    },
    ref,
  ) => {
    const bottomSheetModalRef = useRef(null);
    const snapPoints = ['30%', '55%'];

    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);

    const handleGetOptionPress = optionPressIn => {
      onOptionSelected(optionPressIn);
      bottomSheetModalRef.current?.close();
    };

    useImperativeHandle(ref, () => ({
      closeModal() {
        bottomSheetModalRef.current?.close();
      },
    }));

    const handleRenderPriceOrArrow = () => {
      return optionPress && type === DEFAULT_TYPE ? (
        <Text style={(styles.textBlack, {fontWeight: '900'})}>
          ${optionPress.price}
        </Text>
      ) : (
        <Image
          style={[styles.inputIcon, styles.dropdownIcon]}
          source={require('@assets/arrow_down/arrow-down.png')}
        />
      );
    };

    const handleRenderIconOrIconOptionPress = () => {
      return !optionPress ? (
        <Image
          style={[styles.inputIcon, styles.dropdownIcon]}
          source={iconCalendar}
        />
      ) : (
        <View style={styles.containerIcon2}>
          <Image
            style={styles.iconImg}
            source={
              optionPress.typeIcon && optionPress.typeIcon.length
                ? optionPress.typeIcon
                : icon
            }
            resizeMode="contain"
          />
        </View>
      );
    };

    const contentByType = useCallback(
      (value, justLabel = false) => {
        const props = {
          value,
          icon,
          justLabel,
          isSelected: value === optionPress,
        };
        switch (type) {
          case DEFAULT_TYPE:
            return <Packages {...props} />;
          case 'provider':
            return <Provider {...props} />;
          default:
            return null;
        }
      },
      [icon, optionPress, type],
    );

    return (
      <View style={[styles.inputContainerModal, inputContainerStyles]}>
        {label && <Text style={styles.inputLabelWithIcon}>{label}</Text>}
        <View
          style={[
            !optionPress
              ? styles.dropdownInputBottomSheet
              : styles.dropdownInputBottomSheetActive,
            styles.textAreaInactive,
          ]}
          onStartShouldSetResponder={handlePresentModalPress}
        >
          <View style={styles.displayContainerDropdownModal}>
            {handleRenderIconOrIconOptionPress()}
            {optionPress ? (
              <>{contentByType(optionPress, true)}</>
            ) : (
              <Text style={[styles.textGray, styles.paddingLeft10]}>
                {placeholder}
              </Text>
            )}
          </View>
          {handleRenderPriceOrArrow()}
        </View>

        <View style={styles.containerDropdownBottom}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
          >
            <ScrollView>
              <View style={{padding: 20}}>
                {!!title && (
                  <View style={styles.textContainer}>
                    <Text style={styles.titleOption}>{title}</Text>
                  </View>
                )}
                {data?.map(value => (
                  <TouchableHighlight
                    onPress={() => handleGetOptionPress(value)}
                    underlayColor="white"
                    key={value.id}
                  >
                    {contentByType(value)}
                  </TouchableHighlight>
                ))}
              </View>
            </ScrollView>
          </BottomSheetModal>
        </View>
      </View>
    );
  },
);

export default DropdownBottomSheetModal;
