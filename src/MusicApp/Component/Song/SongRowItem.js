import {
    Autocomplete,
    Box,
    Button,
    Card,
    DialogContent,
    Fab,
    IconButton,
    TableCell,
    TableRow,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "../../../Hook/useAuth";
import {
    MoreHorizRounded,
    PlayArrowRounded,
    PlaylistAddRounded,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import SongCard from "./SongCard";

/**
 * @typedef {Object} SongRowItemProps
 * @property {string} any
 * @property {number} index
 * @property {(e : import("react").MouseEvent<HTMLTableRowElement,MouseEvent>,song: any) => void} onPlay
 * @property {(e : import("react").MouseEvent<HTMLTableRowElement,MouseEvent>,song: any) => void} onMenu
 */

/**
 * @param {SongRowItemProps} props
 */
const SongRowItem = ({ song, index, onPlay, onMenu }) => {
    const [hover, setHover] = useState(false);
    return (
        <TableRow
            key={song.id}
            sx={{
                height: "10px",
                borderRadius: "20px",
                padding: 0,
                "&:hover": { backgroundColor: "rgba(50,50,50,0.4)" },
                width: "100%",
            }}
            onDoubleClick={(e) => onPlay(e, song)}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            onContextMenu={(e) => onMenu(e, song)}
        >
            <SongTableCell
                sx={{ position: "relative", minWidth: "40px" }}
                component="th"
                scope="row"
            >
                {hover ? (
                    <RowAction
                        onPlay={(e) => onPlay(e, song)}
                        onMenu={onMenu}
                    />
                ) : (
                    index
                )}
            </SongTableCell>
            <SongTableCell width="50%" align="left">
                <SongCard data={song} />
            </SongTableCell>
            <SongTableCell align="left">{song.albums[0].name}</SongTableCell>
            <SongTableCell align="left">{song.song.count}</SongTableCell>
        </TableRow>
    );
};

const RowAction = ({ onPlay, onMenu }) => {
    return (
        <Fab sx={fabStyle} size="small" color="info" onClick={onPlay}>
            <PlayArrowRounded />
        </Fab>
    );
};
const fabStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  
    display: "flex",
};

const SongTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.common.white,

    maxWidth: "200px",
    whiteSpace: "nowrap",
    border: 0,
    padding: 5,
    margin: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

function PlaylistList({ song, onClose }) {
    const auth = useAuth();
    const [list, setList] = useState(null);
    const [value, setValue] = useState(null);
    useEffect(() => {
        const getAllPlaylist = async () => {
            const response = await fetch(
                `https://localhost:7117/api/Playlist?ownerId=${auth.auth.id}`
            );
            const playList = await response.json();
            const labelList = playList.map((playlist, index) => {
                return {
                    label: playlist.playlist.name,
                    playlistId: playlist.playlist.id,
                    id: index,
                };
            });
            setList(labelList);
            setValue(labelList[0]);
        };
        getAllPlaylist();
    }, []);

    function handleAdd() {
        const add = async () => {
            const response = await fetch(
                `https://localhost:7117/api/Playlist/add?playlistId=${value.playlistId}&songId=${song.id}`,
                {
                    method: "PUT",
                }
            );
            onClose();
        };

        add();
    }

    return (
        <Card variant="outlined">
            <DialogContent>
                {value && (
                    <Autocomplete
                        disablePortal
                        options={list}
                        value={value}
                        onChange={(_, value) => setValue(value)}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Play List" />
                        )}
                    />
                )}
                <Button
                    variant="contained"
                    sx={{ margin: "auto" }}
                    onClick={handleAdd}
                >
                    <PlaylistAddRounded />
                    Add
                </Button>
            </DialogContent>
        </Card>
    );
}
export default SongRowItem;


