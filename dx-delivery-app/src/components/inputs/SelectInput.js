import React from 'react';
import {View, Text, Platform} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import FilterItem from '@components/common/FilterItem';
import InputError from './InputError';
import {useTheme} from '@hooks';
import styles from './styles';

const SelectInput = ({
  label,
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  onOpen,
  selectedItemWithLabel,
  removeItem,
  multiple = true,
  disabled,
  error,
  searchable = false,
  onlySelect,
  placeholder,
}) => {
  const {colors} = useTheme();
  const itemsSchema = {
    label: 'name',
    value: 'id',
  };

  return (
    <View
      style={
        open
          ? Platform.select({
              android: styles.selectInputWithRelative,
              ios: styles.selectInputWithZindex,
            })
          : styles.selectInputWithoutZindex
      }>
      {!!label && (
        <Text style={[styles.inputLabel, {color: colors.text.main}]}>
          {label}
        </Text>
      )}
      <DropDownPicker
        placeholder={placeholder || 'Seleccionar opción'}
        schema={itemsSchema}
        translation={{
          SELECTED_ITEMS_COUNT_TEXT: '',
          SEARCH_PLACEHOLDER: 'Buscando...',
          NOTHING_TO_SHOW: 'No se encontró ninguna coincidencia',
        }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        multiple={multiple}
        stickyHeader={true}
        style={[styles.selectInput, {borderColor: colors.border.main}]}
        searchable={searchable}
        itemKey="id"
        onOpen={onOpen}
        searchTextInputStyle={{borderBottomColor: colors.common.transparent}}
        dropDownContainerStyle={{borderColor: colors.border.main}}
        searchContainerStyle={{borderBottomColor: colors.border.main}}
        customItemContainerStyle={{borderColor: colors.border.main}}
        listMode="SCROLLVIEW"
        disabled={disabled}
        textStyle={[
          styles.selectTextStyle,
          disabled && {color: colors.button.disabled},
        ]}
        disabledStyle={disabled && styles.disabledStyle}
      />
      {error && <InputError error={error} />}
      {selectedItemWithLabel && !onlySelect && (
        <View style={styles.row}>
          {multiple
            ? selectedItemWithLabel.map(item => (
                <FilterItem
                  label={item.name}
                  removeItem={() => removeItem(item.id)}
                  key={item.id}
                  disableAction={disabled}
                />
              ))
            : selectedItemWithLabel && (
                <FilterItem
                  label={selectedItemWithLabel.name}
                  removeItem={() => removeItem(selectedItemWithLabel.id)}
                  key={selectedItemWithLabel.id}
                  disableAction={disabled}
                />
              )}
        </View>
      )}
    </View>
  );
};

export default SelectInput;
