import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ApiRoutes, ApiUrl } from "../../../Api/apiConfig";
import useAuth from "../../../Hook/useAuth";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
    borderRadius: 8,
    transition: "0.3s",
    "&:hover": {
        transform: "scale(1.02)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#353535",
    },
    color: "white",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "20px",
    fontWeight: "400px",
    padding: 1,
    textDecoration: "none",
    paddingLeft: "2rem", // Add more padding on the left side
}));
const PlaylistImage = styled(Box)(({ theme }) => ({
    aspectRatio: "1/1",
    maxWidth: "50px",
    maxHeight: "50px",
    borderRadius: 4,

    marginRight: "1rem", // Adjust the right margin as needed
    objectFit: "cover",
}));

export default function PlaylistNavCard({ playlist }) {
    const auth = useAuth();

    return (
        <>
            {playlist && (
                <StyledBox
                    component={NavLink}
                    to={"playlist/".concat(playlist.id)}
                    fontSize={30}
                >
                    <PlaylistImage
                        component="img"
                        src={playlist.image}
                        loading="lazy"
                    />
                    <Box>
                        <Typography variant="h6">
                            {playlist.name}
                        </Typography>
                        <Typography variant="subtitle1" color="grey">
                            {auth?.auth?.userName}
                        </Typography>
                    </Box>
                </StyledBox>
            )}
        </>
    );
}
