import { useEffect, useState } from "react";
import { ApiRoutes, ApiUrl } from "../../Api/apiConfig";
import useAuth from "../../Hook/useAuth";
import { Box, Typography } from "@mui/material";
import { PlaylistCard } from "../Component/PlaylistCard/PlaylistCard";
import ContentHeaderBox from "../Component/ContentHeaderBox/ContentHeaderBox";
import useAuthorizeRequest from "../../Hook/useAuthorizeRequest";

const gridStyle = {
    display: "grid",
    gridGap: 10,
    gridTemplateColumns: "repeat(6,minmax(200px,1fr))",
};

function Library() {
    const { auth } = useAuth();
    const [playlists, setPlayLists] = useState(null);
    const [request] = useAuthorizeRequest();

    useEffect(() => {
        const GetData = async () => {
            const data = await request({
                url: ApiUrl + ApiRoutes.playlist + "?ownerId=" + auth.id,
            });
           
            setPlayLists(data);
        };
        GetData();
    }, []);

    return (
        <Box>
            <ContentHeaderBox>
                <Box paddingY={5}>
                    <Typography variant="h3" color="white" fontWeight="1000">
                        {auth.userName}'s Play List:
                    </Typography>
                </Box>
            </ContentHeaderBox>
            <Box sx={{ paddingX: 5, paddingTop: 5 }}>
                <Box sx={gridStyle}>
                    {playlists != null &&
                        playlists.map((playlist, index) => {
                            return (
                                <PlaylistCard
                                    key={index}
                                    id={playlist.id}
                                    name={playlist.name}
                                    songs={playlist.songs}
                                    image={playlist.image}
                                />
                            );
                        })}
                </Box>
            </Box>
        </Box>
    );
}

export default Library;
