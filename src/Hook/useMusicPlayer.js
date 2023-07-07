import { useContext } from "react";
import { MusicPlayerContext } from "../Context/MusicPlayerProvider";

export default function useMusicPlayer() {
    /**
     *  @type {{
     * isPause: boolean;
     * audio: React.MutableRefObject<HTMLAudioElement>;
     * currentSong: any;
     * queue: never[]; 
     * stack: never[];
     * next: () => Promise<void>;
     * prev: () => Promise<void>;
     * play: () => Promise<void>;
     * pause:() => Promise<void>;
     * playNewSong: (songs: any) => void;
     * pushQueue: (songs: any) => void
     * popQueue: (song: any) => void;
     * addByLink: (link: any) => Promise<...>;
     * }}                     
     */
    const player = useContext(MusicPlayerContext);
    return player;
}
