import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  actionBarContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingTop: 26,
    paddingBottom: 10,
    paddingHorizontal: 20,
    height: 50,
  },
  leftSide: {
    flex: 1,
    flexDirection: 'row',
  },
  rightSide: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  checkboxAll: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxAll__text: {
    paddingLeft: 7,
  },
});

export default styles;
