import React, {useContext} from 'react';
import {FlatList, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ShippingCard, InputCheckbox} from '@components';
import {shippingTypeValues} from '@helpers/constants';
import {formatedDate} from '@helpers/date';
import {useFonts} from '@theme';
import styles from './styles';
import {ShippingContext} from '@store/shipping/state';

const keyExtractor = item => `${item.id}`;

const GroupLabel = ({item, data}) => {
  const fonts = useFonts();

  return (
    <View>
      <Text style={[fonts.label, styles.label]}>{formatedDate(item.id)}</Text>
      <View>
        <FlatList
          data={data}
          renderItem={({item: cardItem}) => (
            <View>
              <CardByState item={cardItem} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const CardByState = ({item}) => {
  const {
    setShippingSelectById,
    deleteShippingSelectById,
    setChangeCheckboxInShippingGroupByShippingId,
  } = useContext(ShippingContext);
  const navigation = useNavigation();
  const isMl = item.type === 'MERCADO_LIBRE';
  const isPickup = item.type === shippingTypeValues.PICK_UP;

  const handleGetValueCheckbox = (checkTrueOrFalse, itemShipping) => {
    if (checkTrueOrFalse) {
      setShippingSelectById(itemShipping.id);
      setChangeCheckboxInShippingGroupByShippingId(itemShipping.id);
    } else {
      deleteShippingSelectById(itemShipping.id);
      setChangeCheckboxInShippingGroupByShippingId(itemShipping.id);
    }
  };

  return (
    <View style={styles.flexShipping}>
      <View style={styles.widthCheckbox}>
        <InputCheckbox
          value={item.checkboxPress}
          onGetValue={check => handleGetValueCheckbox(check, item)}
        />
      </View>
      <View style={styles.widthDataShipping}>
        <ShippingCard isMl={isMl} isPickup={isPickup} item={item} />
      </View>
    </View>
  );
};

const ShippingGroupList = ({data, onRefresh, loading, incrementPage}) => {
  return (
    <View style={styles.flexContainer}>
      <FlatList
        data={data}
        onRefresh={onRefresh}
        renderItem={({item}) => <GroupLabel item={item} data={item.list} />}
        keyExtractor={keyExtractor}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        onEndReached={incrementPage}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default ShippingGroupList;
