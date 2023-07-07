import styled from "@emotion/styled";
import { Box, Divider, ToggleButtonGroup } from "@mui/material";
import MuiToggleButton from "@mui/material/ToggleButton";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { ApiRoutes, ApiUrl } from "../../../Api/apiConfig";

import SearchAll from "./SearchAll";
import AlbumCard from "../../Component/AlbumCard/AlbumCard";
import { PlaylistCard } from "../../Component/PlaylistCard/PlaylistCard";
import { SongList, SongTableWrapper } from "../../Component/Song";

export default function SearchResult() {
    const param = useParams();
    const [type, setType] = useState("");
    const navigate = useNavigate();

    const handleChange = (event, newType) => {
        setType(newType);
        navigate(newType == null ? "." : newType);
    };

    return (
        <Box>
            <Box paddingX={5}>
                <ToggleButtonGroup
                    value={type}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    <ToggleButton value="song">Song</ToggleButton>
                    <ToggleButton value="album">Album</ToggleButton>
                    <ToggleButton value="playlist">Playlist</ToggleButton>
                </ToggleButtonGroup>
                <Divider sx={{ backgroundColor: "grey", marginY: 1 }} />
            </Box>

            <Box>
                <Routes>
                    <Route
                        index
                        element={<SearchAll keyword={param.id} />}
                    ></Route>
                    <Route
                        path="song"
                        element={<SearchSong keyword={param.id} />}
                    />
                    <Route
                        path="album"
                        element={<SearchAlbum keyword={param.id} />}
                    />
                    <Route
                        path="playlist"
                        element={<SearchPlayList keyword={param.id} />}
                    />
                </Routes>
            </Box>
        </Box>
    );
}

function SearchSong({ keyword }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const url =
            ApiUrl +
            ApiRoutes.search.song +
            "keyword=" +
            keyword.replace(" ", "%20");
        console.log(url);
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [keyword]);

    return <Box padding={5}>{data && <SongTableWrapper songs={data} />}</Box>;
}

function SearchAlbum({ keyword }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const url = ApiUrl + ApiRoutes.search.album + "keyword=" + keyword;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [keyword]);

    return (
        <Box padding={5}>
            {data && (
                <Box sx={{ paddingX: 5, paddingTop: 5 }}>
                    <Box sx={gridStyle}>
                        {data != null &&
                            data.map((album, index) => {
                                return <AlbumCard key={index} album={album} />;
                            })}
                    </Box>
                </Box>
            )}
        </Box>
    );
}

function SearchPlayList({ keyword }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const url = ApiUrl + ApiRoutes.search.playlist + "keyword=" + keyword;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(url);
                setData(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [keyword]);

    return (
        <Box padding={5}>
            {data && (
                <Box sx={{ paddingX: 5, paddingTop: 5 }}>
                    <Box sx={gridStyle}>
                        {data != null &&
                            data.map((playlist, index) => {
                                return (
                                    <PlaylistCard
                                        key={index}
                                        id={playlist.playlist.id}
                                        name={playlist.playlist.name}
                                        songs={playlist.songs}
                                        image={playlist.playlist.image}
                                    />
                                );
                            })}
                    </Box>
                </Box>
            )}
        </Box>
    );
}
const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
    color: "white",
    backgroundColor: theme.palette.background.card,
    "&.Mui-selected, &.Mui-selected:hover": {
        color: "#000",
        backgroundColor: "#fff",
    },
}));

const gridStyle = {
    display: "grid",
    gridGap: 20,
    gridTemplateColumns: "repeat(5,minmax(200px,1fr))",
};
