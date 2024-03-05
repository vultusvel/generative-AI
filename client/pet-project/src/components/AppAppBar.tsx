import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, PaletteMode, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import ToggleColorMode from './ToggleColorMode';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutFrom } from '../redux/reducers/authReducer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/rootReducer';
import { url } from '../url';

interface AppAppBarProps {
    mode: PaletteMode;
    toggleColorMode: () => void;
}

function AppAppBar({ mode, toggleColorMode }: AppAppBarProps) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const data = useSelector((state: RootState) => state.collections.userCollections)
    let user: any
    const userSessionData = sessionStorage.getItem('user');
    if (userSessionData) {
        user = JSON.parse(userSessionData);
    } else {
        console.log('User session data not found');
    }

    useEffect(() => {
        const sendDataToServer = async () => {
            try {
                let token;
                const tokenString = sessionStorage.getItem('user');

                if (tokenString) {
                    try {
                        let obj = JSON.parse(tokenString);
                        token = obj.accessToken;
                    } catch (error) {
                        console.error('Error parsing token:', error);
                    }
                }
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.post(`${url}/auth/collections`, { data, user }, config);
                const userCollections = response.data.userCollections;
                localStorage.setItem('userCollections', JSON.stringify(userCollections));
            } catch (error) {
                console.error('Error sending data:', error);
            }
        };

        sendDataToServer();
    }, [data]);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleLogOut = () => {
        dispatch(signOutFrom())
        sessionStorage.setItem('user', JSON.stringify({
            userData: {
                _id: "",
                username: "",
            },
            accessToken: "",
        }));
        navigate("/")
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <NavLink to={"/collections"} style={{ textDecoration: 'none', color: "#fff" }} >
                <List>
                    {['Collections'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </NavLink>
            <Divider />
            <NavLink to={"/chat"} style={{ textDecoration: 'none', color: "#fff" }} >
                <List>
                    {['Chat Bot'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </NavLink>
            <NavLink to={"/shop"} style={{ textDecoration: 'none', color: "#fff" }} >
                <List>
                    {['Shop'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </NavLink>
            <NavLink to={"/cart"} style={{ textDecoration: 'none', color: "#fff" }} >
                <List>
                    {['Cart'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </NavLink>
        </Box>
    );
    return (
        <div style={{ marginLeft: "40px" }}>

            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            bgcolor:
                                theme.palette.mode === 'light'
                                    ? 'rgba(255, 255, 255, 0.4)'
                                    : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        })}
                    >
                        <Box sx={{
                            marginLeft: "20%"
                        }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                                <Button onClick={toggleDrawer(true)}>Open menu</Button>
                            </Box>
                            <Drawer open={open} onClose={toggleDrawer(false)}>
                                {DrawerList}
                            </Drawer>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Button onClick={handleLogOut} >Sign Out</Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default AppAppBar;