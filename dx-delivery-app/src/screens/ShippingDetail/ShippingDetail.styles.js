import {StyleSheet} from 'react-native';
import {useColors} from '@theme';
import {useFonts} from '../../theme';

// eslint-disable-next-line react-hooks/rules-of-hooks
const colors = useColors();
// eslint-disable-next-line react-hooks/rules-of-hooks
const fonts = useFonts();

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  shippingNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'baseline',
    width: '100%',
    justifyContent: 'center',
    marginRight: 10,
  },
  topSection: {
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  value: {
    fontWeight: '400',
    fontSize: 14,
    flexWrap: 'wrap',
    maxWidth: '80%',
  },
  separation: {
    marginBottom: 10,
  },
  emptyContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  photoContainer: {
    marginRight: 10,
    marginBottom: 10,
  },

  containerSeparation: {
    marginBottom: 20,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  mainButtonContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  mainButton: {paddingVertical: 15, marginBottom: 30, marginTop: 10},
  cancelButtonContainer: {
    height: 40,
    justifyContent: 'center',
    marginBottom: 20,
  },
  flexContainer: {
    flex: 1,
  },
  section: {
    paddingHorizontal: '8%',
    paddingVertical: 20,
  },
  createContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalView: {
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  deleteModalTitle: {
    fontSize: 26,
    fontWeight: '400',
    marginVertical: 15,
  },
  deleteModalLabel: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 50,
  },
  deleteIcon: {
    height: 120,
    width: 120,
  },
  modalAction: {
    marginHorizontal: 5,
  },
  closeModalButton: {
    alignItems: 'flex-end',
    width: '100%',
    marginRight: 10,
  },
  onlyRow: {
    flexDirection: 'row',
  },
  marginRight: {
    marginRight: 8,
  },
  tinyMarginTop: {
    marginTop: 5,
  },
  alignStart: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  minHeightFull: {
    minHeight: '100%',
  },
  rightSeparation: {
    marginRight: 10,
  },
  createShippingDetailContainer: {
    backgroundColor: colors.common.white,
    flex: 1,
    paddingBottom: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  createShippingDetailScrollable: {
    paddingTop: 40,
  },
  submitSeparation: {
    marginTop: 20,
  },
  containerAlert: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.status.info.background,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 14,
    paddingLeft: 14,
    borderRadius: 4,
    marginTop: 0,
    marginRight: 10,
  },
  inputIcon: {
    height: 24,
    width: 24,
  },
  titleAlert: {
    paddingLeft: 10,
    color: colors.common.white,
    marginRight: 13,
    fontWeight: '400',
    width: '80%',
  },
  cadet: {},
  noCadet: {
    display: 'flex',
    alignItems: 'center',
  },
  noCadet__title: {
    fontSize: 22,
    fontWeight: '800',
    paddingBottom: 23,
    paddingTop: 17,
  },
  noCadet__subtitle: {
    color: colors.common.darkGray,
    paddingBottom: 36,
    textAlign: 'center',
    lineHeight: 25,
    width: 317,
  },
  cadet__seachCadet: {
    paddingBottom: 10,
  },
  paddingTop10: {
    paddingTop: 10,
  },
});

export default styles;
