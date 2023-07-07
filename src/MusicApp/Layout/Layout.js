import NavBar from "./Navigation/NavBar";
import MusicPlayer from "./MusicPlayer/MusicPlayer";
import Header from "./Header/Header";
import ContentPanel from "./ContentPanel/ContentPanel";
import {
    NavLink,
    Outlet,
    redirect,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { AppBar, Box, Button, Dialog, Modal } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useEffect, useLayoutEffect, useState } from "react";
import MusicPlayerProvider from "../../Context/MusicPlayerProvider";
import ThemeProvider from "../../Context/ThemeProvider";
import PlaylistProvider from "../../Context/PlaylistProvider";

function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state;
    const theme = useTheme().palette;
    const [open, setOpen] = useState(false);

    const layoutStyle = {
        display: "grid",
        gridGap: "10px",
        height: "100%",
        gridTemplateAreas: `'top-bar top-bar top-bar'
                            'nav-bar main-view right-sidebar'
                            'now-playing-bar now-playing-bar now-playing-bar'`,
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "auto 1fr auto",
        height: "100%",

        minHeight: "100%",
        width: "100%",
        backgroundColor: "#000",
        paddingX: "10px",
    };
    return (
        <MusicPlayerProvider>
            <PlaylistProvider>
                <ThemeProvider>
                    <Box sx={layoutStyle}>
                        <Dialog open={state?.auth == true}>
                            <Button
                                onClick={() => {
                                    navigate({
                                        pathname: ".",
                                        state: { auth: false },
                                    });
                                }}
                            >
                                back
                            </Button>
                        </Dialog>
                        <Header />
                        <NavBar />

                        <ContentPanel>
                            <Outlet />
                        </ContentPanel>
                        <MusicPlayer />
                    </Box>
                </ThemeProvider>
            </PlaylistProvider>
        </MusicPlayerProvider>
    );
}

export default Layout;
