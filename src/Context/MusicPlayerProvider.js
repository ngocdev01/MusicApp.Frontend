import { createContext, useEffect, useRef, useState } from "react";
import { ApiRoutes, ApiUrl } from "../Api/apiConfig";
import useAuth from "../Hook/useAuth";
import { useNavigate } from "react-router-dom";

export const MusicPlayerContext = createContext();

export default function MusicPlayerProvider({ children }) {
    const [isPause, setIsPause] = useState(true);
    const [stack, setStack] = useState([]);
    const [queue, setQueue] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [playMode, setPlaymode] = useState("normal");
    const [isFetch, setIsFetch] = useState(false);
    const navigate = useNavigate();
    const audio = useRef(new Audio());
    const auth = useAuth();

    useEffect(() => {
        audio.current.addEventListener("ended", handleEnd);
        return () => {
            audio.current.removeEventListener("ended", handleEnd);
        };
    }, [audio,queue]);

    useEffect(() => {
        if (!currentSong) return;

        playCounter();

        audio.current.src = currentSong.song.source;

        if (!isPause) audio.current.play();
    }, [currentSong]);

    useEffect(() => {
        if(!queue) return;
        if (queue?.length < 1) return;
        const appendNewRecommend = async () => {
            let songs = [];
            if (currentSong != null) songs.push(currentSong);
            let count = Math.min(queue.length, 5);
            songs = songs.concat(queue.slice(0, count));
            const newSongs = await getRecommendSong(songs);
            setQueue([...queue,...newSongs]);
        };
        if (queue.length < 10) {
            appendNewRecommend();
        }
    }, [queue]);

    useEffect(() => {
        if(!stack) return;
        if (stack.length > 50) {
            setStack(stack.slice(stack.length - 50));
        }
    }, [stack]);

    const getRecommendSong = async (songs) => {
        const ids = songs.map((s) => s.song.id);
        const fetchRes = await fetch(ApiUrl + ApiRoutes.song + "recommned", {
            method: "PUT",
            headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ids),
        });
        const newSongs = await fetchRes.json();
        return newSongs;
    };

    const next = () => {
        const nextSong = popQueue();
        if (nextSong === null) return;
        if (currentSong != null) pushStack(currentSong);
        setCurrentSong(() => nextSong);
    };

    const prev = () => {
        const preSong = popStack();

        if (preSong == null) return;

        if (currentSong != null) insertQueue(currentSong);
        setCurrentSong(preSong);
    };

    const pushStack = (song) => {
        setStack((prevStack) => [...prevStack, song]);
    };

    const popStack = () => {
        if (stack.length <= 0) return null;
        const song = stack[stack.length - 1];

        setStack((prevStack) => prevStack.slice(0, -1));
        return song;
    };

    const popQueue = () => {
        console.log(queue)
        if (queue?.length <= 0) return null;
        const song = queue[0];
        setQueue((prevQueue) => prevQueue.slice(1));
        return song;
    };

    const insertQueue = (song) => {
        setQueue((prevQueue) => [song, ...prevQueue]);
    };

    const pushQueue = (songs, replace = false) => {
        setQueue((prevQueue) =>
            replace ? [...songs] : [...prevQueue, ...songs]
        );
    };

    const playedLength = () => {
        let length = 0;
        const arr = audio.current.played;
        for (let i = 0; i < arr.length; i++) {
            length += arr.end(i) - arr.start(i);
        }
        return length;
    };

    const handleEnd = (e) => {
      
        playCounter();
        
        next();
    };

    const counterUpdate = async (song, userId) => {
        const response = await fetch(
            `https://localhost:7117/api/Song/${song.song.id}/play?userId=${userId}`,
            {
                method: "PUT",
            }
        );

        if (!response.ok) {
            console.log(song.song.id, userId);
        }

        song.albums.forEach(async (album) => {
            const response = await fetch(
                `https://localhost:7117/api/Album/${album.id}/play?userId=${userId}`,
                {
                    method: "PUT",
                }
            );
            if (!response.ok) {
                console.log(response);
            }
        });
    };

    const playCounter = () => {
        const percent = (audio.current.duration / 100) * 30;
        const played = playedLength();
        if (played > 30 || played > percent) {
            counterUpdate(currentSong, auth.auth.id);
        }
    };

    const play = async () => {
        await audio.current.play();
        setIsPause(false);
    };

    const pause = async () => {
        await audio.current.pause();
        setIsPause(true);
    };

    const playNewSong = async (songs) => {
        if (auth.auth == null) {
            navigate("#login");
            return;
        }
        setIsPause(false);
        setStack([]);

        let nextSong = [];
        if (Array.isArray(songs)) {
            setCurrentSong(songs[0]);
            nextSong = songs.slice(1);
        } else {
            setCurrentSong(songs);
        }

        if (nextSong.length < 1) {
            nextSong = await getRecommendSong(
                Array.isArray(songs) ? songs : [songs]
            );
        }

        pushQueue(nextSong, true);
    };

    const addByLink = async (link, replace = false) => {
        const songs = await (await fetch(link)).json();
        if (replace) await playNewSong(songs.songs);
        else pushQueue(songs.songs);
    };
    const logOut = async () =>
    {
        await audio.current.pause();
        setCurrentSong(null);
        setIsPause(true);
        setQueue(null);
        setStack(null);
    }

    const musicContext = {
        isPause,
        audio,
        currentSong,
        queue,
        stack,
        next,
        prev,
        play,
        pause,
        playNewSong,
        pushQueue,
        popQueue,
        addByLink,
        logOut,

    };

    return (
        <MusicPlayerContext.Provider value={musicContext}>
            {children}
        </MusicPlayerContext.Provider>
    );
}
