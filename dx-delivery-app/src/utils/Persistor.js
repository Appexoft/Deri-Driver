import AsyncStorage from '@react-native-async-storage/async-storage';

export const persistUserInfo = async token => {
  try {
    await AsyncStorage.setItem('user_token', JSON.stringify(token));
  } catch (err) {
    throw err;
  }
};
