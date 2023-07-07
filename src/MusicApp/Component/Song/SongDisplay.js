import { useTheme } from "@emotion/react";
import { Box, Card, Typography } from "@mui/material";
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
        maxWidth: "300px",
       
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
export default function SongDisplay({ song }) {
    const theme = useTheme();
    return (
        <Card width = '100%' sx={{ padding : '20px'}}>
            {console.log(song)}
            <Box component="div" sx={imageStyle(theme)}>
                {song ? (
                    <Box
                        component="img"
                        src={song.albums? song.albums[0].image :  ""}
                        loading="lazy"
                        sx={{ opacity: 1 }}
                        alt={song.name}
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
                {song  ? (
                    <Typography variant='h3' fontWeight='bold' noWrap textOverflow="ellipsis">
                        {song.song.name}
                    </Typography>
                ) : (
                    <Box sx={{ background: theme.palette.background.active }} />
                )}
            </Box>
        </Card>
    );
}
