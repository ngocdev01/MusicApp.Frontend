import { Box, Card, CardContent, Paper } from "@mui/material";
import useMusicPlayer from "../../Hook/useMusicPlayer";
import { Forward, PlayArrowOutlined } from "@mui/icons-material";
import { SongDisplay, SongTableWrapper } from "../Component/Song";

export default function Queue() {
    const player = useMusicPlayer();

    return (
        <Box display="flex" flexDirection="column" overflow="hidden">
            <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="minmax(400px,1fr) 2fr"
                height="100%"
            >
                <Card variant="outlined" sx={{ minHeight: "600px" }}>
                    <Paper>
                        <Box sx={headerStyle}>
                            <PlayArrowOutlined />
                            Playing
                        </Box>
                    </Paper>
                    <CardContent>
                        <Box>
                            {player.currentSong && (
                                <SongDisplay
                                    song={player.currentSong}
                                ></SongDisplay>
                            )}
                        </Box>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <Paper>
                        <Box sx={headerStyle}>
                            <Forward sx={{ mr: 1 }} />
                            Next
                        </Box>
                    </Paper>
                    <CardContent
                        sx={{
                            height: "100%",
                            overflowX: "hidden",
                            overflowY: "scroll",
                        }}
                    >
                        <SongTableWrapper
                            songs={player.queue}
                        ></SongTableWrapper>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

const headerStyle = {
    backgroundColor: "#BEE5B0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    width: "200px",
    height: "50px",
    borderRadius: "25px",
};
