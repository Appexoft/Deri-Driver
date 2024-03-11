import {StyleSheet} from 'react-native';
import {useColors} from '@theme';

// eslint-disable-next-line react-hooks/rules-of-hooks
const colors = useColors();

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 15,
  },
  ringContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstRing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 132,
    height: 132,
    backgroundColor: '#f2f2f5',
    borderRadius: 66,
  },
  secondRing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 192,
    height: 192,
    backgroundColor: '#f6f6f8',
    borderRadius: 96,
  },
  thirdRing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 242,
    height: 242,
    backgroundColor: '#fafafb',
    borderRadius: 121,
  },
});

export default styles;
