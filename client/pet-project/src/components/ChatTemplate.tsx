import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from './getLPTheme';
import AppAppBar from './AppAppBar';
import ChatBot from './ChatBot';

const defaultTheme = createTheme({});

export default function ChatTemplate() {
    const [mode, setMode] = React.useState<PaletteMode>('dark');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

  
    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
             <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <CssBaseline />
            <ChatBot/>
        </ThemeProvider>
    );
}