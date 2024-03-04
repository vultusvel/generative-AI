import React, { useState } from 'react'
import { Box, PaletteMode } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import getLPTheme from './getLPTheme';
import AppAppBar from './AppAppBar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/rootReducer';
import "../App.css"
import Icon from '@mui/material/Icon';
import { green } from '@mui/material/colors';




const defaultTheme = createTheme({});


const Products = () => {

    const [mode, setMode] = React.useState<PaletteMode>('dark');
    const [showCustomTheme, setShowCustomTheme] = React.useState<boolean>(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const products = useSelector((state: RootState) => state.products);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };



    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <CssBaseline />

            <Box sx={{ flexGrow: 1, marginTop: '10%' }} >

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <ImageList sx={{ width: "100%", height: "100%" }}>
                        {products.map((item, index) => (
                            <ImageListItem key={item.image}>
                                <Grid xs={2} sm={4} md={4} key={index}>
                                    <Item>
                                        <img
                                            style={{ width: "220px", height: "220px" }}
                                            srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            src={`${item.image}?w=248&fit=crop&auto=format`}
                                            alt={item.title}
                                            loading="lazy"
                                        />

                                        <ImageListItemBar

                                            title={item.title}
                                            position="below"
                                        >
                                        </ImageListItemBar>
                                        <Icon sx={{ color: green[500] }}>add_circle</Icon>

                                    </Item>

                                </Grid>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
            </Box>
        </ThemeProvider >

    )
}

export default Products