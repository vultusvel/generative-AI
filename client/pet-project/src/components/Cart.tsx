import React, { useState } from 'react'
import { PaletteMode } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from './getLPTheme';
import AppAppBar from './AppAppBar';
import CssBaseline from '@mui/material/CssBaseline';

const defaultTheme = createTheme({});

const Cart = () => {
    const [mode, setMode] = useState<PaletteMode>('dark');
    const [showCustomTheme, setShowCustomTheme] = React.useState<boolean>(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };
  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
    <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
    <CssBaseline />
    </ThemeProvider>

  )
}

export default Cart