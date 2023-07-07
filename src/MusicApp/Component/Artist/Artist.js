import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiRoutes, ApiUrl } from "../../../Api/apiConfig";
import { Box, CardContent, Typography } from "@mui/material";
import ContentHeaderBox from "../ContentHeaderBox/ContentHeaderBox";
import { Gradient } from "@mui/icons-material";
import { SongTable } from "../Song";

function Artist() {
    const params = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const url = new URL(ApiRoutes.artist, ApiUrl);
            url.pathname += params.id;
            const result = await axios.get(url);
            setData(result.data);
            console.log(result.data);
        };
        fetchData();
    }, [params.id]);
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
                        <CardContent sx={{ color: "white", p: 4 }}>
                            <Typography variant="subtitle1" component="div">
                                Artist:
                            </Typography>
                            <Typography
                                component="div"
                                variant="h1"
                                fontWeight={1000}
                                paddingBottom={3}
                            >
                                {data.artist.name}
                            </Typography>
                        </CardContent>
                    </ContentHeaderBox>
                    <Gradient />

                    <Box padding={5}>
                        <SongTable songs={data.songs} />
                    </Box>
                </Box>
            )}
        </>
    );
}

export default Artist;
