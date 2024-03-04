import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, PaletteMode, TextField } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from './getLPTheme';
import AppAppBar from './AppAppBar';
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/rootReducer';
import { Image, createCollection } from '../redux/reducers/userCollections';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const defaultTheme = createTheme({});


export interface CollectionT {
    collectionId: string,
    collectionName: string,
    images: string[]
}

export default function Collections() {
    const [mode, setMode] = React.useState<PaletteMode>('dark');
    const [showCustomTheme, setShowCustomTheme] = React.useState<boolean>(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState<boolean>(false);
    const [selectedCollection, setSelectedCollection] = React.useState<string>('');
    const [modalOpen, setModalOpen] = React.useState(false);
    const [collectionName, setCollectionName] = React.useState<string>('')
    const [collections, setCollections] = React.useState<CollectionT[]>([]);
    const [showCollections, setShowCollections] = React.useState(false);
    const [localCollections, setLocalCollections] = useState<any[]>([]);
    const [selectedCollectionImages, setSelectedCollectionImages] = React.useState<Image[]>([]);


    useEffect(() => {
        const savedCollections = localStorage.getItem('userCollections');
        if (savedCollections !== null) {
            const collections = JSON.parse(savedCollections);
            setLocalCollections(collections); 
            setShowCollections(true);
        }
    }, []); 

    React.useEffect(() => {
        const savedCollections = localStorage.getItem('collections');
        if (savedCollections) {
            setCollections(JSON.parse(savedCollections));
            setShowCollections(true);
        }
    }, []);

    const handleCollectionClick = (collectionId: string, collectionImages: Image[]) => {
        setSelectedCollection(collectionId);
        setSelectedCollectionImages(collectionImages);
        setModalOpen(true);
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const handleCreateCollection = () => {
        const newCollection = {
            collectionId: uuidv4(),
            collectionName: collectionName,
            images: []
        };
        dispatch(createCollection(newCollection))
        setOpen(false)
        setCollections([...collections, newCollection]);

        localStorage.setItem('collections', JSON.stringify([...collections, newCollection]));

        setShowCollections(true);
    }

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => setOpen(false);

    const handleUsernameChange = (event: any) => {
        setCollectionName(event.target.value);
    }


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <CssBaseline />
            <Button variant='outlined' onClick={handleOpen} sx={{ margin: '10% auto', display: "flex" }}>Create collection </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField type="text" placeholder='Collection Name' onChange={handleUsernameChange} />
                    <Button onClick={handleCreateCollection} >Create</Button>
                </Box>
            </Modal>
            {showCollections && (
                <Box sx={{ flexGrow: 6 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center">
                        {localCollections.map(collection => (
                            <Grid xs={2} sm={4} md={4} sx={{ margin: "5px" }} key={collection.collectionId}>
                                <Item sx={{
                                    height: "200px",
                                    width: "300px",
                                    margin: " 0 auto",
                                    marginBottom: "20px"
                                }} onClick={() => handleCollectionClick(collection.collectionId, collection.images)}>
                                    <h2>{collection.collectionName}</h2>
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>

                                {selectedCollectionImages.map((image, index) => (
                                    <ImageListItem key={index}>
                                        <img style={{ width: '200px', height: '200px' }} key={index} src={image.src} alt={`Image ${index}`} />
                                    </ImageListItem>
                                ))}
                            </ImageList>

                            <Button onClick={() => setModalOpen(false)}>Close</Button>
                        </Box>
                    </Modal>
                </Box>
            )}

        </ThemeProvider >
    );
}

