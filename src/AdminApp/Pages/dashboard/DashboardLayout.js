import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
// @mui
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
//
import { PlayTimeChart } from "../../Component/PlayTimeChart";
import { DashboardHome } from "./Tab";
import { DashboardNav } from "./Nav";
import { CssBaseline } from "@mui/material";
import { AlbumTable, PlaylistTable, SongTable, UserTable } from "../../Component/Table";
import { SongEdit, SongUpload } from "../../Component/Song";
import ModelTrain from "../../Component/ModelTrain/ModelTrain";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const Root = styled("div")({
    display: "grid",
    gridGap: "10px",
    height: "100%",
    gridTemplateAreas: `'top-bar top-bar top-bar'
                            'nav-bar main-view right-sidebar'
                            'footer footer footer'`,
    gridTemplateColumns: "auto 1fr",
    gridTemplateRows: "auto 1fr auto",
    height: "100%",

    minHeight: "100%",
    width: "100%",
});

const Main = styled("div")(({ theme }) => ({
    gridArea: "main-view/main-view/main-view/right-sidebar",
    overflowY: "scroll",
    overflowX: "hidden",
    padding: "20px",

    zIndex: 0,
    "&::-webkit-scrollbar": {
        display: "none",
    },

    /* Hide scrollbar for IE, Edge and Firefox */

    msOverflowStyle: "none" /* IE and Edge */,
    scrollbarWidth: "none" /* Firefox */,
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
    const theme = createTheme();

    return (
        <Root>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <DashboardNav />
                <Main>
                    <Routes>
                        <Route index element={<DashboardHome />} />
                        <Route path="user" element={<UserTable />} />
                        <Route path="playlist" element={<PlaylistTable />} />
                        <Route path="album" element={<AlbumTable />} />
                        <Route path="song" element={<SongTable />} />
                        <Route path="song/:id" element={<SongEdit />} />
                        <Route path="song/upload" element={<SongUpload />} />
                        <Route path="model" element = {<ModelTrain/>}/>
                    </Routes>
                </Main>
            </ThemeProvider>
        </Root>
    );
}
