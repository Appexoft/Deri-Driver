import theme from '@theme';
import React, {createContext, useContext} from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = props => (
  <ThemeContext.Provider value={theme}>{props.children}</ThemeContext.Provider>
);

const useTheme = () => {
  const appTheme = useContext(ThemeContext);

  return appTheme;
};

export default useTheme;
