import React, {useEffect, useRef} from 'react';
import {View, Text, Image} from 'react-native';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {useStyles} from '@theme';
import styles from './styles';

const AutoCompleteInput = ({
  suggestedLocations,
  setAddress,
  onAddressSearch,
  loading,
  placeholder,
  currentValue = '',
  onFocus,
  isFocus,
}) => {
  const theme = useStyles();

  const dropdownController = useRef(null);

  useEffect(() => {
    if (typeof isFocus === 'boolean' && !isFocus) {
      dropdownController.current.close();
    }
  }, [isFocus]);

  useEffect(() => {
    dropdownController.current.setInputText(currentValue);
  }, [currentValue]);

  const renderListItem = (item, text) => (
    <View style={styles.addressTextInputContainer} key={item.id}>
      <Text style={styles.addressTextInput} numberOfLines={2}>
        {item?.name ?? text}
      </Text>
    </View>
  );

  return (
    <View style={styles.inputRow}>
      <View style={theme.flex}>
        <AutocompleteDropdown
          clearOnFocus={false}
          ItemSeparatorComponent={<View />}
          loading={loading}
          closeOnBlur={false}
          closeOnSubmit
          direction="down"
          emptyResultText="No se encontraron resultados"
          onSelectItem={item => {
            if (item?.place_id) {
              setAddress(item);
            }
          }}
          controller={controller => {
            dropdownController.current = controller;
          }}
          onChangeText={onAddressSearch}
          onFocus={onFocus}
          dataSet={suggestedLocations?.length ? suggestedLocations : null} //Avoid issue with a unnecessary area
          textInputProps={{
            placeholder,
            autoCorrect: false,
            autoCapitalize: 'none',
            style: styles.textInputContainer,
          }}
          inputHeight={40}
          inputContainerStyle={[
            styles.dropdownInput,
            styles.autoCompleteContainer,
          ]}
          suggestionsListContainerStyle={styles.listContainer}
          renderItem={renderListItem}
          showChevron={false}
          showClear={false}
        />
      </View>
    </View>
  );
};

export default AutoCompleteInput;
