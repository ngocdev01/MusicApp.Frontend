import { useNavigate } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";

const imgStyle = {
    top: "50%",
    left: "60%",
    rotate: "25deg",
    position: "absolute",
    width: "50%",
    aspectRatio: "1/1",
};

const textStyle = {
    fontSize: "2rem",
    position: "absolute",
    color: 'white',
    top: "10%",
    left: "10%",
    textShadow: "2px 2px 3px rgba(0,0,0,0.8)",
};

function GenreCard(props) {
    const navigate = useNavigate();
    function getColor() {
        return props.colors[Math.floor(Math.random() * props.colors.length)];
    }

    return (
        <Card
            sx={{
                background: getColor(),
                aspectRatio: "1/1",
                width: "100%",
                position: "relative",
            }}
        >
            <Box>
                <Typography sx={textStyle} variant="h4" >
                    {props.tittle}{" "}
                </Typography>
            </Box>
            <Box sx={imgStyle}>
                <Box component="img" src={props.img} width="100%" />
            </Box>
        </Card>
    );
}

export default GenreCard;
