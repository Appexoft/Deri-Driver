import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  Text,
  Platform,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {MainButton, Input, InputError} from '@components';
import {useKeyboard} from '@react-native-community/hooks';
import {useTheme} from '@hooks';
import styles from './styles';

const locationIcon = require('@assets/location_dot/location_dot.png');

const Map = ({
  onConfirm,
  btnDisabled,
  addressFloor,
  setAddressFloor,
  addressSearch,
  regionData,
  handleRegionChange,
  suggestedLocations,
  markerData,
  setAddress,
  onAddressSearch,
  loading,
  error,
}) => {
  const {colors} = useTheme();
  const submitMap = () => {
    if (!loading && !error) {
      onConfirm();
    }
  };

  const [searchText, setSearchText] = useState(null);

  // all code below is for scroll to top after focus in address input
  const [ref, setRef] = useState(null);
  const [addressIsFocus, setAddressIsFocus] = useState(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const keyboard = useKeyboard();

  useEffect(() => {
    setKeyboardHeight(keyboard.keyboardHeight);
  }, [keyboard, keyboard.keyboardHeight, keyboard.keyboardShown]);

  useEffect(() => {
    if (keyboardHeight !== 0 && addressIsFocus) {
      // time out is due to bug/issue with scroll
      setTimeout(() => {
        ref?.scrollTo({
          y: keyboardHeight + 80,
          animated: true,
        });
      }, 350);
    }
  }, [addressIsFocus, keyboardHeight, ref]);

  const renderListItem = useCallback(
    (item, text) => (
      <View style={styles.addressTextInputContainer} key={item.id}>
        <Text style={[styles.addressTextInput, {color: colors.text.main}]}>
          {item?.name ?? text}
        </Text>
      </View>
    ),
    [],
  );

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.common.white}]}
      nestedScrollEnabled
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.centerContainer}
      ref={r => {
        setRef(r);
      }}>
      {loading && (
        <ActivityIndicator
          size="large"
          color={colors.status.loading.main}
          style={styles.loadingStyle}
        />
      )}
      <MapView
        style={styles.map}
        zoomTapEnabled
        region={regionData}
        //onRegionChangeComplete={region => handleRegionChange(region)}
      >
        <Marker
          coordinate={markerData}
          //onDragEnd={e => {handleRegionChange(e.nativeEvent.coordinate);}}
        >
          <Image
            resizeMode="contain"
            source={locationIcon}
            style={styles.locationIcon}
          />
        </Marker>
      </MapView>
      <View
        style={[
          styles.addressSearchInputContainer,
          {backgroundColor: colors.common.white},
        ]}>
        <View
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            addressIsFocus && {
              paddingBottom:
                suggestedLocations?.length > 0
                  ? suggestedLocations?.length * 40
                  : 80,
            },
          ]}>
          <Text style={[styles.inputLabel, {color: colors.text.main}]}>
            {'Agregar Dirección'}
          </Text>
          <AutocompleteDropdown
            clearOnFocus={false}
            ItemSeparatorComponent={<View />}
            loading={loading}
            closeOnBlur={false}
            closeOnSubmit
            direction={Platform.select({ios: 'down', android: 'down'})}
            emptyResultText="No se encontraron resultados, recuerda ingresar el número de la dirección"
            onSelectItem={item => {
              if (item?.place_id) {
                setSearchText(item.main_text);
                setAddress(item);
              }
            }}
            onChangeText={text => {
              onAddressSearch(text);
              // timeout is set due to issue with suggestionsList
              setTimeout(() => {
                setSearchText(text);
              }, 100);
            }}
            onOpenSuggestionsList={setAddressIsFocus}
            dataSet={
              suggestedLocations?.length > 0
                ? suggestedLocations
                : (addressSearch !== '' && !searchText) ||
                  addressSearch === searchText
                ? [
                    {
                      id: '1',
                      title: addressSearch,
                      name: addressSearch,
                    },
                  ]
                : []
            }
            initialValue={{
              id: '1',
            }}
            textInputProps={{
              placeholder: 'Ej: Defensa 1917',
              autoCorrect: false,
              autoCapitalize: 'none',
              style: {
                ...styles.textInputContainer,
                backgroundColor: colors.common.white,
                borderColor: colors.border.main,
                color: colors.text.main,
              },
            }}
            inputHeight={40}
            inputContainerStyle={[
              styles.inputContainer,
              {borderColor: colors.border.main},
            ]}
            rightButtonsContainerStyle={styles.rightButtonsContainerStyle}
            suggestionsListContainerStyle={[
              styles.listContainer,
              {
                backgroundColor: colors.common.white,
                borderColor: colors.border.main,
              },
            ]}
            renderItem={renderListItem}
            showChevron={false}
            showClear={false}
          />
        </View>
        {error && <InputError message={error} />}
        <Input
          label="Apartamento/ Casa"
          placeholder="Ej: Apto 900"
          placeholderTextColor={colors.text.secondary}
          returnKeyType="send"
          keyboardType="default"
          onChangeText={setAddressFloor}
          value={addressFloor}
        />
      </View>
      <View style={styles.mainButtonContainer}>
        <MainButton
          label="Confirmar"
          onPress={submitMap}
          disabled={btnDisabled}
        />
      </View>
      {
        // added due to bug with keyboard in ios
        addressIsFocus && <View style={[{height: keyboardHeight}]} />
      }
    </ScrollView>
  );
};

export default Map;
