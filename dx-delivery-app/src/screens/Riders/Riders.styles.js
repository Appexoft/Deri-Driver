import {StyleSheet} from 'react-native';
import {useColors, useFonts} from '@theme';

// eslint-disable-next-line react-hooks/rules-of-hooks
const colors = useColors();
// eslint-disable-next-line react-hooks/rules-of-hooks
const fonts = useFonts();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 28,
    justifyContent: 'space-around',
  },
  searchInputContainer: {
    width: '100%',
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexContainer: {
    flex: 1,
  },
  title: {
    color: colors.text.main,
    fontSize: 12,
    fontWeight: '700',
    paddingTop: 43,
    paddingBottom: 34,
  },
  paddingView: {
    padding: 30,
  },
  sectionCardCadet: {
    paddingTop: 25,
    paddingBottom: 25,
  },
  titleCadet: {
    fontSize: fonts.titleSmall2.fontSize,
    fontWeight: fonts.titleSmall2.fontWeight,
    color: fonts.titleSmall2.color,
  },
  cardCadet: {
    borderWidth: 1,
    borderColor: colors.border.card,
    borderRadius: 8,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 19,
    paddingLeft: 19,
  },
  cardCadetActive: {
    borderWidth: 1,
    borderColor: colors.button.main,
    borderRadius: 8,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 19,
    paddingLeft: 19,
  },
  cardCadet__flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardCadet__title: {
    paddingLeft: 24,
    fontSize: fonts.secondaryText.fontSize,
    fontWeight: fonts.label.fontWeight,
  },
  paddingBottomCardCadet: {
    paddingBottom: 10,
  },
  mainButton: {
    paddingVertical: 16,
  },
});

export default styles;
