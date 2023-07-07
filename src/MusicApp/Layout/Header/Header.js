import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import useAuth from "../../../Hook/useAuth";
import {
    ArrowBackIosNewRounded,
    ArrowForwardIosRounded,
    Login,
} from "@mui/icons-material";
import SearchBar from "./SearchBar";
import useMusicPlayer from "../../../Hook/useMusicPlayer";

const style = {
    gridArea: "main-view",
    position: "relative",
    zIndex: 100,
    height: "64px",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
};

const backgroundStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "var(--header)",
    backgroundColor: "rgba(0,0,0,0.6)",
    opacity: "var(--header-opacity)",
};

export default function Header() {
    const auth = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const [basePath, setBasePath] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const musicPlayer = useMusicPlayer();

    useEffect(() => {
        const base = location.pathname.split("/");
        if (base.length > 0) {
            setBasePath(base[1]);
        }
    }, [location.pathname]);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        handleClose();
        navigate(`/profile/${auth.auth.id}`);
    };

    const handleLogout = () => {
        musicPlayer.logOut();
        setAnchorEl(null);
        auth.logout();
    };

    return (
        <Box component="header" sx={style}>
            <Box sx={backgroundStyle}></Box>
            <Box display="flex" gap={3}>
                <Box
                    display="flex"
                    height="100%"
                    width="100px"
                    gap={2}
                    paddingX={1}
                >
                    <IconButton
                        onClick={() => {
                            if (location.key != "default") navigate(-1);
                        }}
                    >
                        <ArrowBackIosNewRounded />
                    </IconButton>
                    <IconButton onClick={() => navigate(1)}>
                        <ArrowForwardIosRounded />
                    </IconButton>
                </Box>
                <Box>{basePath == "search" && <SearchBar />}</Box>
            </Box>

            {auth.auth ? (
                <Box>
                    <IconButton
                        fontSize="3rem"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle fontSize="3rem" />
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
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                        {auth.auth.role == 'Admin' && <MenuItem onClick={() => navigate('/admin')}>Admin Page</MenuItem>}
                    </Menu>
                </Box>
            ) : (
                <Box>
                    <IconButton onClick={() => navigate("/Auth/login")}>
                        <Login />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
}
