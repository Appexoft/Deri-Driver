import React, {useContext} from 'react';
import {View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ProgressDialog from 'react-native-progress-dialog';
import {MainButton} from '@components';
import {UserContext} from '@store/user/state';
import {useTheme} from '@hooks';
import styles from './Home.styles';

const logo = require('@assets/logo/logo.png');

const Home = () => {
  const {login, isLoading} = useContext(UserContext);
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradient.main, colors.gradient.main]}
        style={styles.container}
        start={{x: 0.5, y: 0.5}}
      >
        <View style={styles.contentContainer}>
          <View style={styles.logoAndText}>
            <Image source={logo} />
            <ProgressDialog visible={isLoading} label="Por favor espere..." />
            <View style={styles.textRow}>
              <Text style={[styles.title, {color: colors.common.black}]}>
                Bienvenido a Deri
              </Text>
              <Text style={styles.subtitle}>
                Nuestro sistema de envío te asegurará que los paquetes lleguen
                en tiempo y forma
              </Text>
            </View>
          </View>
          <View style={styles.btnContiner}>
            <MainButton
              widthSize="100%"
              label="Iniciar sesión"
              onPress={login}
              className={styles.topSeparation}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Home;
