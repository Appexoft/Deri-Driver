/* eslint-disable react-hooks/rules-of-hooks */
import {StyleSheet} from 'react-native';
import {useFonts, useColors} from '@theme';

const fonts = useFonts();
const colors = useColors();

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.common.white,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 5,
  },
  separation: {
    marginBottom: 20,
  },
  inputsContainer: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  customFieldsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contentContainerStyle: {
    minHeight: '100%',
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  inputStyle: {
    marginBottom: 10,
  },
  labelStyle: {
    marginBottom: 3,
  },
  alertText: {
    ...fonts.secondaryText,
    color: colors.text.secondary,
  },
  error: {
    marginBottom: 10,
    color: colors.status.error.main,
  },
  checkBoxStyle: {
    marginRight: 7,
    width: 20,
    height: 20,
  },
  addressInputContainer: {
    height: 110,
  },
  removeTopPadding: {
    paddingTop: 0,
  },
});

export default styles;
