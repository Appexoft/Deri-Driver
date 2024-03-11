import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const DEFAULT_KEYBOARD_VERTICAL_OFFSET = Platform.select({ios: 84});

const useKeyboardAvoidingViewProps = (disableOffset = false) => {
  const insets = useSafeAreaInsets();
  return {
    behavior: Platform.select({
      ios: 'padding',
    }),
    keyboardVerticalOffset: Platform.select({
      ios: disableOffset ? 0 : DEFAULT_KEYBOARD_VERTICAL_OFFSET + insets.bottom,
    }),
    style: {
      flex: 1,
    },
  };
};

export default useKeyboardAvoidingViewProps;
