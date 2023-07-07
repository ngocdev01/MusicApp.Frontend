import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentHeaderBox from "../../Component/ContentHeaderBox/ContentHeaderBox";
import GradientBackground from "../../Component/GradientBackground/GradientBackground";

import AlbumCardList from "../../Component/AlbumCard/AlbumCardList";
import { SongList, SongTableWrapper } from "../../Component/Song";
import useAuthorizeRequest from "../../../Hook/useAuthorizeRequest";

export function Profile() {
    const [data, setData] = useState(null);
    const [songData, setSongData] = useState(null);
    const [albumData, setAlbumData] = useState(null);
    const params = useParams();
    const [request] = useAuthorizeRequest();
    useEffect(() => {
        const fetchData = async () => {
            const response = await request({
                url: `https://localhost:7117/api/User/${params.id}/name`,
            });

            setData(response);
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const response = await request({
                url: `https://localhost:7117/api/User/${params.id}/songs`,
            });

            setSongData(response);
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const response = await request({
                url: `https://localhost:7117/api/User/${params.id}/albums`,
            });

            setAlbumData(response);
        };

        fetchData();
    }, []);

    return (
        <Box>
            {data && (
                <>
                    <ContentHeaderBox>
                        <Box>
                            <Typography variant="subtitle1" color="grey">
                                User:
                            </Typography>
                            <Typography
                                variant="h3"
                                color="white"
                                fontWeight="bold"
                            >
                                {data}
                            </Typography>
                        </Box>
                    </ContentHeaderBox>
                    <Box sx={{ position: "relative" }}>
                        <GradientBackground />
                        <Box sx={{ paddingX: 5, paddingTop: 5 }}>
                            <Typography variant="h5" color="white">
                                Best song this month
                            </Typography>
                        </Box>
                        <Box padding={5}>
                            {songData && <SongTableWrapper songs={songData} />}
                        </Box>
                    </Box>
                    <Box>
                        {albumData && (
                            <AlbumCardList
                                loaded={albumData != null}
                                title="Best Album this month"
                                albums={albumData}
                            />
                        )}
                    </Box>
                </>
            )}
        </Box>
    );
}
