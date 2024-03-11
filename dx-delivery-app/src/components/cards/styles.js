import {StyleSheet, Platform} from 'react-native';
import {useColors} from '@theme';
// eslint-disable-next-line react-hooks/rules-of-hooks
const colors = useColors();

const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 19,
    borderRadius: 8,
    minHeight: 136,
    justifyContent: 'space-between',
    fontSize: 14,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  secondaryLabel: {
    fontFamily: 'Avenir',
    fontWeight: '800',
    fontSize: 14,
  },
  textUnified: {
    flexDirection: 'row',
  },
  date: {
    fontSize: 14,
    fontWeight: '400',
  },
  direction: {
    fontFamily: 'Avenir',
    fontWeight: '400',
    fontSize: 14,
    maxWidth: '80%',
  },
  orderState: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  orderStateText: {
    fontFamily: 'IBMPlexSans-Regular',
    textAlign: 'center',
    fontSize: 12,
  },
  centeredContent: {
    justifyContent: 'center',
    minHeight: 76,
  },
  rowCenteted: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },
  imageContainer: {
    marginRight: 24,
  },
  raiderName: {
    fontWeight: '500',
    fontSize: 14,
  },
  selected: {
    borderWidth: 3,
  },
  shippingCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    minHeight: 70,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  flex: {
    flex: 1,
  },
  checkBoxSeparation: {
    marginRight: 10,
  },
  stateRow: {
    alignItems: 'center',
    marginBottom: 10,
  },
  motorcycleIcon: {
    height: 20,
    width: 20,
  },
  removeMarginBottom: {
    marginBottom: 0,
  },
  riderClientContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  mlStatus: {
    backgroundColor: colors.layout.overlay,
  },
  marginRight: {
    marginRight: 8,
  },
  topSeparation: {
    marginTop: 16,
  },
  alignBottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomSeparation: {
    borderColor: colors.border.main,
    borderBottomWidth: 1,
  },
  dateRow: {
    minHeight: 68,
    alignItems: 'center',
  },
  dateRowText: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 14,
  },
  dropdownImage: {
    marginLeft: 5,
  },
  alignBaseline: {
    flexDirection: 'row',
    alignItems: isIOS ? 'flex-end' : 'baseline',
  },
  clientContainer: {
    alignItems: 'center',
    minHeight: 48,
    paddingHorizontal: 20,
  },
  clientText: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Bold',
  },
  enableWrap: {
    flexWrap: 'wrap',
    marginTop: 10,
  },
  bigMaxWidth: {
    maxWidth: '95%',
  },
  checkBoxStyle: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  listContainer: {
    paddingHorizontal: 21,
    flex: 1,
    justifyContent: 'center',
  },
  filterContainer: {
    marginHorizontal: 21,
    marginTop: 14,
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: isIOS ? 'flex-start' : 'baseline',
  },
  openedFilter: {
    minHeight: 250,
  },
  closedContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  closedMargin: {
    marginBottom: 20,
  },
  openMargin: {
    marginTop: 20,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    marginRight: 12,
    backgroundColor: colors.common.gray,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default styles;
