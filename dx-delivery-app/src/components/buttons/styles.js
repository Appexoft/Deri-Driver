import {StyleSheet} from 'react-native';
import {useColors} from '@theme';

// eslint-disable-next-line react-hooks/rules-of-hooks
const colors = useColors();

const styles = StyleSheet.create({
  leftTopBarButton: {
    marginLeft: 20,
  },
  rightTopBarButton: {
    width: 28,
    height: 28,
  },
  mainButton: {
    padding: 12,
    borderRadius: 4,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 150,
    paddingVertical: 15,
  },
  mainButtonRadius: {
    padding: 12,
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 150,
    height: 56,
  },
  mainButtonOutlined: {
    padding: 12,
    borderRadius: 4,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 150,
  },
  mainButtonRadiusOutlined: {
    padding: 12,
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 150,
    height: 56,
  },
  primarySubmitButton: {
    padding: 17,
    borderRadius: 4,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 150,
    backgroundColor: colors.button.main,
  },
  primarySubmitButtonDisabled: {
    backgroundColor: colors.button.disabled,
  },
  normalButton: {
    width: 150,
  },
  largeButton: {
    width: 270,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.common.white,
  },
  cancelButton: {
    justifyContent: 'center',
    width: 170,
    alignSelf: 'center',
  },
  borderWidth: {
    borderWidth: 1,
  },
  buttonWithPicture: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 6,
    paddingHorizontal: 6,
    height: 44,
  },
  burgerWidth: {
    width: 20,
  },
  scannerButton: {
    width: 18,
    height: 22,
  },
  motorcycleIcon: {
    height: 30,
    width: 30,
  },
  buttonStyleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  buttonTouchable: {
    justifyContent: 'center',
  },
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,

    elevation: 6,
  },
  uniqueButton: {
    padding: 10,
  },
  rowImg: {
    marginHorizontal: 20,
  },
  packageSize: {
    height: 60,
    width: 63,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 9},
    elevation: 4,
  },
  packageText: {
    fontSize: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.main,
  },
  tooltipPadding: {
    padding: 10,
  },
  imageMargin: {
    marginRight: 10,
  },
  link: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
  },
  buttonContainer: {
    marginVertical: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  modalContainer: {
    width: 278,
    height: 264,
    borderRadius: 4,
    borderColor: colors.border.modal,
    borderWidth: 1,
    paddingBottom: 0,
    paddingTop: 0,
    overflow: 'visible',
  },
  fullWidthContent: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  separation: {
    borderBottomWidth: 1.5,
    borderColor: colors.border.main,
    justifyContent: 'center',
    flex: 1,
  },
  removeBorder: {
    borderBottomWidth: 0,
  },
  activeText: {
    color: colors.button.main,
  },
  imageSize: {
    width: 24,
    height: 24,
  },
  arrowSize: {
    width: 0,
    height: 0,
  },
  floatButton: {
    width: 60,
    height: 60,
    bottom: 40,
    right: 40,
  },
  positionRelative: {
    zIndex: 1,
    position: 'absolute',
    bottom: 25,
    right: 15,
    width: 46,
    height: 46,
  },
  borderWith: {
    borderWidth: 1,
  },
  buttonStatus: {
    minWidth: 30,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 15,
    paddingLeft: 15,
  },
  buttonStatus__title: {
    fontSize: 12,
  },
  rightHeaderActions: {
    paddingRight: 10,
    width: 100,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rightHeaderBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.border.main,
    marginHorizontal: 6,
  },
  editBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.common.secondary,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: colors.common.secondary,
  },
  editIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.common.white,
    width: 32,
    height: 32,
    borderRadius: 50,
    borderColor: colors.common.white,
  },
  textEdit: {
    color: colors.common.white,
    paddingHorizontal: 8,
    fontSize: 12,
    fontWeight: '400',
  },
});

export default styles;
