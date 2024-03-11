import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    width: 60,
    height: 60,
    borderRadius: 50,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    width: 42,
    height: 42,
    borderRadius: 50,
  },
  flexItem: {
    flex: 1,
  },
  actionButon: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default styles;
