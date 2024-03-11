import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const ShippingDetailComment = ({data}) => {
  return (
    <View style={styles.shippingDetailComment}>
      {data ? (
        <View>
          <Text
            style={[
              styles.shippingDetailComment__title,
              styles.shippingDetailPrice__padding,
            ]}
          >
            Comentario
          </Text>
          <View>
            <Text style={styles.shippingDetailComments__comment}>{data}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ShippingDetailComment;
