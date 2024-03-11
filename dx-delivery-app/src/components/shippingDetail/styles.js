import {StyleSheet} from 'react-native';
import {useColors, useFonts} from '@theme';

// eslint-disable-next-line react-hooks/rules-of-hooks
const colors = useColors();
// eslint-disable-next-line react-hooks/rules-of-hooks
const fonts = useFonts();

const styles = StyleSheet.create({
  row: {
    alignItems: 'baseline',
    marginBottom: 10,
  },
  horizontalSpacer: {
    width: 10,
  },
  bottomSheetModal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetModal__title: {
    paddingTop: 20,
    fontSize: fonts.titleBold.fontSize,
    fontWeight: fonts.titleBold.fontWeight,
    color: fonts.titleBold.color,
    lineHeight: 23,
    textAlign: 'center',
  },
  bottomSheetModal__address: {
    paddingTop: 4,
    fontSize: fonts.secondaryText.fontSize,
    fontWeight: fonts.secondaryText.fontWeight,
    lineHeight: 25,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  timeAndDistance: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
    paddingTop: 10,
  },
  timeAndDistance__timer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeAndDistance__timer__clock: {
    paddingLeft: 7,
  },
  contact: {
    borderTopColor: colors.border.main,
    borderTopWidth: 1,
    borderBottomColor: colors.border.main,
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 13,
  },
  contact__phone: {
    textAlign: 'center',
    paddingBottom: 15,
    paddingTop: 15,
    color: colors.text.secondary,
  },
  error: {
    display: 'flex',
    backgroundColor: colors.status.info.background,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,
    paddingTop: 8,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 15,
  },
  error__icon: {
    paddingRight: 15,
    paddingLeft: 15,
  },
  error__text: {
    paddingRight: 14,
  },
  error__text__marginTop10: {
    marginTop: 10,
  },
  error__text__normal: {
    color: colors.common.white,
    fontSize: fonts.secondaryText.fontSize,
  },
  error__text__bold: {
    color: colors.common.white,
    fontSize: fonts.secondaryText.fontSize,
    fontWeight: fonts.mainText.fontWeight,
  },
  error__text__normal_lineheight: {
    color: colors.common.white,
    fontSize: fonts.secondaryText.fontSize,
    lineHeight: 1,
  },
  titlePackage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 21,
  },
  titlePackage__title: {
    fontSize: fonts.boldTitle.fontSize,
    fontWeight: fonts.boldTitle.fontWeight,
    color: colors.text.main,
  },
  sectionInputRadio: {
    paddingBottom: 15,
  },
  sectionInputFragile: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  actionBarShippingDetail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionBarShippingDetail__row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBarShippingDetail__editAndUpdate_delete: {
    paddingLeft: 8,
  },
  shippingDetailDataContainer: {
    paddingTop: 23,
  },
  shippingDetailDataContainer__shippingCard: {
    paddingBottom: 16,
  },
  shippingDetailData: {
    display: 'flex',
    flexDirection: 'row',
    width: 'auto',
  },
  shippingDetailData__image: {
    width: 30,
    display: 'flex',
    alignItems: 'center',
  },
  shippingDetailData__data: {
    paddingLeft: 13,
  },
  shippingDetailData__data__title: {
    color: fonts.titleSmall.color,
    fontWeight: fonts.titleSmall.fontWeight,
    fontSize: fonts.titleSmall.fontSize,
    lineHeight: 18,
  },
  shippingDetailData__data__data: {
    fontSize: 15,
    color: colors.text.black,
    fontWeight: fonts.titleSmall.fontWeight,
    lineHeight: 20,
  },
  shippingDetailPriceAndPdf: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shippingDetailDataPrice: {
    paddingTop: 32,
    paddingBottom: 32,
  },
  GuardarPDF: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  GuardarPDF__title: {
    color: colors.common.secondary,
    fontSize: 13,
    paddingLeft: 8,
  },
  GuardarPDF__titleIsUnderline: {
    color: colors.common.secondary,
    fontSize: 13,
    paddingLeft: 8,
    textDecorationLine: 'underline',
  },
  shippingDetailPrice__title: {
    color: fonts.titleSmall.color,
    fontWeight: fonts.titleSmall.fontWeight,
    fontSize: fonts.titleSmall.fontSize,
    lineHeight: 18,
  },
  shippingDetailPrice__price: {
    color: fonts.titleBig.color,
    fontWeight: fonts.titleBig.fontWeight,
    fontSize: fonts.titleBig.fontSize,
  },
  shippingDetailComment__title: {
    color: fonts.titleSmall2.color,
    fontWeight: fonts.titleSmall2.fontWeight,
    fontSize: fonts.titleSmall2.fontSize,
  },
  shippingDetailPrice__padding: {
    paddingBottom: 10,
  },
  shippingDetailComments__comment: {
    color: colors.text.black,
    fontWeight: fonts.secondaryText.fontWeight,
    fontSize: fonts.secondaryText.fontSize,
    paddingBottom: 32,
  },
  bottomSheetEditShipping: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: 22,
  },
  bottomSheetEditShipping__text: {
    fontSize: 16,
    color: colors.text.main,
    fontWeight: fonts.titleBold.fontWeight,
    paddingBottom: 32,
  },
  bottomSheetEditShipping__checkboxes: {
    marginHorizontal: 42,
  },
  bottomSheetEditShipping__buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 20,
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
  buttonHeight: {
    height: 56,
  },
  marginTop16: {
    marginTop: 16,
  },
  marginTop15: {
    marginTop: 15,
  },
});

export default styles;
