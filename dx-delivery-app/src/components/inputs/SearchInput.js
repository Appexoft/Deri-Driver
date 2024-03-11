import React from 'react';
import {Image, TextInput, View} from 'react-native';
import {useTheme} from '@hooks';
import styles from './styles';

const SearchInput = ({label, onChange, value}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.searchInputContainer,
        {backgroundColor: colors.common.white},
      ]}>
      <Image
        source={require('@assets/search/search.png')}
        style={styles.searchIcon}
      />
      <TextInput
        value={value}
        placeholder={label}
        style={[styles.searchInput, {backgroundColor: colors.common.white}]}
        placeholderTextColor={colors.text.secondary}
        onChangeText={onChange}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

export default SearchInput;
