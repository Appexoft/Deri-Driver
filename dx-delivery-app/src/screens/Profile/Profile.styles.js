import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  contentContainer: {
    flexGrow: 1,
  },
  baseInfoContainer: {
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 40,
    flex: 1,
  },
  businessContainer: {
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    paddingHorizontal: 35,
    paddingVertical: 25,
    flex: 3,
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  value: {
    fontWeight: '400',
    fontSize: 14,
    maxWidth: '100%',
  },
  icon: {
    marginLeft: 5,
    marginRight: 10,
    alignSelf: 'center',
  },
  actionButton: {
    marginTop: 10,
  },
  wrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '95%',
  },
  checkBoxStyle: {
    marginRight: 7,
    width: 20,
    height: 20,
  },
});

export default styles;
