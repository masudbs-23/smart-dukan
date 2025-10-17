import type { ThemeProviderProps as MuiThemeProviderProps } from '@mui/material/styles';

import { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as ThemeVarsProvider } from '@mui/material/styles';

import { createTheme } from './create-theme';
import { useBusiness } from 'src/contexts/BusinessContext';

import type {} from './extend-theme-types';
import type { ThemeOptions } from './types';

// ----------------------------------------------------------------------

export type ThemeProviderProps = Partial<MuiThemeProviderProps> & {
  themeOverrides?: ThemeOptions;
};

export function ThemeProvider({ themeOverrides, children, ...other }: ThemeProviderProps) {
  const { selectedBusiness } = useBusiness();

  const theme = useMemo(() => {
    // Create theme overrides based on selected business
    const businessThemeOverrides: ThemeOptions = selectedBusiness
      ? {
          palette: {
            primary: {
              main: selectedBusiness.theme.primaryColor,
            },
            secondary: {
              main: selectedBusiness.theme.secondaryColor,
            },
            error: {
              main: selectedBusiness.theme.accentColor,
            },
          },
        }
      : {};

    return createTheme({
      themeOverrides: {
        ...businessThemeOverrides,
        ...themeOverrides,
      },
    });
  }, [themeOverrides, selectedBusiness]);

  return (
    <ThemeVarsProvider disableTransitionOnChange theme={theme} {...other}>
      <CssBaseline />
      {children}
    </ThemeVarsProvider>
  );
}
