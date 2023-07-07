import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiRoutes, ApiUrl } from "../../Api/apiConfig";
import { ApiRounded } from "@mui/icons-material";
import { Box, CardContent, Typography } from "@mui/material";
import ContentHeaderBox from "../ContentHeaderBox/ContentHeaderBox";
import { SongList } from "../SongList/SongList";
import GradientBackground from "../GradientBackground/GradientBackground";

export default function PlayList() {
    const params = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const id = params.id;

        const getData = async () => {
            const response = await fetch(ApiUrl + ApiRoutes.playlist + id);
            var result = await response.json();
            if (!result.playlist.image)
                result.playlist.image = result.songs[0].albums[0].image;

            setData(result);
        };

        getData();
    }, []);

    return (
        <Box position="relative">
            {data && (
                <Box>
                    <ContentHeaderBox>
                        <Box
                            component="img"
                            sx={{
                                width: 250,
                                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            }}
                            src={ApiUrl + ApiRoutes.image + data.playlist.image}
                            alt={data.playlist.name}
                        />

                        <CardContent sx={{ color: "white", p: 4 }}>
                            <Typography component="div" variant="body1">
                                Play List:
                            </Typography>
                            <Typography component="div" variant="h1" fontWeight={1000}>
                                {data.playlist.name}
                            </Typography>
                        </CardContent>
                    </ContentHeaderBox>
                    <GradientBackground />
                    {data && <SongList songs={data.songs} album={data.album} />}
                </Box>
            )}
        </Box>
    );
}
