import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "@mui/material/Link";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../providers/AuthProvider";

export default function Navbar() {
    const authContext = useAuth();
    const [anchorEl, setAnchorEl] = React.useState<any | null>(null);

    const handleMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const navigate = useNavigate();
    let myProfile = 'Mon espace'

    const handleClose = () => {
        setAnchorEl(null);
    };


    if (!authContext.currentUser?.isAdmin) {
        myProfile += ' assuré'
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Link
                        sx={{
                            width: "fit-content",
                        }}
                        href="/"
                    >
                        <Box
                            component="img"
                            sx={{
                                padding: 1,
                                height: 100,
                                width: 150,
                                maxHeight: {xs: 150, md: 100},
                                maxWidth: {xs: 300, md: 250},
                            }}
                            alt="WIC"
                            src="/wic.png"
                        />
                    </Link>
                    <Box
                        component="div"
                        sx={{
                            marginLeft: "auto",
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle/>
                            <Typography component="span" pl={1}>
                                {myProfile}
                            </Typography>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {authContext.currentUser !== undefined && (
                                <div>
                                    {!authContext.currentUser.isAdmin && (
                                        <div>
                                            <MenuItem onClick={(e) => {
                                                navigate("/user/profile")
                                                handleClose()
                                            }}>Mon profil</MenuItem>
                                            <MenuItem onClick={(e) => {
                                                navigate("/user/quote")
                                                handleClose()
                                            }}>Mes demandes de devis
                                            </MenuItem>
                                            <MenuItem onClick={(e) => {
                                                navigate("/user/contract")
                                                handleClose()
                                            }}>Mes contrats</MenuItem>
                                            <MenuItem onClick={(e) => {
                                                navigate("/accident")
                                                handleClose()
                                            }}>Déclarer un sinistre
                                            </MenuItem>
                                            <MenuItem onClick={(e) => {
                                                navigate("/user/accident")
                                                handleClose()
                                            }}>Mes déclarations de sinistre
                                            </MenuItem>
                                        </div>
                                    )}

                                    {authContext.currentUser.isAdmin && (
                                        <MenuItem onClick={(e) => {
                                            navigate("/admin")
                                            handleClose()
                                        }}>Page admin</MenuItem>
                                    )}

                                    <MenuItem onClick={(e) => {
                                        navigate("/")
                                        authContext.logout()
                                        handleClose()
                                    }}>Déconnexion</MenuItem>
                                </div>
                            )}
                            {authContext.currentUser === undefined && (
                                <div>
                                    <MenuItem onClick={(e) => {
                                        navigate("/user/signin")
                                        handleClose()
                                    }}>Se connecter</MenuItem>
                                    <MenuItem onClick={(e) => {
                                        navigate("/user/signup")
                                        handleClose()
                                    }}>S'inscrire</MenuItem>
                                </div>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
