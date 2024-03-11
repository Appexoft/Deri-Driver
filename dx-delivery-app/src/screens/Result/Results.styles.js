import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainButtonContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  cancelButtonContainer: {
    height: 40,
    justifyContent: 'center',
    marginBottom: 20,
  },
  flexContainer: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Cabin-Bold',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 50,
  },
  description: {
    fontFamily: 'Cabin-Regular',
    textAlign: 'center',
    fontSize: 26,
    marginTop: 20,
  },
});

export default styles;
