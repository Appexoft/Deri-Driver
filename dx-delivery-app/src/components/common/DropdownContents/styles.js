import {StyleSheet} from 'react-native';
import {useColors} from '@theme';

// eslint-disable-next-line react-hooks/rules-of-hooks
const colors = useColors();

const styles = StyleSheet.create({
  containerOptions: {
    borderColor: colors.border.main,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  imgTitleOption: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerIcon: {
    backgroundColor: colors.background.background1,
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  containerIcon2: {
    backgroundColor: colors.background.background1,
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  iconImg: {
    height: 20,
  },
  titleOption: {
    color: colors.text.main,
    fontWeight: '500',
  },
  dataOption: {
    color: colors.text.secondary,
    width: '90%',
  },
  priceOption: {
    color: colors.text.main,
    fontWeight: '900',
  },
  displayContainerDropdownModal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  paddingLeft10: {
    paddingLeft: 10,
  },
  pickerInput: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  zIndexTwo: {
    zIndex: 2,
  },
  extraBorderRadius: {
    borderRadius: 12,
  },
  selected: {
    borderColor: colors.common.black,
  },
});

export default styles;
