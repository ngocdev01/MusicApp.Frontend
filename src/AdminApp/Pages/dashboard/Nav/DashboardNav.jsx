import React from "react";
import {
    AlbumRounded,
    DashboardCustomizeRounded,
    ModelTrainingRounded,
    MusicNoteOutlined,
    Person2Outlined,
    PlaylistPlayRounded,
} from "@mui/icons-material";
import { Box, Card, List, ListItem, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const style = {
    gridArea: "nav-bar",
    display: "flex",
    flexDirection: "column",
    minWidth: 300,
    height: "100%",
    borderRadius: 8,
    background: "linear-gradient(135deg, #f1f1f1, #ffffff)",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
};

const linkStyle = {
    "&:hover,&.active": {
        color: "white",
        background: "linear-gradient(135deg, #0e4eff, #7f00ff)",
    },
    color: "#black",
    width: '100%',
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "12px 16px",
    borderRadius: 4,
    transition: "background-color 0.3s",
};

const activeLinkStyle = {
    ...linkStyle,
    color: "#ffffff",
    backgroundColor: "#1976d2",
};

export default function DashboardNav() {
    return (
        <Box component="nav" sx={style} overflow="hidden">
            <Typography
                variant="h5"
                color="primary"
                fontWeight="bold"
                textAlign="center"
                p={2}
            >
                Dashboard
            </Typography>
            <List sx={{ padding: 0 }}>
                <NavMenuItem to="" exact>
                    <DashboardCustomizeRounded />
                    Home
                </NavMenuItem>
                <NavMenuItem to="user">
                    <Person2Outlined />
                    User
                </NavMenuItem>
                <NavMenuItem to="song">
                    <MusicNoteOutlined />
                    Song
                </NavMenuItem>
                <NavMenuItem to="playlist">
                    <PlaylistPlayRounded />
                    Playlist
                </NavMenuItem>
                <NavMenuItem to="album">
                    <AlbumRounded />
                    Album
                </NavMenuItem>
                <NavMenuItem to="model">
                    <ModelTrainingRounded />
                    Model Train
                </NavMenuItem>
            </List>
        </Box>
    );
}

const NavMenuItem = ({ to, children }) => {
    return (
        <ListItem component="li">
            <Box
                component={NavLink}
                to={to}
                sx={linkStyle}
 
            >
                {children}
            </Box>
        </ListItem>
    );
};
