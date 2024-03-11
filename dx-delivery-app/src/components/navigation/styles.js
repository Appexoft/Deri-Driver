import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerStyle: {
    height: Platform.select({
      ios: 112,
      android: 60,
    }),
    shadowOpacity: 0,
    elevation: 0,
  },
  headerTitleStyle: {
    fontFamily: 'Avenir',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    paddingLeft: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    minWidth: '100%',
  },
  drawerItemLabel: {
    fontSize: 14,
    overflow: 'visible',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    marginLeft: 20,
  },
  fullSpace: {
    flex: 1,
  },
  drawerItem: {
    overflow: 'visible',
    width: '100%',
  },
  firstItem: {
    marginTop: 10,
  },
  lastItem: {
    marginBottom: 20,
  },
  bigHeader: {
    height: 120,
    shadowOpacity: 0,
    elevation: 0,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  marginRight: {
    marginRight: 5,
  },
  appTitle: {
    fontFamily: 'Cabin-Bold',
    fontSize: 30,
    lineHeight: 36,
    marginRight: 5,
  },
  imageContainer: {
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
