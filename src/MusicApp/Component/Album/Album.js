import { useNavigate, useParams } from "react-router-dom";

import { CardContent, List, ListItemButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ApiRoutes, ApiUrl } from "../../../Api/apiConfig";

import {
    AlbumRounded,
    Person2Rounded,
    PlayArrowRounded,
    PlaylistAddRounded,
    QueueMusicRounded,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useAuthorizeRequest from "../../../Hook/useAuthorizeRequest";
import useMusicPlayer from "../../../Hook/useMusicPlayer";
import usePlaylist from "../../../Hook/usePlaylist";
import ContentHeaderBox from "../ContentHeaderBox/ContentHeaderBox";
import ContextMenu from "../ContextMenu";
import GradientBackground from "../GradientBackground/GradientBackground";
import SearchableList from "../SearchList/SearchableList";
import { SongCard, SongList, SongTable, SongTableWrapper } from "../Song";

function Album() {
    const params = useParams();
    const musicPlayer = useMusicPlayer();

    const [data, setData] = useState(null);
    const [songMenu, setSongMenu] = useState(null);
    useEffect(() => {
        const id = params.id;

        const getData = async () => {
            const response = await fetch(ApiUrl + ApiRoutes.album + id);
            var data = await response.json();

            setData(data);
        };

        getData();
    }, []);

    const handleMenuClose = () => {
        setSongMenu(null);
    };

    return (
        <>
            {data && (
                <Box
                    sx={{
                        backgroundColor: "transparent",
                        position: "relative",
                    }}
                >
                    <ContentHeaderBox>
                        <Box
                            component="img"
                            sx={{
                                width: 250,
                                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            }}
                            src={data.album.image}
                            alt={data.album.name}
                        />

                        <CardContent sx={{ color: "white", p: 4 }}>
                            <Typography component="div" variant="h3">
                                {data.album.name}
                            </Typography>
                            <Typography variant="subtitle1" component="div">
                                {data.album.artist}
                            </Typography>
                        </CardContent>
                    </ContentHeaderBox>
                    <GradientBackground />
                    {/* {data && <SongList songs={data.songs} album={data.album} />} */}

                    <Box padding={5}>
                        <SongTableWrapper
                            songs={data.songs}
                            sort
                        />
                    </Box>
                </Box>
            )}
            
        </>
    );
}

export default Album;
