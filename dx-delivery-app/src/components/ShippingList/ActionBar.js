import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import {FilterMenu, InputCheckbox as CheckboxAllShipping} from '@components';
import {ShippingContext} from '@store/shipping/state';
import {BottomSheetContext} from '@store/bottomSheet/state';
import styles from './styles';
import {BottomSheetModalName} from '../modal/ModalNames';

const TrashIcon = require('@assets/trash/trashWithoutBorder.png');

const ActionBar = () => {
  const {setChangeAllCheckboxInShippingGroup, shippingSelectedById} =
    useContext(ShippingContext);
  const {setOpenBottomSheet} = useContext(BottomSheetContext);
  const [selectedAllCheckbox, setSelectedAllCheckbox] = useState(false);

  const handleGetValueCheckbox = () => {
    setSelectedAllCheckbox(!selectedAllCheckbox);
  };

  useEffect(() => {
    setChangeAllCheckboxInShippingGroup(!!selectedAllCheckbox);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAllCheckbox]);

  const handleConfirmDelete = () => {
    setOpenBottomSheet(BottomSheetModalName.DELETE_IN_LIST);
  };

  const renderCheckboxAllShipping = () => {
    if (shippingSelectedById?.length) {
      return (
        <View style={styles.checkboxAll}>
          <CheckboxAllShipping
            value={selectedAllCheckbox}
            onGetValue={handleGetValueCheckbox}
          />
          <Text
            style={styles.checkboxAll__text}
          >{`${shippingSelectedById.length} pedidos seleccionados`}</Text>
        </View>
      );
    }
  };

  const renderFilterOrTrash = () => {
    if (shippingSelectedById?.length > 0) {
      return (
        <TouchableWithoutFeedback onPress={handleConfirmDelete}>
          <Image source={TrashIcon} />
        </TouchableWithoutFeedback>
      );
    } else {
      return <FilterMenu />;
    }
  };

  return (
    <View style={styles.actionBarContainer}>
      <View style={styles.leftSide}>{renderCheckboxAllShipping()}</View>
      <View style={styles.rightSide}>{renderFilterOrTrash()}</View>
    </View>
  );
};

export default ActionBar;
