import React, { useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { ApiRoutes, ApiUrl } from "../../../Api/apiConfig";

const SongDisplay = ({ song }) => {
    return (
        <Box
            sx={{
                display: "flex",
                padding: "20px",
                boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.5) 0px 10px 20px -10px inset",
                textShadow: "2px 4px 3px rgba(0,0,0,0.3)",
            }}
        >
            <Box sx={{ display: "flex", flex: "1", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1" }}>
                    <Typography variant="h2" component="h2">
                        {song.song.name}
                    </Typography>
                    <Typography variant="body1">
                        by{" "}
                        {song.artists.map((artist) => artist.name).join(", ")}
                    </Typography>
                    <Typography variant="body1">
                        from {song.albums[0].name}
                    </Typography>
                    <Typography variant="body1">
                        Genres:{" "}
                        {song.genres.map((genre) => genre.name).join(", ")}
                    </Typography>
                </CardContent>
                <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                    <div>
                        <audio controls>
                            <source src={song.song.source} type="audio/mp3" />
                        </audio>
                    </div>
                </Box>
            </Box>
            <Box
                sx={{
                    boxShadow: "rgba(0, 0, 0, 1) 0px 5px 15px;",
                }}
                component="img"
                src={song.albums[0].image}
                title={song.song.name}
                height="200px"
                width="200px"
            />
        </Box>
    );
};

export default SongDisplay;
