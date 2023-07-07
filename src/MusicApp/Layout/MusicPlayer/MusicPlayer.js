import {
    FastForwardRounded,
    FastRewindRounded,
    PauseRounded,
    PlayArrowRounded,
    QueueMusic,
    VolumeMuteRounded,
    VolumeUpRounded,
} from "@mui/icons-material";
import { Box, IconButton, Slider, ToggleButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useMusicPlayer from "../../../Hook/useMusicPlayer";
import SongCard from "../../Component/Song/SongCard";
import { useLocation, useNavigate } from "react-router-dom";

function MusicPlayer() {
    const [position, setPosition] = useState(0);
    const [volume, setVolume] = useState(1);
    const navigate = useNavigate();
    const dragging = useRef(false);
    const [openQueue, setOpenQueue] = useState(false);
    const player = useMusicPlayer();
    const audio = player.audio.current;
    const mainIconColor = "#fff";
    const params = useLocation();
    useEffect(() => {
        player.audio.current.addEventListener("timeupdate", handleTimeUpdate);
        return () =>
            player.audio.current.removeEventListener(
                "timeupdate",
                handleTimeUpdate
            );
    }, [player.audio]);

    
    const playerStyle = {
        gridArea: "now-playing-bar",
        with: "100%",
        height: "100px",
    };

    useEffect(() => {
        setOpenQueue((params.pathname === "/queue"))
    }, [params.pathname]);

    const buttonStyle = {
        fontSize: "3rem",
        color: mainIconColor,
    };


    function handleQueue()
    {     
        openQueue ? navigate(-1) : navigate('/queue')
        setOpenQueue(!openQueue)
    }
    function handlePlayPause() {
        player.isPause ? player.play() : player.pause();
    }

    function handleProgress() {
        if (dragging.current) dragging.current = false;
        if (!player.currentSong) return;
        audio.currentTime = audio.duration * position;
    }

    function handleTimeUpdate() {
        if (!dragging.current) setPosition(audio.currentTime / audio.duration);
    }

    function handleDrag(value) {
        if (!dragging.current) dragging.current = true;
        setPosition(value);
    }
    function handleVolume(value) {
        audio.volume = value;
        setVolume(value);
    }

    return (
        <Box sx={playerStyle}>
            <Box
                component="footer"
                height="100%"
                display="flex"
                overflow="hidden"
            >
                <Box sx={{ width: "30%", height: "100%" }}>
                    <SongCard data={player.currentSong}></SongCard>
                </Box>
                <Box sx={{ width: "40%", height: "100%" }}>
                    <Slider
                        disabled={!player.currentSong}
                        sx={style}
                        step={0.01}
                        min={0}
                        max={1}
                        value={position || 0}
                        onChange={(_, value) => handleDrag(value)}
                        onChangeCommitted={(_, value) => handleProgress(value)}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <IconButton sx={buttonStyle} onClick={player.prev}>
                            <FastRewindRounded />
                        </IconButton>
                        <IconButton sx={buttonStyle} onClick={handlePlayPause}>
                            {player.isPause ? (
                                <PlayArrowRounded />
                            ) : (
                                <PauseRounded />
                            )}
                        </IconButton>
                        <IconButton sx={buttonStyle} onClick={player.next}>
                            <FastForwardRounded />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{ width: "30%", height: "100%" }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Box
                            width="50%"
                            display="flex"
                            alignItems="center"
                            paddingRight="50px"
                        >
                            <ToggleButton
                                selected={openQueue}
                                value="check"
                                onChange={handleQueue }
                            >
                                <QueueMusic />
                            </ToggleButton>
                            <IconButton >
                                <VolumeUpRounded />
                            </IconButton>

                            <Slider
                                
                                disabled={!player.audio}
                                sx={style}
                                step={0.01}
                                min={0}
                                max={1}
                                value={volume || 0}
                                onChange={(_, value) => handleVolume(value)}
                                size="small"
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default MusicPlayer;

const style = {
    color: "#fff",
   
    "&:hover": {
        color: "#fff",
        '& .MuiSlider-track':
        {
            color: 'blue',
            height: '4px',
        }
       
    },
   
    "& .MuiSlider-thumb": {
        width: 8,
        height: 8,
        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        "&:before": {
            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
        },
        "&:hover, &.Mui-focusVisible": {
            boxShadow: "0px 0px 0px 8px rgb(255 255 255 / 16%)",
        },
       
    },
    '& 	.MuiSlider-track':
    {
      
        height: '1px',
    },
    "& .MuiSlider-rail": {
        opacity: 0.28,
    },
    
};
