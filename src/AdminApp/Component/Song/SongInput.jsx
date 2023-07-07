import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    LinearProgress,
    Paper,
    TextField,
    linearProgressClasses,
} from "@mui/material";
import { useRef, useState } from "react";
import { ApiRoutes, ApiUrl } from "../../../Api/apiConfig";
import { DropDown, TagBox } from "../Autocomplete";
import {
    EditRounded,
    SaveRounded,
    UploadFileRounded,
    CancelRounded,
} from "@mui/icons-material";
import useAuthorizeRequest from "../../../Hook/useAuthorizeRequest";
import axios from "axios";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export default function SongInput({ defaultSong, edit }) {
    const [name, setName] = useState(defaultSong?.song.name || "");
    const [artists, setArtist] = useState(defaultSong?.artists || []);
    const [album, setAlbum] = useState(
        defaultSong?.albums?.length > 0 ? defaultSong.albums[0] : null
    );
    const [genres, setGenre] = useState(defaultSong?.genres || []);
    const [audio, setAudio] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const audioInput = useRef();
    const audioRef = useRef();
    const [request, error, loading] = useAuthorizeRequest();
    const cancelTokenSource = useRef(null);
    const [nameError, setNameError] = useState("");
    const [audioError, setAudioError] = useState("");
    const [albumError, setAlbumError] = useState("");
    const [artistError, setArtistError] = useState("");
    const navigate = useNavigate();

    const handleAudioChange = (e) => {
        setAudio(e.currentTarget.files[0]);
        audioRef.current.load();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (uploading) return;

        // Check for required fields
        if (!name) {
            setNameError("Song name is required.");
            return;
        }
        if (artists.length < 1) {
            setArtistError("At least one artist is required.");
            return;
        }
        if (!album) {
            setAlbumError("Album is required.");
            return;
        }
        if (!edit && !audio) {
            setAudioError("Song audio file is required.");
            return;
        }

        cancelTokenSource.current = axios.CancelToken.source(); // Create a new cancel token source

        try {
            setUploading(true);
            let source = null;
            if (audio) {
                const uploadRequest = {
                    fileName: audio.name,
                    contentType: audio.type,
                };
                const url = new URL(ApiRoutes.audio, ApiUrl);
                url.pathname += "upload";
                console.log(url.href);
                const uploadRequestResult = await request({
                    url: url.href,
                    method: "GET",
                    options: {
                        contentType: "application/json",
                        params: uploadRequest,
                    },
                });

                const result = await axios.put(uploadRequestResult.url, audio, {
                    headers: {
                        "Content-Type": audio.type,
                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        console.log(progress);
                        setUploadProgress(progress);
                    },
                    cancelToken: cancelTokenSource.current.token,
                });
                source = uploadRequestResult.fileName;
            }
            if (!edit) {
                const uploadSong = new FormData();
                uploadSong.append("songName", name);
                uploadSong.append("album", album.id);
                artists.forEach((artist) =>
                    uploadSong.append("artists", artist.id)
                );
                genres.forEach((genre) =>
                    uploadSong.append("genres", genre.id)
                );
                uploadSong.append("songAudio", source);
                const response = await request({
                    url: `https://localhost:7117/api/Song/`,
                    method: "POST",
                    contentType: "multipart/form-data",
                    options: {
                        data: uploadSong,
                    },
                });
                navigate(`/admin/song/${response.song.id}`);
            } else {
                const editSong = new FormData();
                editSong.append("songName", name);
                editSong.append("album", album.id);
                artists.forEach((artist) =>
                    editSong.append("artists", artist.id)
                );
                genres.forEach((genre) => editSong.append("genres", genre.id));
                console.log(editSong.getAll("artists"));
                if (source) editSong.append("songAudio", source);
                const response = await request({
                    url: `https://localhost:7117/api/Song/${defaultSong.song.id}`,
                    method: "PUT",
                    contentType: "application/json",
                    options: {
                        data: editSong,
                    },
                });
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Upload canceled:", error.message);
            } else {
                console.error(error);
            }
        } finally {
            setUploading(false);
        }
    };

    const handleCancel = () => {
        if (uploading) {
            cancelTokenSource.current.cancel("Upload canceled by the user."); // Cancel the upload request
            setUploadProgress(0);
            setUploading(false);
        }
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    padding: "20px",
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
            >
                <Box
                    sx={{ display: "flex", flex: "1", flexDirection: "column" }}
                >
                    <TextField
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        variant="outlined"
                        label="Song Name"
                        fullWidth
                        disabled={uploading}
                        error={!!nameError}
                        helperText={nameError}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            gap: "20px",
                            alignItems: "center",
                        }}
                    >
                        <input
                            type="file"
                            ref={audioInput}
                            style={{ display: "none" }}
                            accept="audio/*"
                            onChange={handleAudioChange}
                            disabled={uploading}
                        />

                        {!uploading && (
                            <audio ref={audioRef} controls>
                                <source
                                    src={
                                        audio
                                            ? URL.createObjectURL(audio)
                                            : defaultSong
                                            ? defaultSong.song.source
                                            : null
                                    }
                                    type="audio/mp3"
                                />
                            </audio>
                        )}

                        <Button
                            onClick={() => audioInput.current.click()}
                            variant={audio ? "contained" : "outlined"}
                            startIcon={
                                audio ? <UploadFileRounded /> : <EditRounded />
                            }
                            color={audio ? "success" : "primary"}
                            disabled={uploading}
                        >
                            {audio ? "Change Audio" : "Select Audio"}
                        </Button>
                    </Box>
                </Box>
                {album && (
                    <Box
                        sx={{
                            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                            borderRadius: "10px",
                        }}
                        component="img"
                        src={album.image}
                        title={name}
                        height="200px"
                        width="200px"
                    />
                )}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <DropDown
                    value={album}
                    dataUrl={"/api/search/album/"}
                    label="Album"
                    onChange={(value) => setAlbum(value)}
                    disabled={uploading}
                    error={!!albumError}
                    helperText={albumError}
                />

                <TagBox
                    dataUrl={"/api/search/artist/"}
                    value={artists}
                    label="Artist"
                    onChange={(value) => setArtist(value)}
                    disabled={uploading}
                    error={!!artistError}
                    helperText={artistError}
                />

                <TagBox
                    dataUrl={"/api/search/genre/"}
                    value={genres}
                    label="Genre"
                    onChange={(value) => setGenre(value)}
                    disabled={uploading}
                />
            </Box>
            <Box
                sx={{
                    padding: 5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<SaveRounded />}
                    onClick={handleSubmit}
                    disabled={uploading}
                >
                    Save
                </Button>
            </Box>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={uploading}
            >
                <Box height="100px" width="1000px">
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<CancelRounded />}
                        onClick={handleCancel}
                        disabled={!uploading}
                    >
                        Cancel
                    </Button>
                    <BorderLinearProgress
                        variant="determinate"
                        value={uploadProgress}
                    />
                </Box>
            </Backdrop>
        </Box>
    );
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
}));
