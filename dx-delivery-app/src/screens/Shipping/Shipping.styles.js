import {StyleSheet, Dimensions} from 'react-native';
import {useColors, useFonts} from '@theme';

// eslint-disable-next-line react-hooks/rules-of-hooks
const colors = useColors();
// eslint-disable-next-line react-hooks/rules-of-hooks
const fonts = useFonts();
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  spaceBetweenContainer: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingBottom: 30,
    justifyContent: 'space-between',
    backgroundColor: colors.common.white,
  },
  scrollSeparation: {
    paddingTop: 35,
  },

  formContainer: {
    padding: '8%',
    height: '100%',
  },
  centerContainer: {
    alignItems: 'center',
  },
  searchInputContainer: {
    width: '100%',
    paddingHorizontal: 20,
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 21,
    flex: 1,
    justifyContent: 'center',
  },
  shippingTypeItem: {
    height: 100,
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 9},
    elevation: 4,
  },
  selectedShippingTypeItem: {
    borderWidth: 3,
    shadowOpacity: 0,
    elevation: 0,
  },
  shippingTypeLabel: {
    fontFamily: 'Lato-Bold',
    marginBottom: 6,
  },
  shippingTypeImage: {
    width: 60,
    marginRight: 30,
  },
  shippingTypeTextContainer: {width: '70%'},
  mainButtonContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  cancelButtonContainer: {
    height: 40,
    justifyContent: 'center',
    marginBottom: 40,
  },
  indicator: {
    flex: 1,
  },
  map: {
    height: height * 0.5,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 10,
  },
  locationIcon: {
    width: 20,
    height: 20,
  },
  menuSeparation: {
    marginLeft: 5,
  },
  flexContainer: {
    flex: 1,
  },
  text_empty_state: {
    textAlign: 'center',
    paddingBottom: 40,
    fontSize: 20,
  },
  image_cactus: {
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 50,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  packageMargin: {
    marginRight: 15,
  },
  addPackageButton: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    minWidth: '100%',
  },
  quantityInput: {
    maxWidth: 80,
    minHeight: 40,
  },
  closeContainer: {
    borderWidth: 0.5,
    borderRadius: 100,
    padding: 6,
  },
  closeImg: {
    width: 10,
    height: 10,
  },
  packageItem: {
    height: 40,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 5,
    width: 120,
    marginBottom: 10,
    marginRight: 10,
    justifyContent: 'space-between',
  },
  flexItem: {
    flexDirection: 'row',
    flex: 1,
  },
  wrapContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  separation: {
    marginBottom: 20,
  },
  limitWidth: {
    maxWidth: '100%',
  },
  adjustPadding: {
    paddingVertical: '8%',
  },
  fullWidth: {
    width: '100%',
  },
  inputHeight: {
    height: 90,
  },
  textAreaHeight: {
    height: 180,
  },
  maxHeightAddress: {
    maxHeight: 120,
  },
  allSpace: {
    flex: 1,
    width: '100%',
  },
  presentationText: {
    fontSize: 14,
    fontFamily: 'Cabin-Regular',
    maxWidth: 150,
    textAlign: 'center',
  },
  addressIndication: {
    fontFamily: 'Cabin-Bold',
    fontSize: 14,
  },
  link: {
    fontFamily: 'IBMPlexSans-Regular',
    marginRight: 20,
  },
  customRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 45,
    alignItems: 'center',
  },
  paddingHorizontal: {
    paddingHorizontal: '8%',
  },
  labelCustom: {
    marginBottom: 0,
    padding: 10,
  },
  agencyForm: {
    flex: 1,
    flexDirection: 'column',
  },
  containerMarginBottom: {
    marginBottom: 50,
  },
  inputSeparation: {
    marginBottom: 18,
  },
  removePaddingHorizontal: {
    paddingHorizontal: 0,
  },
  checkBoxStyle: {
    marginRight: 7,
    width: 20,
    height: 20,
  },
  checkBoxSeparation: {
    marginBottom: 10,
  },
  addressInputContainer: {
    height: 100,
    flexDirection: 'column',
  },
  hiddingButton: {
    zIndex: -5,
  },
  filterContainer: {
    marginTop: 14,
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'baseline',
    flex: 1,
  },
  checkBoxRightMargin: {
    marginRight: 20,
  },
  topSeparation: {
    marginTop: 20,
    paddingVertical: 15,
  },
  positionRelative: {
    position: 'relative',
  },
  sectionButtons: {
    width: '100%',
  },
  marginTop16: {
    marginTop: 16,
  },
  marginTop15: {
    marginTop: 15,
  },
  addressFormContainer: {
    height: '100%',
    backgroundColor: colors.common.white,
  },
  actionContainer: {
    paddingHorizontal: '8%',
    paddingTop: '8%',
    paddingBottom: '2%',
    justifyContent: 'space-between',
  },
  floatSubmit: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: '8%',
    paddingBottom: '8%',
    zIndex: 6,
  },
  zIndexFive: {
    zIndex: 5,
  },
  zIndexNine: {
    zIndex: 9,
  },
  buttonHeight: {
    height: 56,
  },
  bottonSheetDeleteShipping: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  bottonSheetDeleteShipping__text: {
    fontSize: 22,
    color: colors.text.main,
    fontWeight: fonts.titleBold.fontWeight,
    paddingBottom: 10,
  },
});

export default styles;
