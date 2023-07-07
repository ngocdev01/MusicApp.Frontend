import { useState } from "react";
import { Outlet } from "react-router-dom";
import GenreCard from "../../Component/GenreCard/GenreCard";
import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
function SearchHome() {
    const theme = useTheme();
    function getGenre(tittle) {
        const img = `/sample/albumIcon/${
            Math.floor(Math.random() * 5) + 1
        }.jpg`;
        const colors = [
            "#FF9AA2",
            "#FFB7B2",
            "#FFDAC1",
            "#E2F0CB",
            "#B5EAD7",
            "#C7CEEA",
        ];

        return { img, colors, tittle };
    }
    return (
        <Box paddingX={3}>
            <Box>
                <Card
                    sx={{ backgroundColor: theme.palette.background.container }}
                >
                    <Typography
                        variant="h1"
                        fontSize="3rem"
                        color="white"
                        fontWeight="800"
                        paddingY="30px"
                    >
                        Search
                    </Typography>
                </Card>
            </Box>

            
        </Box>
    );
}

export default SearchHome;
