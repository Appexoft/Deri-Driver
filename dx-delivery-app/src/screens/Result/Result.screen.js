import React, {useContext} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {CommonContext} from '@store/common/state';
import {MainButton, CancelButton} from '@components';
import styles from './Results.styles';

const backgroundSuccess = require('@assets/success_background/success_background.png');
const backgroundError = require('@assets/error_background/error_background.png');
const success = require('@assets/success/success.png');
const error = require('@assets/error/error.png');

const Result = () => {
  const {resultScreen} = useContext(CommonContext);
  return (
    <View style={styles.flexContainer}>
      <ImageBackground
        source={resultScreen.error ? backgroundError : backgroundSuccess}
        resizeMode="center"
        style={styles.flexContainer}>
        <View style={styles.mainContent}>
          <Text style={styles.title}>{resultScreen.title}</Text>
          <Image source={resultScreen.error ? error : success} />
          <Text style={styles.description}>{resultScreen.description}</Text>
        </View>
      </ImageBackground>
      <View>
        <View style={styles.mainButtonContainer}>
          <MainButton
            label={resultScreen.mainActionLabel}
            onPress={resultScreen.mainAction}
          />
        </View>
        {resultScreen.secondaryAction && (
          <View style={styles.cancelButtonContainer}>
            <CancelButton
              label={resultScreen.secondaryActionLabel}
              onPress={resultScreen.secondaryAction}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Result;
