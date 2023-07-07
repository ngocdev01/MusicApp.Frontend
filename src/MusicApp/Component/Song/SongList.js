import { useState } from "react";
import {
    Chip,
    Input,
    Menu,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import styled from "@emotion/styled";
import SongRowItem from "./SongRowItem";
import useMusicPlayer from "../../../Hook/useMusicPlayer";
import ContextMenu from "../ContextMenu";
import { PlayArrowOutlined, PlaylistAddRounded } from "@mui/icons-material";

function SongList({ songs }) {
    const [item, setItem] = useState(null);
    const [songMenu, setSongMenu] = useState(null);
    const musicPlayer = useMusicPlayer();
    return (
        <TableContainer
            component="div"
            sx={{ backgroundColor: "transparent", paddingX: 5, paddingTop: 2 }}
            onContextMenu={(e) => e.preventDefault()}
        >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ borderBottom: "solid grey 1px" }}>
                    <TableRow>
                        <SongTableCell>#</SongTableCell>
                        <SongTableCell align="left">Song</SongTableCell>
                        <SongTableCell align="left">Album</SongTableCell>
                        <SongTableCell align="left">Plays</SongTableCell>

                        <SongTableCell align="right"></SongTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {songs.map((song, index) => (
                        <SongRowItem
                            onPlay={(e, song) => {
                                musicPlayer.playNewSong(song);
                            }}
                            onMenu={(e, song) => {
                                e.preventDefault();
                                setSongMenu({
                                    pos: {
                                        left: e.clientX,
                                        top: e.clientY,
                                    },
                                    song: song,
                                });
                            }}
                            key={index}
                            song={song}
                            index={index + 1}
                        />
                    ))}
                </TableBody>
            </Table>
            <ContextMenu
                open={songMenu != null}
                openPos={songMenu?.pos}
                items={items}
                onClose={() => setSongMenu(null)}
            />
        </TableContainer>
    );
}
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

export default SongList;

const items = [
    {
        component: (
            <>
                <PlaylistAddRounded /> Add to new playlist{" "}
            </>
        ),
        children: [
            {
                label: "About",
                action: (e) => console.log(e),
            },
            {
                component: <PlayArrowOutlined />,
            },
        ],
    },
    {
        label: "Products",
        children: [
            {
                label: "T-Shirts",
            },
            {
                label: "Text",
                children: [
                    {
                        component: (
                            <Input sx={{ width: "300px" }} label="aaa" />
                        ),
                    },
                ],
            },
            {
                label: "Hats",
                children: [
                    {
                        label: "T-Shirts",
                        onClick: (e) => console.log("aaaa"),
                    },
                    {
                        label: "Hats",
                        onClick: (e) => console.log(e),
                    },
                ],
            },
            {
                label: "Sweatshirts",
                onClick: (e) => console.log(e),
            },
        ],
    },
];
