import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import { ApiRoutes, ApiUrl } from "../../../Api/apiConfig";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Divider,
    Fab,
    IconButton,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import useAuth from "../../../Hook/useAuth";
import ContentHeaderBox from "../ContentHeaderBox/ContentHeaderBox";
import GradientBackground from "../GradientBackground/GradientBackground";
import { DeleteRounded, EditRounded, SendOutlined } from "@mui/icons-material";
import { SongList, SongTable } from "../Song";
import useAuthorizeRequest from "../../../Hook/useAuthorizeRequest";
import axios from "axios";
import usePlaylist from "../../../Hook/usePlaylist";

import { List, ListItemButton } from "@mui/material";

import {
    AlbumRounded,
    Person2Rounded,
    PlayArrowRounded,
    PlaylistAddRounded,
    QueueMusicRounded,
} from "@mui/icons-material";
import useMusicPlayer from "../../../Hook/useMusicPlayer";
import SearchableList from "../SearchList/SearchableList";
import ContextMenu from "../ContextMenu";

function PlayList() {
    const params = useParams();
    const [update, setUpdate] = useState(false);

    const [data, setData] = useState(null);
    const [open, setOpen] = useState(false);

    const auth = useAuth();
    const [request] = useAuthorizeRequest();
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        if (!data) return;
        const getUserName = async () => {
            const response = await request({
                url: `https://localhost:7117/api/User/${data.playlist.owner}/name`,
            });
            setUserName(response);
        };
        getUserName();
    }, [data]);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(!update);
    };

    useEffect(() => {
        const id = params.id;

        const getData = async () => {
            const response = await request({
                url: ApiUrl + ApiRoutes.playlist + id,
            });

            setData(response);
        };
        getData();
    }, [update, params.id]);

    const musicPlayer = useMusicPlayer();
    const { playlist, shouldUpdate } = usePlaylist();
    const navigate = useNavigate();

    const [songMenu, setSongMenu] = useState(null);
    const handleAddToNewPlayList = async (song) => {
        const url = new URL(ApiRoutes.playlist, ApiUrl);
        url.pathname += "createBySong";

        const result = await request({
            url: url.href,
            method: "POST",
            options: {
                data: {
                    songId: song.song.id,
                    ownerId: auth.auth.id,
                },
            },
        });
        shouldUpdate();
        handleMenuClose();
    };

    const handleAddToPlayList = async (playlist, song) => {
        const url = new URL(ApiRoutes.playlist, ApiUrl);
        url.pathname += playlist.id;
        url.searchParams.set("songId", song.song.id);
        const result = await request({
            url: url.href,
            method: "POST",
        });
        handleMenuClose();
    };
    const getSongArtist = () => {
        if (!songMenu?.song) return [];
        return songMenu.song.artists;
    };
    const getSongAlbum = () => {
        if (!songMenu?.song) return null;
        return songMenu.song.albums[0];
    };
    const handleMenuClose = () => {
        setSongMenu(null);
    };

    const handleDeleteSong = async () => {
        const url = new URL(ApiRoutes.playlist, ApiUrl);
        url.pathname += `${params.id}/${songMenu.song.song.id}`;
        const response = await request({
            url: url.href,
            method: "DELETE",
        });
        setUpdate(!update);
    };

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

    const handleDeletePlaylist = () => {
        setDeleteConfirmationOpen(true);
    };

    const handleDeleteConfirmationClose = () => {
        setDeleteConfirmationOpen(false);
    };

    const handleConfirmDeletePlaylist = async () => {
        const url = new URL(ApiRoutes.playlist, ApiUrl);
        url.pathname += `${params.id}`;
        const response = await request({
            url: url.href,
            method: "DELETE",
        });
        shouldUpdate();
        navigate("/Library");
        handleDeleteConfirmationClose();
    };
    const menuItems = [
        {
            component: (
                <>
                    <PlayArrowRounded />
                    Play
                </>
            ),
            onClick: () => {
                musicPlayer.playNewSong(songMenu.song);
                handleMenuClose();
            },
        },
        {
            component: (
                <>
                    <QueueMusicRounded />
                    Add to queue
                </>
            ),
            onClick: () => {
                musicPlayer.pushQueue([songMenu.song]);
                handleMenuClose();
            },
        },
        {
            component: (
                <>
                    <PlaylistAddRounded />
                    Add to new play list
                </>
            ),
            onClick: () => {
                handleAddToNewPlayList(songMenu.song);
            },
        },
        {
            component: (
                <>
                    <PlaylistAddRounded />
                    Add to play list
                </>
            ),
            children: [
                {
                    component: (
                        <SearchableList
                            items={playlist.filter(
                                (item) => item.id != params.id
                            )}
                            labelKey="name"
                            valueKey="id"
                            onSelect={(playlist) =>
                                handleAddToPlayList(playlist, songMenu.song)
                            }
                        />
                    ),
                },
            ],
        },
        {
            component: (
                <>
                    <Person2Rounded />
                    Move to artist
                </>
            ),
            children: [
                {
                    component: (
                        <List sx={{ width: "200px" }}>
                            {getSongArtist().map((artist, index) => (
                                <ListItemButton
                                    key={index}
                                    onClick={() =>
                                        navigate(`/Artist/${artist.id}`)
                                    }
                                >
                                    {artist?.name}
                                </ListItemButton>
                            ))}
                        </List>
                    ),
                },
            ],
        },
        {
            component: (
                <>
                    <AlbumRounded />
                    Move to album
                </>
            ),
            onClick: () => {
                navigate(`/Album/${getSongAlbum().id}`);
            },
        },
        {
            component: (
                <>
                    <DeleteRounded />
                    Remove from this play list
                </>
            ),
            onClick: () => {
                handleDeleteSong();
            },
        },
    ];
    return (
        <>
            {data && (
                <Box
                    sx={{
                        backgroundColor: "transparent",
                        position: "relative",
                    }}
                >
                    <Dialog open={open} onClose={handleClose}>
                        <EditPlayList data={data} onClose={handleClose} />
                    </Dialog>
                    <ContentHeaderBox>
                        <Box
                            component="div"
                            sx={{
                                display: "flex",
                                p: 3,
                                backgroundColor: "transparent",
                                width: "100%",
                            }}
                        >
                            <Box
                                component="img"
                                sx={{
                                    width: 250,
                                    height: 250,
                                    boxShadow:
                                        "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                }}
                                src={data.playlist.image}
                                alt={data.playlist.name}
                                onClick={handleOpen}
                            />
                            <Box
                                sx={{
                                    color: "white",
                                    p: 4,
                                    display: "block",
                                    overflow: "hidden",
                                }}
                            >
                                <Typography variant="subtitle1" component="div">
                                    Playlist:
                                </Typography>
                                <Typography
                                    component="div"
                                    variant="h1"
                                    fontWeight={1000}
                                    paddingBottom={3}
                                    onClick={handleOpen}
                                >
                                    {data.playlist.name}
                                </Typography>
                                <Link
                                    href={`/profile/${data.playlist.owner}`}
                                    variant="body2"
                                    underline="hover"
                                >
                                    Owner: {userName}
                                </Link>

                                {data?.playlist.owner == auth.auth.id && (
                                    <Box>
                                        <IconButton
                                            size="large"
                                            onClick={handleDeletePlaylist}
                                        >
                                            <DeleteRounded />
                                        </IconButton>
                                        <IconButton
                                            size="large"
                                            onClick={() => setOpen(true)}
                                        >
                                            <EditRounded />
                                        </IconButton>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </ContentHeaderBox>
                    <GradientBackground />
                    <Box padding={5}>
                        <SongTable
                            songs={data.songs}
                            onPlay={(_, song) => musicPlayer.playNewSong(song)}
                            onMenu={(menu) => setSongMenu(menu)}
                            sort
                        />
                    </Box>
                </Box>
            )}
            <ContextMenu
                open={songMenu != null}
                openPos={songMenu?.pos}
                items={menuItems}
                onClose={() => setSongMenu(null)}
            />
            <Dialog
                open={deleteConfirmationOpen}
                onClose={handleDeleteConfirmationClose}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogActions>
                    <Button
                        onClick={handleDeleteConfirmationClose}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDeletePlaylist} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

function EditPlayList({ data, onClose }) {
    const [name, setName] = useState(() => data.playlist.name);
    const [image, setImage] = useState(null);
    const [request] = useAuthorizeRequest();
    const { shouldUpdate } = usePlaylist();

    const imageInput = useRef();
    function onSubmit(e) {
        e.preventDefault();

        const upload = async () => {
            let playListImage = null;
            if (image != null) {
                const url = new URL(ApiRoutes.image, ApiUrl);
                url.pathname += "upload";

                const uploadRequest = {
                    fileName: image.name,
                    contentType: image.type,
                };

                const uploadRequestResult = await request({
                    url: url.href,
                    method: "GET",
                    options: {
                        contentType: "application/json",
                        params: uploadRequest,
                    },
                });
                const result = await axios.put(uploadRequestResult.url, image, {
                    headers: {
                        "Content-Type": image.type,
                    },
                });
                playListImage = uploadRequestResult.fileName;
            }
            console.log(playListImage);

            const form = new FormData();
            form.append("id", data.playlist.id);
            form.append("name", name);
            if (playListImage) form.append("image", playListImage);
            const response = await request({
                url: "https://localhost:7117/api/Playlist/update",
                options: {
                    method: "POST",
                    data: form,
                },
            });
            shouldUpdate();
            onClose();
        };
        upload();
    }

    return (
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <Box display="flex" padding={2}>
                <input
                    type="file"
                    ref={imageInput}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <Box
                    component="img"
                    sx={{
                        width: 250,
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                    src={
                        image ? URL.createObjectURL(image) : data.playlist.image
                    }
                    alt={data.playlist.name}
                    onClick={() => imageInput.current.click()}
                />

                <Box display="flex" flexDirection="column" padding={5}>
                    <TextField
                        required
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                    <Divider sx={{ padding: "10%" }} />
                    <Fab type="submit" variant="extended">
                        <SendOutlined sx={{ mr: 1 }} />
                        Submit
                    </Fab>
                </Box>
            </Box>
        </Box>
    );
}

export default PlayList;
