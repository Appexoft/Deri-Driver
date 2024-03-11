import {StyleSheet} from 'react-native';
import {useColors} from '@theme';

// eslint-disable-next-line react-hooks/rules-of-hooks
const colors = useColors();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContiner: {
    display: 'flex',
    paddingBottom: 24,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 29,
  },
  title: {
    color: colors.common.black,
    fontSize: 22,
    marginBottom: 10,
    fontFamily: 'Avenir',
    fontWeight: '900',
  },
  subtitle: {
    color: colors.common.dark,
    lineHeight: 25,
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  marginRight: {
    marginRight: 5,
  },
  logoAndText: {
    alignItems: 'center',
    paddingTop: 262,
  },
  logo: {
    width: 80,
    height: 80,
  },
  topSeparation: {
    marginTop: 15,
    paddingVertical: 15,
  },
  createButton: {
    backgroundColor: colors.button.secondary,
  },
});

export default styles;
