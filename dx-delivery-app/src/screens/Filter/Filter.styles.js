import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separation: {
    marginBottom: 10,
    marginTop: 20,
  },
  scrollContainer: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    justifyContent: 'space-between',
  },
  hiddingButton: {
    zIndex: -5,
  },
});

export default styles;
