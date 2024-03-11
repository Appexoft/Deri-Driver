import React, {useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import {privacyPolicyUrl} from '@helpers/constants';
import {ErrorAlert} from '@components';
import {useTheme} from '@hooks';

import styles from './Privacy.styles';

const Privacy = () => {
  const [isLoading, setLoading] = useState(false);
  const {colors} = useTheme();

  const display = isLoading ? 'none' : 'flex';

  return (
    <View style={[styles.container, {backgroundColor: colors.common.white}]}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.status.loading.main} size="large" />
        </View>
      )}
      <WebView
        style={[{display}]}
        source={{uri: privacyPolicyUrl}}
        onLoadStart={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          setLoading(nativeEvent.loading);
        }}
        onLoadEnd={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          setLoading(nativeEvent.loading);
        }}
        renderError={errorName => (
          <View
            style={[
              styles.errorContainer,
              {backgroundColor: colors.common.white},
            ]}>
            <ErrorAlert />
          </View>
        )}
      />
    </View>
  );
};

export default Privacy;
