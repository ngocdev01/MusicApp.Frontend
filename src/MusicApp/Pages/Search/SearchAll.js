import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiRoutes, ApiUrl } from "../../../Api/apiConfig";
import { Box, Typography } from "@mui/material";

import AlbumCardList from "../../Component/AlbumCard/AlbumCardList";
import { SongList, SongTableWrapper } from "../../Component/Song";


export default function SearchAll({ keyword }) {
    const param = useParams();
    const [song, setSong] = useState();
    const [album, setAlbum] = useState();
    const [playlist, setPlaylist] = useState();

    const doFetch = async (url, setData) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        const url = ApiUrl + "{0}" + "keyword=" + keyword + "&first=6";
        console.log();
        const fetchData = async () => {
            await doFetch(url.replace("{0}", ApiRoutes.search.song), setSong);
            await doFetch(url.replace("{0}", ApiRoutes.search.album), setAlbum);
            await doFetch(
                url.replace("{0}", ApiRoutes.search.playlist),
                setPlaylist
            );
        };
        fetchData();
    }, [keyword]);

    return (
        <Box>
            <Box padding={5}>
                <Typography variant="h5" color='white' fontWeight='700'>Songs: </Typography>
                <Box padding={5}>{song && <SongTableWrapper songs={song} />}</Box>
            </Box>
            <Box padding={5}>
                <Typography variant="h5" color='white' fontWeight='700'>Albums: </Typography>
                <Box><AlbumCardList albums = {album} loaded = {album!=null}/></Box>
            </Box>
        </Box>
    );
}
