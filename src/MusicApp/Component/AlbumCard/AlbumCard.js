import { AddOutlined, PlayArrowRounded } from "@mui/icons-material";
import {
    Box,
    CardActionArea,
    Fab,
    Grow,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import useMusicPlayer from "../../../Hook/useMusicPlayer";
import { ApiRoutes, ApiUrl } from "../../../Api/apiConfig";
import useAlert from "../../../Hook/useAlert";
import { useState } from "react";

export const cardStyle = (theme) => {
    return {
        background: theme.palette.background.card,
        color: theme.palette.primary.light,
        position: "relative",
        borderRadius: 1,
        width: "100%",
        padding: 2,
        overflow: "hidden",
        aspectRatio: "9/12",
    };
};
export const imageStyle = (theme) => {
    return {
        maxWidth: "100%",
        aspectRatio: "1/1",
        background: theme.palette.background.active,
        borderRadius: 1,
        display: "flex",
        "& img": {
            width: "100%",
            height: "100%",
            padding: 0,
            borderRadius: 1,

            webkitTransition: "all 2s ease",
            mozTransition: "all 2s ease",
            msTransition: "all 2s ease",
            OTransition: "all 2s ease",
        },
    };
};

function AlbumCard({ album, loading }) {
    const theme = useTheme();
    const [hover, setHover] = useState(false);
    const alert = useAlert();

    const player = useMusicPlayer();
    const addToPlayer = async (replace = false) => {
        await player.addByLink(`${ApiUrl}${ApiRoutes.album}${album.id}`, replace);
        if (!replace) alert.popUp("success", "Added to queue");
    };

    return (
        <Box
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            sx={cardStyle(theme)}
        >
            <CardActionArea component={Link} to={`/Album/${album?.id}`}>
                <Box component="div" sx={imageStyle(theme)}>
                    {album && !loading ? (
                        <Box
                            component="img"
                            src={album.image}
                            loading="lazy"
                            sx={{ opacity: 1 }}
                            alt={album.name}
                        />
                    ) : (
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                background: theme.palette.background.active,
                            }}
                        />
                    )}
                </Box>
                <Box sx={{ width: "100%", paddingY: 2 }}>
                    {album && !loading ? (
                        <Typography
                            variant="body2"
                            noWrap
                            textOverflow="ellipsis"
                        >
                            {album.name}
                        </Typography>
                    ) : (
                        <Box
                            sx={{ background: theme.palette.background.active }}
                        />
                    )}
                </Box>
            </CardActionArea>
            <Grow in={hover}>
                <Box
                    display="flex"
                    flexDirection="column"
                    position="absolute"
                    bottom="35%"
                >
                    <Fab color="info" onClick={() => addToPlayer(false)}>
                        <AddOutlined />
                    </Fab>
                    <Fab color="success" onClick={() => addToPlayer(true)}>
                        <PlayArrowRounded />
                    </Fab>
                </Box>
            </Grow>
        </Box>
    );
}

export default AlbumCard;
