import { useNavigate } from "react-router-dom";

import { List, ListItemButton } from "@mui/material";
import { useState } from "react";
import { ApiRoutes, ApiUrl } from "../../../Api/apiConfig";

import {
    AlbumRounded,
    Person2Rounded,
    PlayArrowRounded,
    PlaylistAddRounded,
    QueueMusicRounded,
} from "@mui/icons-material";
import useAuthorizeRequest from "../../../Hook/useAuthorizeRequest";
import useMusicPlayer from "../../../Hook/useMusicPlayer";
import usePlaylist from "../../../Hook/usePlaylist";
import ContextMenu from "../ContextMenu";
import SearchableList from "../SearchList/SearchableList";
import { SongTable } from "../Song";
import useAuth from "../../../Hook/useAuth";

function SongTableWrapper({ songs,sort = false}) {
    const auth = useAuth();
    const musicPlayer = useMusicPlayer();
    const { playlist,shouldUpdate } = usePlaylist();
    const navigate = useNavigate();
    const [request] = useAuthorizeRequest();
    const [songMenu, setSongMenu] = useState(null);
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
    const handleAddToNewPlayList = async (song) => {
        const url = new URL(ApiRoutes.playlist, ApiUrl);
        url.pathname += 'createBySong'
       
        const result = await request({
            url: url.href,
            method: "POST",
            options : {
                data:
                {
                    songId : song.song.id,
                    ownerId : auth.auth.id,
                }
            }
        });
        shouldUpdate();
        handleMenuClose();
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

            hidden: auth.auth === null
        },
        {
            component: (
                <>
                    <PlaylistAddRounded />
                    Add to new play list
                </>
            ),
            onClick: () =>
            {
                handleAddToNewPlayList(songMenu.song);
            },
            hidden: auth.auth === null
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
                            items={playlist}
                            labelKey="name"
                            valueKey="id"
                            onSelect={(playlist) =>
                                handleAddToPlayList(playlist, songMenu.song)
                            }
                        />
                    ),
                },
            ],
            hidden: auth.auth === null
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
    ];
    return (
        <>
            <SongTable
                songs={songs}
                onPlay={(_, song) => musicPlayer.playNewSong(song)}
                onMenu={(menu) => setSongMenu(menu)}
                sort = {sort}
            />
            <ContextMenu
                open={songMenu != null}
                openPos={songMenu?.pos}
                items={menuItems}
                onClose={() => setSongMenu(null)}
            />
        </>
    );
}

export default SongTableWrapper;
