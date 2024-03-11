import React, {useState, useMemo, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@hooks';
import {useFonts} from '@theme';
import styles from './styles';

const DropdownInput = ({
  list = [],
  label = '',
  onOptionSelected,
  value,
  placeholder = '',
  required,
  defaultInputValue = null,
  inputContainerStyles = {},
  onFocus,
  isFocus,
}) => {
  const {colors} = useTheme();
  const fonts = useFonts();
  const [active, setActive] = useState(false);
  const [error] = useState(false);
  const [inputValue, setInputValue] = useState(defaultInputValue);
  const expandAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (active) {
      Animated.timing(expandAnim, {
        toValue: 225,
        timing: 80,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(expandAnim, {
        toValue: 0,
        timing: 80,
        useNativeDriver: false,
      }).start();
    }
  }, [active, expandAnim]);

  useEffect(() => {
    if (!isFocus) {
      setActive(false);
    }
  }, [isFocus]);

  const dropdownList = useMemo(() => {
    return (
      <View style={styles.dropdownListContainer}>
        <Animated.FlatList
          style={[
            active && styles.dropdownListScrollable,
            {height: expandAnim},
          ]}
          data={list}
          renderItem={({item}) => (
            <TouchableHighlight
              key={item.id}
              style={styles.dropdownListItem}
              underlayColor={colors.common.gray}
              onPress={() => {
                onOptionSelected(item.id);
                setInputValue(item.name);
                setActive(false);
              }}
            >
              <Text style={styles.dropdownListItemLabel}>{item.name}</Text>
            </TouchableHighlight>
          )}
          initialNumToRender={5}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }, [active, colors.common.gray, expandAnim, list, onOptionSelected]);

  const onPressSelect = useCallback(() => {
    setActive(!active);
    if (onFocus && typeof onFocus === 'function') {
      onFocus();
    }
  }, [active, onFocus]);

  return (
    <View style={[styles.inputContainer, inputContainerStyles]}>
      {label ? <Text style={styles.inputLabelWithIcon}>{label}</Text> : null}
      <View
        style={[
          styles.dropdownInput,
          active
            ? styles.inputWithIconActive
            : error
            ? styles.inputWithIconError
            : styles.inputWithIconInactive,
        ]}
      >
        <TouchableOpacity style={styles.pickerInput} onPress={onPressSelect}>
          <Text style={inputValue ? fonts.secondaryText : fonts.label}>
            {inputValue || placeholder}
          </Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={onPressSelect}>
          <Image
            style={[
              styles.inputIcon,
              styles.dropdownIcon,
              active && styles.dropdownIconActive,
            ]}
            source={require('@assets/arrow_down/arrow-down.png')}
          />
        </TouchableWithoutFeedback>
      </View>
      {dropdownList}
    </View>
  );
};

export default DropdownInput;
