import config from "../../../config";
import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";
import {
    HomeOutlined,
    LibraryBooksOutlined,
    SearchOutlined,
} from "@mui/icons-material";
import useAuth from "../../../Hook/useAuth";
import { useEffect, useState } from "react";
import PlaylistNavCard from "../../Component/PlaylistCard/PlaylistNavCard";
import styled from "@emotion/styled";
import usePlaylist from "../../../Hook/usePlaylist";

function NavBar() {
    const theme = useTheme();
    const auth = useAuth();
    const {playlist} = usePlaylist();

    

    const style = {
        gridArea: "nav-bar",
        gap: "10px",
        display: "flex",
        flexDirection: "column",
        minWidth: 300,
        borderRadius: theme.borderRadius.one,
        backgroundColor: theme.palette.background.default,
    };
    const navMenuStyle = {
        backgroundColor: theme.palette.background.container,
        "&::-webkit-scrollbar": {
            width: "5px",
            borderRadius: "4px",
            backgroundColor: theme.palette.background.paper,
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "4px",
        },
        "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
    };
    const StyledPlaylistTitle = styled(Typography)(({ theme }) => ({
        fontSize: 24,
        padding: "30px",
        fontWeight: "bold",
        color: theme.palette.primary.main,
        paddingBottom: 8,
        marginBottom: 12,
    }));
    return (
        <Box component="nav" sx={style} overflow="hidden">
            <List sx={{ padding: 0 }}>
                <Box sx={navMenuStyle}>
                    <NavMenuItem to={config.routes.home}>
                        <HomeOutlined />
                        <Typography variant="h5">Home</Typography>
                    </NavMenuItem>
                    <NavMenuItem to={config.routes.search}>
                        <SearchOutlined />
                        <Typography variant="h5">Search</Typography>
                    </NavMenuItem>
                    <NavMenuItem to={config.routes.library}>
                        <LibraryBooksOutlined />
                        <Typography variant="h5">Library</Typography>
                    </NavMenuItem>
                </Box>
            </List>

            <Box sx={navMenuStyle} height="100%">
                {playlist && (
                    <StyledPlaylistTitle>PlayList:</StyledPlaylistTitle>
                )}
                {playlist &&
                    playlist.map((playlist,index) => {
                        return <PlaylistNavCard key={index} playlist={playlist} />;
                    })}
            </Box>
        </Box>
    );
}

const NavMenuItem = ({ to, children }) => {
    return (
        <ListItem component="li">
            <Box
                display="flex"
                alignItems="center"
                component={NavLink}
                to={to}
                sx={{
                    color: "grey",
                    "&:hover,&.active": { color: "white" },
                    margin: 0,
                    display: "flex",
                    gap: "20px",
                    fontWeight: "bold",
                    textDecoration: "none",
                    paddingLeft: "2rem", // Add more padding on the left side
                }}
                fontSize={20}
            >
                {children}
            </Box>
        </ListItem>
    );
};

export default NavBar;
export { NavMenuItem };
