import React, {useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import {View} from 'react-native';
import {BottomSheetModal as BottomModal} from '@gorhom/bottom-sheet';

import styles from './styles';

const BottomSheetModal = forwardRef(
  ({open, snapPoints = ['30%', '55%'], children, onChange}, ref) => {
    const bottomSheetModalRef = useRef(null);

    useImperativeHandle(ref, () => ({
      closeModal() {
        bottomSheetModalRef.current?.close();
      },
      openModal() {
        bottomSheetModalRef.current?.present();
      },
    }));

    useEffect(() => {
      open
        ? bottomSheetModalRef.current?.present()
        : bottomSheetModalRef.current?.close();
    }, [open]);

    return (
      <View>
        <BottomModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={onChange}
        >
          <View style={styles.modalContainer}>{children}</View>
        </BottomModal>
      </View>
    );
  },
);

export default BottomSheetModal;
