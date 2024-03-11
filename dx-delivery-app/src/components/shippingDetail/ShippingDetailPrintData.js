import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';

const GuardarPDF = ({image, isUnderline = false, title = 'Guardar PDF'}) => {
  return (
    <TouchableOpacity>
      <View style={styles.GuardarPDF}>
        <Image source={image} />
        {isUnderline ? (
          <Text style={styles.GuardarPDF__titleIsUnderline}>{title}</Text>
        ) : (
          <Text style={styles.GuardarPDF__title}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default GuardarPDF;
