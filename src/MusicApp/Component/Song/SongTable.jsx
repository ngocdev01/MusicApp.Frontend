import React, { useState, useRef } from "react";
import {
    Box,
    Divider,
    IconButton,
    InputBase,
    alpha,
    useMediaQuery,
    List,
    ListItemButton,
} from "@mui/material";
import SongCard from "./SongCard";
import styled from "@emotion/styled";
import {
    AlbumRounded,
    Person2Rounded,
    PlayArrowRounded,
    PlaylistAddRounded,
    QueueMusicRounded,
    SearchOffRounded,
    SearchRounded,
} from "@mui/icons-material";
import useMusicPlayer from "../../../Hook/useMusicPlayer";
import ContextMenu from "../ContextMenu";
import usePlaylist from "../../../Hook/usePlaylist";
import SearchableList from "../SearchList/SearchableList";
import { useNavigate } from "react-router-dom";
import useAuthorizeRequest from "../../../Hook/useAuthorizeRequest";
import { ApiRoutes, ApiUrl } from "../../../Api/apiConfig";

function SongTable({ songs, onPlay, onMenu, sort = false }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const tableRef = useRef(null);

   

    const isTabletOrAbove = useMediaQuery("(min-width: 1200px)");
    const isMobile = useMediaQuery("(max-width: 1000px)");

    const visibleColumns = isTabletOrAbove ? ["albums"] : [];

    const handleSort = (column) => {
        if(!sort) return;
        if (sortColumn === column) {
            setSortDirection((sortDirection) =>
                sortDirection === "asc" ? "desc" : "asc"
            );
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };


    const handleToggleSearch = () => {
        if (isSearchVisible) {
            setSearchTerm("");
        }
        setIsSearchVisible((isSearchVisible) => !isSearchVisible);
    };

  
    const filteredSongs = songs.filter((song) =>
        song.song.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedSongs = filteredSongs.sort((a, b) => {
        if (sortColumn === "index") {
            return sortDirection === "asc"
                ? songs.indexOf(a) - songs.indexOf(b)
                : songs.indexOf(b) - songs.indexOf(a);
        }
        if (sortDirection === "asc") {
            return a.song[sortColumn] > b.song[sortColumn] ? 1 : -1;
        } else {
            return a.song[sortColumn] < b.song[sortColumn] ? 1 : -1;
        }
    });

    


    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton size="large" onClick={handleToggleSearch}>
                    {isSearchVisible ? <SearchOffRounded /> : <SearchRounded />}
                </IconButton>
                {isSearchVisible && (
                    <SearchContainer>
                        <InputBase
                            sx={{ paddingX: 2 }}
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </SearchContainer>
                )}
            </Box>

            <StyledTable ref={tableRef}>
                <Box>
                    <StyledTableRow visibleColumns={visibleColumns}>
                        <StyledSongIndex>#</StyledSongIndex>
                        <StyledTableHeaderCell
                            onClick={() => handleSort("name")}
                        >
                            Song
                        </StyledTableHeaderCell>
                        {visibleColumns.map((column, index) => (
                            <StyledTableHeaderCell
                                key={index}
                                onClick={() => handleSort(column)}
                            >
                                {column.charAt(0).toLocaleUpperCase() +
                                    column.slice(1)}
                            </StyledTableHeaderCell>
                        ))}

                        <StyledTableHeaderCell
                            style={{ justifySelf: "end" }}
                            onClick={() => handleSort("count")}
                        >
                            Play Count
                        </StyledTableHeaderCell>
                    </StyledTableRow>
                </Box>
                <Box paddingY={2}>
                    <Divider />
                </Box>
                <Box>
                    {(sort ? sortedSongs : songs).map((song, index) => (
                        <SongTableRow
                            key={index}
                            index={index}
                            song={song}
                            columns={visibleColumns}
                            onPlay={(e, song) => onPlay && onPlay(e, song)}
                            onMenu={(e, song) => {
                                e.preventDefault();
                                onMenu && onMenu({
                                    pos: {
                                        left: e.clientX,
                                        top: e.clientY,
                                    },
                                    song: song,
                                });
                            }}
                        />
                    ))}
                </Box>
            </StyledTable>
            
        </Box>
    );
}

function SongTableRow({ index, song, columns, onPlay, onMenu }) {
    return (
        <StyledTableRow
            key={song.song.id}
            visibleColumns={columns}
            onDoubleClick={(e) => onPlay(e, song)}
            onContextMenu={(e) => onMenu(e, song)}
        >
            <StyledSongIndex>{index + 1}</StyledSongIndex>
            <StyledTableCell>
                <SongCard data={song} />
            </StyledTableCell>
            {columns.includes("albums") && (
                <StyledTableCell>
                    {song.albums.map((album) => (
                        <div key={album.id}>{album.name}</div>
                    ))}
                </StyledTableCell>
            )}

            <StyledTableCell style={{ justifySelf: "end" }}>
                {song.song.count}
            </StyledTableCell>
        </StyledTableRow>
    );
}

export default SongTable;

const StyledTableRow = styled.div(({ theme, visibleColumns }) => ({
    display: "grid",
    gridGap: "16px",
    gridTemplateColumns: `[index] 16px [first] 4fr ${visibleColumns.map(
        (column, index) => {
            return `[var${index + 1}] 2fr`;
        }
    )} [last] minmax(120px, 1fr)`,
    borderRadius: "10px",
    padding: "5px 5px",
    transition: "background-color 0.3s ease",
    "&:hover": {
        backgroundColor: "rgba(55,55,55,0.4)",
    },
}));

const StyledTable = styled.div(({ theme }) => ({
    borderRadius: "4px",
    overflow: "hidden",
    color: "#ccc",
    minWidth: "500px",
}));

const StyledTableCell = styled.div(({ theme }) => ({
    display: "flex",
    alignItems: "center",
}));

const StyledTableHeaderCell = styled.div(({ theme }) => ({
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
}));

const StyledSongIndex = styled.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const SearchContainer = styled(Box)(({ theme, isMobile }) => ({
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: isMobile ? "100%" : "500px",
    border: "1px solid grey",
}));
