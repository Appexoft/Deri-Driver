import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  centerContainer: {
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  mainButtonContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  map: {
    height: height * 0.5,
    alignItems: 'center',
    paddingTop: 10,
  },
  locationIcon: {
    width: 20,
    height: 20,
  },
  addressSearchInputContainer: {
    flex: 1,
    width: '100%',
    padding: '5%',
  },
  loadingStyle: {
    position: 'absolute',
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  suggestedList: {
    paddingBottom: 230,
  },
  textInputContainer: {
    width: '100%',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    paddingHorizontal: '6%',
  },
  listContainer: {
    width: '100%',
    borderWidth: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: -8,
    paddingVertical: 8,
    shadowColor: 'transparent',
  },
  rightButtonsContainerStyle: {
    backgroundColor: 'transparent',
  },
  addressTextInputContainer: {
    paddingVertical: 6,
    paddingHorizontal: '6%',
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    marginBottom: 10,
  },
  addressTextInput: {
    fontFamily: 'Lato-Regular',
    lineHeight: 14,
    fontSize: 12,
  },
  mapContainer: {
    width: '100%',
  },
  edgePadding: {
    top: 100,
    right: 100,
    bottom: 100,
    left: 100,
  },
});

export default styles;
